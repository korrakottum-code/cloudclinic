// Script to generate individual IV Drip pages
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { IV_DRIPS, ALL_DRIPS, CONTACT } from '../src/js/components.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

function generateDripPage(drip, allDrips) {
  const relatedDrips = allDrips.filter(d => d.id !== drip.id).slice(0, 4);
  const groupLabel = drip.group === 'standard' ? 'Standard IV Drip' : 'Premium IV Drip';

  const relatedHtml = relatedDrips.map(rd => `
            <a href="./${rd.id}.html" class="drip-detail__related-item">
              <span class="drip-detail__related-emoji">${rd.emoji}</span>
              <div>
                <div class="drip-detail__related-name">${rd.name}</div>
                <div class="drip-detail__related-price">${rd.priceText}</div>
              </div>
            </a>`).join('');

  const tagsHtml = drip.tags.map(t => `<span class="drip-card__tag">${t}</span>`).join('');

  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${drip.name} - ดริปผิว ${drip.tags[0]} ขอนแก่น | Cloud Clinic</title>
  <meta name="description" content="${drip.name} ที่ Cloud Clinic ขอนแก่น ราคา ${drip.priceText} ${drip.benefits} เหมาะสำหรับ${drip.suitable} โปรซื้อ 2 แถม 2">
  <meta name="keywords" content="${drip.seoKeywords}, ${drip.name}, ดริปผิว ขอนแก่น, ฉีดผิว ขอนแก่น">
  <meta property="og:title" content="${drip.name} - ดริปผิว ขอนแก่น | Cloud Clinic">
  <meta property="og:description" content="${drip.benefits} ราคา ${drip.priceText} โปร 2 แถม 2">
  <link rel="canonical" href="https://cloudclinicth.com/iv-drip/${drip.id}.html">
  <link rel="stylesheet" href="../src/styles/index.css">
  <link rel="stylesheet" href="../src/styles/components.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "${drip.name}",
    "description": "${drip.description}",
    "brand": { "@type": "Brand", "name": "Cloud Clinic" },
    "offers": {
      "@type": "Offer",
      "price": "${drip.price}",
      "priceCurrency": "THB",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "12"
    }
  }
  </script>
</head>
<body>
  <header class="page-header">
    <div class="container page-header__content">
      <div class="breadcrumb">
        <a href="../index.html">หน้าแรก</a>
        <span class="breadcrumb__sep">›</span>
        <a href="../iv-drip-menu.html">เมนูดริปผิว</a>
        <span class="breadcrumb__sep">›</span>
        <span class="breadcrumb__current">${drip.name}</span>
      </div>
      <h1 class="page-header__title">${drip.emoji} ${drip.name}</h1>
      <p class="page-header__subtitle">${drip.benefits}</p>
    </div>
  </header>

  <section class="drip-detail">
    <div class="container">
      <div class="drip-detail__layout">
        <div class="drip-detail__main animate-on-scroll">
          <div class="drip-detail__hero-image">
            <img src="../${drip.image.startsWith('/') ? drip.image.slice(1) : drip.image}" alt="${drip.name}" style="width:100%; max-width:400px; border-radius:var(--radius-xl); box-shadow:var(--shadow-lg); margin: 0 auto var(--space-6); display:block;">
          </div>
          <h2 class="drip-detail__name">${drip.name}</h2>
          <div class="drip-card__tags" style="margin-bottom:var(--space-4);">
            <span class="drip-card__tag">${groupLabel}</span>
            ${tagsHtml}
          </div>

          <div class="drip-detail__section">
            <h3 class="drip-detail__section-title">📖 รายละเอียด</h3>
            <p style="color: var(--color-text-secondary); line-height: var(--leading-relaxed);">${drip.description}</p>
          </div>

          <div class="drip-detail__section">
            <h3 class="drip-detail__section-title">🎯 เหมาะสำหรับ</h3>
            <p style="color: var(--color-text-secondary); line-height: var(--leading-relaxed);">${drip.suitable}</p>
          </div>

          <div class="drip-detail__section">
            <h3 class="drip-detail__section-title">✨ ช่วยเรื่อง</h3>
            <p style="color: var(--color-text-secondary); line-height: var(--leading-relaxed);">${drip.benefits}</p>
          </div>

          <div class="drip-detail__section">
            <h3 class="drip-detail__section-title">⏱️ ระยะเวลาทำ</h3>
            <p style="color: var(--color-text-secondary);">ประมาณ 15 นาทีต่อครั้ง</p>
          </div>

          <div class="drip-detail__section">
            <h3 class="drip-detail__section-title">🛋️ ประสบการณ์ระหว่างทำ</h3>
            <ul class="drip-detail__list">
              <li>นั่งหรือเอนบนโซฟาปรับเอนแบบ Private ส่วนตัว</li>
              <li>เสิร์ฟน้ำและขนมฟรี ระหว่างรอ</li>
              <li>บรรยากาศเงียบสงบ ผ่อนคลายแบบสปา</li>
            </ul>
          </div>

          <div class="trust-signals" style="margin-top:var(--space-6); padding:var(--space-4); background:var(--color-bg); border-radius:var(--radius-xl);">
            <div class="trust-signal"><span class="trust-signal__icon">✅</span> ตัวยาแท้ 100%</div>
            <div class="trust-signal"><span class="trust-signal__icon">👨‍⚕️</span> ดูแลโดยแพทย์</div>
            <div class="trust-signal"><span class="trust-signal__icon">⭐</span> รีวิว 5 ดาว</div>
          </div>
        </div>

        <div class="drip-detail__sidebar">
          <div class="drip-detail__price-card animate-on-scroll">
            <div class="drip-detail__promo-badge">🔥 โปร 2 แถม 2</div>
            <div class="drip-detail__price">${drip.priceText}</div>
            <div class="drip-detail__price-note">ต่อครั้ง (ไม่รวมโปรโมชั่น)</div>
            <a href="${CONTACT.lineLink}" target="_blank" class="btn btn--line btn--lg btn--block" style="margin-bottom:var(--space-3);">
              💬 จองคิวผ่าน LINE
            </a>
            <a href="${CONTACT.phoneTel}" class="btn btn--primary btn--lg btn--block">
              📞 โทร ${CONTACT.phone}
            </a>
            <p style="font-size:var(--text-xs); color:var(--color-text-muted); margin-top:var(--space-3);">
              📍 ${CONTACT.address}<br>
              ⏰ ${CONTACT.hours}
            </p>
          </div>

          <div class="drip-detail__related animate-on-scroll">
            <h3 class="drip-detail__related-title">สูตรอื่นที่น่าสนใจ</h3>
            ${relatedHtml}
            <a href="../iv-drip-menu.html" class="btn btn--outline btn--sm btn--block" style="margin-top:var(--space-3);">ดูเมนูทั้งหมด</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="cta-banner animate-on-scroll">
        <div class="cta-banner__content">
          <h2 class="cta-banner__title">สนใจ ${drip.name}? 💬</h2>
          <p class="cta-banner__text">ปรึกษาแพทย์เพื่อเลือกสูตรที่เหมาะกับคุณ ฟรี!</p>
          <a href="${CONTACT.lineLink}" target="_blank" class="btn btn--line btn--lg">💬 ทักแชทปรึกษาฟรี!</a>
        </div>
      </div>
    </div>
  </section>

  <script type="module">
    import { initApp } from '../src/js/main.js';
    initApp('menu');
  </script>
</body>
</html>`;
}

// Generate all pages
ALL_DRIPS.forEach(drip => {
  const html = generateDripPage(drip, ALL_DRIPS);
  const filePath = join(projectRoot, 'iv-drip', `${drip.id}.html`);
  writeFileSync(filePath, html, 'utf-8');
  console.log(`Generated: iv-drip/${drip.id}.html`);
});

console.log('All 12 IV Drip pages generated!');
