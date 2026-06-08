const fs=require('fs');
let f=fs.readFileSync('index.html','utf8');

// 1. Replace upgrade button handlers
const oldUpgrade = /\/\/ Upgrade buttons[\s\S]*?window\.open\('https:\/\/seedstudio\.lemonsqueezy\.com\/checkout\?plan=lifetime','_blank'\);[\s\S]*?\};/;
f = f.replace(oldUpgrade, `// Upgrade buttons -> payment QR modal
  document.getElementById('btnUpgrade').addEventListener('click',()=>showPayModal('pro'));
  document.getElementById('btnLifetime').addEventListener('click',()=>showPayModal('lifetime'));`);

// 2. Remove LemonSqueezy SDK loader
f = f.replace(/\n[\t ]*<!-- ═══════════════ LemonSqueezy SDK[\s\S]*?<\/script>\n/g, '\n');

// 3. Remove old checkout links (replace with placeholder)
f = f.replace(/https:\/\/seedstudio\.lemonsqueezy\.com\/checkout\?plan=pro/g, '#pay-pro');
f = f.replace(/https:\/\/seedstudio\.lemonsqueezy\.com\/checkout\?plan=lifetime/g, '#pay-lifetime');

// 4. Clean up any broken seedstudioLicense references
f = f.replace(/if\(typeof seedstudioLicense!=='undefined'\)\{[\s\S]*?\} else \{/g, '');

fs.writeFileSync('index.html', f);

// Verify
const remaining = (f.match(/lemonsqueezy|LemonSqueezy/gi) || []).length;
console.log('LemonSqueezy refs remaining:', remaining);
const payModal = (f.match(/showPayModal/g) || []).length;
console.log('showPayModal refs:', payModal);
console.log('File size:', f.length, 'chars');
