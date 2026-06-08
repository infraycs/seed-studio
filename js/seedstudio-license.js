/**
 * SeedStudio License Manager
 * v1.0.0
 *
 * Manages LemonSqueezy checkout, license verification, localStorage persistence,
 * and Pro/Free tier gating for the Seed Studio static-site application.
 *
 * Dependencies:
 *   - LemonSqueezy.js SDK (loaded via CDN)
 *   - Cloudflare Worker at LICENSE_WORKER_URL for re-verification
 *
 * Usage:
 *   <script src="https://assets.lemonsqueezy.com/lemonsqueezy.js"></script>
 *   <script src="js/seedstudio-license.js"></script>
 *   <script>
 *     seedstudioLicense.init().then(function(tier) {
 *       console.log('License tier:', tier); // 'free' | 'pro'
 *     });
 *   </script>
 */

(function (global) {
  'use strict';

  // ──────────────────────────────────────────────
  // CONFIGURATION — Update these for your store
  // ──────────────────────────────────────────────

  var CONFIG = {
    // LemonSqueezy store slug (e.g., 'seedstudio')
    STORE_SLUG: 'seedstudio',

    // Cloudflare Worker URL for license verification proxy
    // Deploy functions/license-verify.js to Workers and put the URL here
    LICENSE_WORKER_URL: 'https://license.seed.studio/api/verify-license',

    // localStorage key
    STORAGE_KEY: 'seedstudio_license',
    INSTANCE_KEY: 'seedstudio_instance_id',

    // How often to re-verify non-lifetime licenses (milliseconds)
    REVERIFY_INTERVAL_MS: 24 * 60 * 60 * 1000, // 24 hours

    // Maximum days to trust cached verification if Worker is unreachable
    MAX_CACHE_GRACE_DAYS: 7,

    // Test mode: set to true for development (uses test store)
    TEST_MODE: false,

    // Callback fired when license state changes
    onChange: null, // function(newTier, licenseData)
  };

  // ──────────────────────────────────────────────
  // INTERNAL STATE
  // ──────────────────────────────────────────────

  var _licenseData = null; // Current parsed license object
  var _tier = 'free';        // 'free' | 'pro'
  var _initialized = false;
  var _reverifyTimer = null;

  // ──────────────────────────────────────────────
  // INSTANCE ID (persistent per browser profile)
  // ──────────────────────────────────────────────

  function getInstanceId() {
    try {
      var id = localStorage.getItem(CONFIG.INSTANCE_KEY);
      if (!id) {
        // Generate a stable random ID
        var arr = new Uint32Array(8);
        crypto.getRandomValues(arr);
        id = 'seedstudio-' + Array.from(arr).map(function (n) { return n.toString(16).padStart(8, '0'); }).join('');
        localStorage.setItem(CONFIG.INSTANCE_KEY, id);
      }
      return id;
    } catch (e) {
      return 'seedstudio-unknown';
    }
  }

  // ──────────────────────────────────────────────
  // LOCAL STORAGE HELPERS
  // ──────────────────────────────────────────────

  function loadLicenseFromStorage() {
    try {
      var raw = localStorage.getItem(CONFIG.STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      // Validate basic structure
      if (!data || !data.license_key || !data.version) return null;
      // Handle schema migrations here as version changes
      if (data.version !== 1) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function saveLicenseToStorage(data) {
    try {
      data.version = 1;
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.warn('[SeedStudio License] Could not save to localStorage:', e);
      return false;
    }
  }

  function clearLicenseFromStorage() {
    try {
      localStorage.removeItem(CONFIG.STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  }

  // ──────────────────────────────────────────────
  // LICENSE VERIFICATION (via Cloudflare Worker)
  // ──────────────────────────────────────────────

  function verifyLicenseWithWorker(licenseKey) {
    return new Promise(function (resolve, reject) {
      var payload = {
        license_key: licenseKey,
        instance_id: getInstanceId(),
      };

      // Quick client-side format check before network call
      if (!licenseKey || typeof licenseKey !== 'string' || licenseKey.length < 16) {
        return resolve({ valid: false, reason: 'invalid_format' });
      }

      fetch(CONFIG.LICENSE_WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Worker returned HTTP ' + response.status);
          }
          return response.json();
        })
        .then(function (data) {
          resolve({
            valid: data.valid === true,
            plan: data.plan || null,
            expires_at: data.expires_at || null,
            status: data.status || 'unknown',
            customer_email: data.customer_email || null,
          });
        })
        .catch(function (err) {
          console.warn('[SeedStudio License] Verification request failed:', err.message);
          // Don't reject — return a "grace" result so the user isn't locked out
          // just because the Worker is temporarily unreachable
          resolve({
            valid: null, // null = unknown (cached status should be used)
            reason: 'network_error',
            error: err.message,
          });
        });
    });
  }

  // ──────────────────────────────────────────────
  // TIER DETECTION
  // ──────────────────────────────────────────────

  function determinePlanFromVariant(variantName) {
    if (!variantName) return 'monthly';
    var v = variantName.toLowerCase();
    if (v.indexOf('lifetime') !== -1) return 'lifetime';
    if (v.indexOf('yearly') !== -1 || v.indexOf('annual') !== -1) return 'yearly';
    if (v.indexOf('monthly') !== -1) return 'monthly';
    // Default fallback
    return 'monthly';
  }

  function isValidLicense(data) {
    if (!data || !data.license_key) return false;

    var now = Date.now();

    // Lifetime licenses never expire
    if (data.plan === 'lifetime') return true;

    // Check explicit expiration
    if (data.expires_at) {
      var expiry = new Date(data.expires_at).getTime();
      if (now > expiry) return false;
    }

    // Check if re-verification is overdue
    if (data.plan === 'monthly' || data.plan === 'yearly') {
      var verifiedAt = data.verified_at ? new Date(data.verified_at).getTime() : 0;
      var graceEnd = verifiedAt + (CONFIG.MAX_CACHE_GRACE_DAYS * 24 * 60 * 60 * 1000);
      if (now > graceEnd) return false; // Too long since last verification
    }

    return true;
  }

  // ──────────────────────────────────────────────
  // MAIN LICENSE INITIALIZATION
  // ──────────────────────────────────────────────

  function init() {
    if (_initialized) return Promise.resolve(_tier);
    _initialized = true;

    var stored = loadLicenseFromStorage();

    if (!stored) {
      _tier = 'free';
      _licenseData = null;
      _scheduleReverify();
      _fireOnChange();
      return Promise.resolve(_tier);
    }

    _licenseData = stored;

    // Lifetime licenses: no re-verification needed
    if (stored.plan === 'lifetime') {
      _tier = 'pro';
      _fireOnChange();
      return Promise.resolve(_tier);
    }

    // Monthly/Yearly: re-verify if stale
    var now = Date.now();
    var verifiedAt = stored.verified_at ? new Date(stored.verified_at).getTime() : 0;
    var needsReverify = (now - verifiedAt) > CONFIG.REVERIFY_INTERVAL_MS;

    if (!needsReverify) {
      // Cached verification is still fresh
      if (isValidLicense(stored)) {
        _tier = 'pro';
      } else {
        _tier = 'free';
        _licenseData = null;
        clearLicenseFromStorage();
      }
      _scheduleReverify();
      _fireOnChange();
      return Promise.resolve(_tier);
    }

    // Need to re-verify
    return verifyLicenseWithWorker(stored.license_key).then(function (result) {
      if (result.valid === true) {
        // Update stored data with fresh verification
        stored.verified_at = new Date().toISOString();
        if (result.expires_at) stored.expires_at = result.expires_at;
        if (result.status) stored.status = result.status;
        if (result.customer_email) stored.customer_email = result.customer_email;
        saveLicenseToStorage(stored);
        _licenseData = stored;
        _tier = 'pro';
      } else if (result.valid === null) {
        // Network error — use cached status if still in grace period
        if (isValidLicense(stored)) {
          _tier = 'pro';
        } else {
          _tier = 'free';
          _licenseData = null;
          clearLicenseFromStorage();
        }
      } else {
        // License invalid (expired, revoked, etc.)
        _tier = 'free';
        _licenseData = null;
        clearLicenseFromStorage();
      }

      _scheduleReverify();
      _fireOnChange();
      return _tier;
    });
  }

  // ──────────────────────────────────────────────
  // LEMONSQUEEZY CHECKOUT
  // ──────────────────────────────────────────────

  /**
   * Open LemonSqueezy checkout overlay.
   * @param {string} plan - 'monthly', 'yearly', or 'lifetime'
   */
  function openCheckout(plan) {
    if (typeof global.createLemonSqueezy === 'undefined' && typeof global.LemonSqueezy === 'undefined') {
      console.error('[SeedStudio License] LemonSqueezy SDK not loaded. Add: <script src="https://assets.lemonsqueezy.com/lemonsqueezy.js"></script>');
      // Fallback: redirect to hosted checkout
      var url = buildCheckoutUrl(plan);
      global.open(url, '_blank');
      return;
    }

    var storeSlug = CONFIG.TEST_MODE ? CONFIG.STORE_SLUG + '-test' : CONFIG.STORE_SLUG;

    // Use LemonSqueezy.js SDK
    var LemonSqueezy = global.LemonSqueezy || global.createLemonSqueezy;

    LemonSqueezy.Checkout({
      store: storeSlug,
      variantId: getVariantId(plan),
      onSuccess: function (data) {
        handleCheckoutSuccess(data, plan);
      },
      onClose: function () {
        // User closed the overlay without completing purchase
        console.log('[SeedStudio License] Checkout overlay closed');
      },
      onError: function (err) {
        console.error('[SeedStudio License] Checkout error:', err);
      },
    });
  }

  /**
   * Build a direct checkout URL (fallback when SDK unavailable).
   */
  function buildCheckoutUrl(plan) {
    var storeSlug = CONFIG.TEST_MODE ? CONFIG.STORE_SLUG + '-test' : CONFIG.STORE_SLUG;
    var variantId = getVariantId(plan);
    var url = 'https://' + storeSlug + '.lemonsqueezy.com/checkout/buy/';

    // If variant ID is known, construct full URL
    if (variantId) {
      url += '?checkout[variant_id]=' + variantId;
    } else {
      // Fallback to plan-based URL
      url += '?checkout[product]=' + plan;
    }

    url += '&checkout[embed]=true';
    url += '&checkout[button_color]=ff6b6b';
    url += '&checkout[redirect_url]=' + encodeURIComponent(global.location.origin + '/?thankyou=1');

    return url;
  }

  /**
   * Map plan name to LemonSqueezy variant ID.
   * Replace these with your actual variant IDs from the LemonSqueezy dashboard.
   */
  function getVariantId(plan) {
    // NOTE: Replace these placeholder IDs with your actual LemonSqueezy variant IDs.
    // Find them at: https://app.lemonsqueezy.com/products → click product → Variants tab
    var VARIANTS = {
      monthly: 123456,   // TODO: Replace with actual Pro Monthly variant ID
      yearly: 123457,    // TODO: Replace with actual Pro Yearly variant ID
      lifetime: 123458,  // TODO: Replace with actual Lifetime variant ID
    };
    return VARIANTS[plan] || null;
  }

  // ──────────────────────────────────────────────
  // CHECKOUT SUCCESS HANDLER
  // ──────────────────────────────────────────────

  function handleCheckoutSuccess(data, plan) {
    console.log('[SeedStudio License] Checkout success:', data);

    var licenseKey = null;
    var customerEmail = null;
    var orderId = null;

    // Extract data from LemonSqueezy success payload
    // The exact structure depends on the SDK version; handle both common shapes
    if (data && data.license_key) {
      licenseKey = data.license_key.key || data.license_key;
    }
    if (data && data.customer) {
      customerEmail = data.customer.email || null;
    }
    if (data && data.order) {
      orderId = data.order.id || data.order.identifier || null;
    }

    if (!licenseKey) {
      console.error('[SeedStudio License] No license key in success payload');
      return;
    }

    // Verify the license key immediately
    verifyLicenseWithWorker(licenseKey).then(function (result) {
      if (result.valid !== true) {
        console.error('[SeedStudio License] License verification failed after purchase');
        return;
      }

      // Build license data object
      var licenseData = {
        version: 1,
        license_key: licenseKey,
        tier: 'pro',
        plan: plan || determinePlanFromVariant(result.plan),
        activated_at: new Date().toISOString(),
        expires_at: result.expires_at || null,
        verified_at: new Date().toISOString(),
        instance_id: getInstanceId(),
        customer_email: customerEmail || result.customer_email || null,
        order_id: orderId || null,
        status: result.status || 'active',
      };

      // Persist
      saveLicenseToStorage(licenseData);
      _licenseData = licenseData;
      _tier = 'pro';

      _scheduleReverify();
      _fireOnChange();

      console.log('[SeedStudio License] Pro activated — plan:', licenseData.plan);
    });
  }

  // ──────────────────────────────────────────────
  // MANUAL LICENSE ACTIVATION
  // ──────────────────────────────────────────────

  /**
   * Activate a license with a known key (e.g., user pastes license key).
   * @param {string} licenseKey - The LemonSqueezy license key
   * @returns {Promise<{valid: boolean, tier: string}>}
   */
  function activateLicense(licenseKey) {
    return verifyLicenseWithWorker(licenseKey).then(function (result) {
      if (result.valid !== true) {
        return { valid: false, tier: 'free' };
      }

      var licenseData = {
        version: 1,
        license_key: licenseKey,
        tier: 'pro',
        plan: determinePlanFromVariant(result.plan),
        activated_at: new Date().toISOString(),
        expires_at: result.expires_at || null,
        verified_at: new Date().toISOString(),
        instance_id: getInstanceId(),
        customer_email: result.customer_email || null,
        order_id: null,
        status: result.status || 'active',
      };

      saveLicenseToStorage(licenseData);
      _licenseData = licenseData;
      _tier = 'pro';

      _scheduleReverify();
      _fireOnChange();

      return { valid: true, tier: 'pro', plan: licenseData.plan };
    });
  }

  // ──────────────────────────────────────────────
  // LICENSE DEACTIVATION
  // ──────────────────────────────────────────────

  /**
   * Remove the current license and revert to Free tier.
   */
  function deactivateLicense() {
    clearLicenseFromStorage();
    _licenseData = null;
    _tier = 'free';
    _clearReverify();
    _fireOnChange();
  }

  // ──────────────────────────────────────────────
  // RE-VERIFICATION SCHEDULE
  // ──────────────────────────────────────────────

  function _scheduleReverify() {
    _clearReverify();
    if (_tier !== 'pro' || !_licenseData || _licenseData.plan === 'lifetime') return;

    _reverifyTimer = setInterval(function () {
      if (!_licenseData || _licenseData.plan === 'lifetime') {
        _clearReverify();
        return;
      }

      verifyLicenseWithWorker(_licenseData.license_key).then(function (result) {
        if (result.valid === true) {
          _licenseData.verified_at = new Date().toISOString();
          if (result.expires_at) _licenseData.expires_at = result.expires_at;
          saveLicenseToStorage(_licenseData);
        } else if (result.valid === false) {
          // License is no longer valid
          deactivateLicense();
        }
        // If result.valid === null (network error), keep current status
      });
    }, CONFIG.REVERIFY_INTERVAL_MS);
  }

  function _clearReverify() {
    if (_reverifyTimer) {
      clearInterval(_reverifyTimer);
      _reverifyTimer = null;
    }
  }

  // ──────────────────────────────────────────────
  // CALLBACK
  // ──────────────────────────────────────────────

  function _fireOnChange() {
    if (typeof CONFIG.onChange === 'function') {
      try {
        CONFIG.onChange(_tier, _licenseData);
      } catch (e) {
        console.error('[SeedStudio License] onChange callback error:', e);
      }
    }
  }

  // ──────────────────────────────────────────────
  // PUBLIC API
  // ──────────────────────────────────────────────

  var seedstudioLicense = {
    // Configuration
    configure: function (opts) {
      if (opts.STORE_SLUG !== undefined) CONFIG.STORE_SLUG = opts.STORE_SLUG;
      if (opts.LICENSE_WORKER_URL !== undefined) CONFIG.LICENSE_WORKER_URL = opts.LICENSE_WORKER_URL;
      if (opts.TEST_MODE !== undefined) CONFIG.TEST_MODE = opts.TEST_MODE;
      if (opts.onChange !== undefined) CONFIG.onChange = opts.onChange;
      if (opts.REVERIFY_INTERVAL_MS !== undefined) CONFIG.REVERIFY_INTERVAL_MS = opts.REVERIFY_INTERVAL_MS;
    },

    // Lifecycle
    init: init,

    // Checkout
    openCheckout: openCheckout,
    getCheckoutUrl: buildCheckoutUrl,

    // License management
    activateLicense: activateLicense,
    deactivateLicense: deactivateLicense,

    // State queries
    getTier: function () { return _tier; },
    isPro: function () { return _tier === 'pro'; },
    getLicenseData: function () { return _licenseData ? JSON.parse(JSON.stringify(_licenseData)) : null; },
    getInstanceId: getInstanceId,

    // Manual re-verification
    reverify: function () {
      if (!_licenseData || !_licenseData.license_key) return Promise.resolve(false);
      return verifyLicenseWithWorker(_licenseData.license_key).then(function (result) {
        if (result.valid === true) {
          _licenseData.verified_at = new Date().toISOString();
          if (result.expires_at) _licenseData.expires_at = result.expires_at;
          saveLicenseToStorage(_licenseData);
          _tier = 'pro';
          _fireOnChange();
          return true;
        } else {
          deactivateLicense();
          return false;
        }
      });
    },

    // Internal state for debugging
    _getConfig: function () { return JSON.parse(JSON.stringify(CONFIG)); },
    _reset: function () {
      _clearReverify();
      clearLicenseFromStorage();
      _licenseData = null;
      _tier = 'free';
      _initialized = false;
    },
  };

  // ──────────────────────────────────────────────
  // EXPORT
  // ──────────────────────────────────────────────

  global.seedstudioLicense = seedstudioLicense;

  // Register LemonSqueezy global event listener as a backup
  // (some SDK versions fire a global event instead of calling onSuccess)
  if (typeof global.addEventListener === 'function') {
    global.addEventListener('message', function (event) {
      // LemonSqueezy posts messages to the parent window after checkout
      if (
        event.origin &&
        (event.origin.indexOf('lemonsqueezy.com') !== -1)
      ) {
        try {
          var msg = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          if (msg.event === 'checkout.success' && msg.data) {
            var plan = _licenseData ? _licenseData.plan : 'monthly';
            handleCheckoutSuccess(msg.data, plan);
          }
        } catch (e) {
          // Ignore non-JSON messages
        }
      }
    });
  }

})(typeof window !== 'undefined' ? window : this);
