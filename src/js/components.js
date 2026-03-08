// ===== Cloud Clinic - Shared Components =====

// IV Drip Data
export const IV_DRIPS = {
  standard: [
    {
      id: 'vitality-skin',
      emoji: '💧',
      image: 'images/drips/vitality-skin.webp',
      name: 'Vitality Skin',
      price: 990,
      priceText: '990.-',
      suitable: 'ผู้เริ่มต้นดริปผิว ผิวแห้งกร้าน ต้องการปรับสภาพผิว',
      benefits: 'เพิ่มภูมิคุ้มกัน ช่วยให้ผิวแข็งแรง เรียบเนียนขึ้น',
      description: 'สูตรเริ่มต้นสำหรับผู้ที่ต้องการเติมวิตามินให้ร่างกาย ช่วยปรับสภาพผิวให้แข็งแรงจากภายใน เหมาะสำหรับคนที่เพิ่งเริ่มต้นดริปผิวเป็นครั้งแรก',
      tags: ['ผิวเริ่มต้น', 'เสริมภูมิ'],
      seoKeywords: 'ดริปวิตามิน ขอนแก่น, วิตามินผิว ราคาถูก',
      group: 'standard',
    },
    {
      id: 'renewal-skin',
      emoji: '🌿',
      image: 'images/drips/renewal-skin.webp',
      name: 'Renewal Skin',
      price: 1390,
      priceText: '1,390.-',
      suitable: 'คนทำงานออกแดดประจำ ผิวคล้ำเสีย ดื่มน้ำน้อย',
      benefits: 'ชะลอความแก่ ปรับผิวให้กระจ่างใส ฟื้นฟูจากแสงแดด',
      description: 'สูตรฟื้นฟูผิวเสียจากแสงแดดและมลภาวะ เติมเต็มวิตามินที่ขาดหายไปจากการใช้ชีวิตประจำวัน ช่วยให้ผิวกลับมากระจ่างใสอีกครั้ง',
      tags: ['ฟื้นฟูผิว', 'ต้านแดด'],
      seoKeywords: 'ดริปผิว ฟื้นฟู ขอนแก่น',
      group: 'standard',
    },
    {
      id: 'perfection-skin',
      emoji: '✨',
      image: 'images/drips/perfection-skin.webp',
      name: 'Perfection Skin',
      price: 2490,
      priceText: '2,490.-',
      suitable: 'สายปาร์ตี้ สังสรรค์ ผิวโทรมหมองคล้ำ',
      benefits: 'ซ่อมแซมฟื้นฟูร่างกายอย่างล้ำลึก กระตุ้นภูมิคุ้มกัน',
      description: 'สูตรซ่อมแซมเซลล์ผิวอย่างล้ำลึก เหมาะสำหรับผู้ที่ใช้ชีวิตสังสรรค์บ่อย นอนดึก ผิวโทรม ช่วยกระตุ้นภูมิคุ้มกันและฟื้นฟูร่างกายจากภายใน',
      tags: ['ฟื้นฟูเข้มข้น', 'บูสต์ภูมิ'],
      seoKeywords: 'ดริปผิว เข้มข้น ขอนแก่น',
      group: 'standard',
    },
    {
      id: 'celebrity-skin',
      emoji: '👑',
      image: 'images/drips/celebrity-skin.webp',
      name: 'Celebrity Skin',
      price: 2990,
      priceText: '2,990.-',
      suitable: 'ผู้ที่ต้องการผิวกระจ่างใสเร่งด่วน ออร่าพุ่ง',
      benefits: 'ฟื้นฟูร่างกายให้สดชื่น ผิวแข็งแรง สุขภาพดีจากภายในสู่ภายนอก',
      description: 'สูตรพรีเมียมสูงสุดในกลุ่ม Standard เน้นความขาวใสแบบเร่งด่วน ผิวเปล่งปลั่งมีออร่า เหมาะกับคนที่ต้องการเห็นผลลัพธ์ชัดเจนตั้งแต่ครั้งแรก',
      tags: ['ออร่าพุ่ง', 'ขาวใส'],
      seoKeywords: 'ดริปผิวขาว ขอนแก่น, ฉีดผิว ขอนแก่น',
      group: 'standard',
    },
  ],
  premium: [
    {
      id: 'glow-and-clear',
      emoji: '🌤️',
      image: 'images/drips/glow-and-clear.webp',
      name: 'Glow & Clear Drip',
      price: 1990,
      priceText: '1,990.-',
      suitable: 'ผิวหมองคล้ำ สีผิวไม่สม่ำเสมอ',
      benefits: 'ผิวใส สีผิวสม่ำเสมอ ลดความหมองคล้ำจากแดด',
      description: 'สูตรเน้นความกระจ่างใส ลดจุดด่างดำ ปรับสีผิวให้สม่ำเสมอ เหมาะสำหรับคนที่ต้องการผิวโกลว์ ฉ่ำ มีชีวิตชีวา',
      tags: ['ผิวโกลว์', 'ลดหมองคล้ำ'],
      seoKeywords: 'ดริปผิวใส ขอนแก่น, ผิวกระจ่างใส',
      group: 'premium',
    },
    {
      id: 'immune-booster',
      emoji: '🛡️',
      image: 'images/drips/immune-booster.webp',
      name: 'Immune Booster Drip',
      price: 1990,
      priceText: '1,990.-',
      suitable: 'คนที่ร่างกายอ่อนแอ เป็นหวัดบ่อย',
      benefits: 'เสริมภูมิคุ้มกัน ลดโอกาสเป็นหวัดหรือเจ็บคอ',
      description: 'สูตรเสริมภูมิคุ้มกันแบบเข้มข้น ช่วยให้ร่างกายแข็งแรง ต้านทานโรคได้ดียิ่งขึ้น เหมาะสำหรับคนที่เจ็บป่วยบ่อยหรือต้องการเสริมภูมิในช่วงเปลี่ยนฤดู',
      tags: ['เสริมภูมิ', 'ป้องกันหวัด'],
      seoKeywords: 'ดริปวิตามิน เสริมภูมิ ขอนแก่น',
      group: 'premium',
    },
    {
      id: 'skin-detox-acne-clear',
      emoji: '💜',
      image: 'images/drips/skin-detox-acne.webp',
      name: 'Skin Detox & Acne Clear Drip',
      price: 1990,
      priceText: '1,990.-',
      suitable: 'คนเป็นสิว ผิวอักเสบ แพ้ง่าย',
      benefits: 'ลดสิวอักเสบ ผิวแข็งแรง ฟื้นฟูผิวที่ระคายเคืองง่าย',
      description: 'สูตรเฉพาะสำหรับคนเป็นสิว ช่วยลดการอักเสบจากภายใน ล้างสารพิษในร่างกาย ทำให้ผิวแข็งแรง ลดโอกาสเกิดสิวซ้ำ',
      tags: ['ลดสิว', 'ดีท็อกซ์ผิว'],
      seoKeywords: 'ดริปลดสิว ขอนแก่น, รักษาสิว ขอนแก่น',
      group: 'premium',
    },
    {
      id: 'party-recovery',
      emoji: '🥂',
      image: 'images/drips/party-recovery.webp',
      name: 'Party Recovery Drip',
      price: 1990,
      priceText: '1,990.-',
      suitable: 'หลังปาร์ตี้ แฮงค์ อ่อนเพลีย',
      benefits: 'ล้างสารพิษ ฟื้นฟูตับ ลดความอ่อนเพลีย เพิ่มความสดชื่น',
      description: 'สูตรแก้แฮงค์โดยเฉพาะ ช่วยล้างสารพิษจากแอลกอฮอล์ ฟื้นฟูตับและร่างกายอย่างรวดเร็ว เติมพลังงานกลับมาใน 15 นาที',
      tags: ['แก้แฮงค์', 'ฟื้นฟูตับ'],
      seoKeywords: 'ดริปแก้แฮงค์ ขอนแก่น, ดริปแฮงค์',
      group: 'premium',
    },
    {
      id: 'slim-and-burn',
      emoji: '🏃‍♀️',
      image: 'images/drips/slim-and-burn.webp',
      name: 'Slim & Burn Drip',
      price: 1990,
      priceText: '1,990.-',
      suitable: 'คนอยากลดน้ำหนัก ออกกำลังกายประจำ',
      benefits: 'เร่งการเผาผลาญไขมัน ลดความเมื่อยล้าหลังออกกำลังกาย',
      description: 'สูตรเร่งเมตาบอลิซึม ช่วยเผาผลาญไขมันได้ดียิ่งขึ้น ลดความเมื่อยล้าหลังออกกำลังกาย เพิ่มพลังงานให้ร่างกาย เหมาะสำหรับสายฟิตเนส',
      tags: ['ลดน้ำหนัก', 'เผาผลาญ'],
      seoKeywords: 'ดริปลดน้ำหนัก ขอนแก่น, เร่งเผาผลาญ',
      group: 'premium',
    },
    {
      id: 'detox-liver-care',
      emoji: '🌿',
      image: 'images/drips/detox-liver-care.webp',
      name: 'Detox & Liver Care Drip',
      price: 1990,
      priceText: '1,990.-',
      suitable: 'คนที่ทานยาเยอะ ดื่มแอลกอฮอล์บ่อย',
      benefits: 'ขับสารพิษในตับ ลดความเมื่อยล้า',
      description: 'สูตรดูแลตับโดยเฉพาะ ช่วยขับสารพิษสะสม ฟื้นฟูการทำงานของตับให้กลับมาเป็นปกติ เหมาะสำหรับคนที่ทานยาเยอะหรือดื่มแอลกอฮอล์เป็นประจำ',
      tags: ['ดีท็อกซ์ตับ', 'ขับสารพิษ'],
      seoKeywords: 'ดริปดีท็อกซ์ ขอนแก่น, ล้างพิษตับ',
      group: 'premium',
    },
    {
      id: 'night-owl',
      emoji: '🦉',
      image: 'images/drips/night-owl.webp',
      name: 'Night Owl Drip',
      price: 1990,
      priceText: '1,990.-',
      suitable: 'คนนอนดึก ทำงานหนัก สมองล้า',
      benefits: 'ลดอาการง่วง สมองล้า ช่วยให้ตื่นตัว',
      description: 'สูตรสำหรับคนนอนดึกโดยเฉพาะ ช่วยเติมวิตามินที่ร่างกายสูญเสียจากการนอนน้อย เพิ่มพลังงานให้สมองและร่างกายตื่นตัว พร้อมทำงานได้เต็มประสิทธิภาพ',
      tags: ['นอนดึก', 'เพิ่มพลังงาน'],
      seoKeywords: 'ดริปวิตามิน นอนดึก ขอนแก่น',
      group: 'premium',
    },
    {
      id: 'anti-stress-sleep-well',
      emoji: '😴',
      image: 'images/drips/anti-stress.webp',
      name: 'Anti-Stress & Sleep Well Drip',
      price: 1990,
      priceText: '1,990.-',
      suitable: 'คนเครียดสะสม นอนไม่หลับ',
      benefits: 'ผ่อนคลายระบบประสาท ลดความเครียด นอนหลับง่ายขึ้น',
      description: 'สูตรผ่อนคลายร่างกายและจิตใจ ช่วยลดความเครียดสะสม ทำให้นอนหลับได้ง่ายขึ้น ตื่นมาสดชื่น เหมาะสำหรับคนที่มีปัญหานอนไม่หลับ',
      tags: ['ลดเครียด', 'นอนหลับ'],
      seoKeywords: 'ดริปนอนหลับ ขอนแก่น, ลดเครียด',
      group: 'premium',
    },
  ],
};

// All drips flat array
export const ALL_DRIPS = [...IV_DRIPS.standard, ...IV_DRIPS.premium];

// Contact Info
export const CONTACT = {
  lineOA: '@Cloud-clinic',
  lineLink: 'https://line.me/ti/p/~@Cloud-clinic',
  phone: '065-749-2944',
  phoneTel: 'tel:0657492944',
  facebook: 'https://www.facebook.com/CloudClinickk',
  googleMaps: 'https://maps.app.goo.gl/rSfu97bqaFn2N2Sb6',
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.9!2d102.8364826!3d16.4376822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31228965b59304e5%3A0xc1d3f252f134c352!2sCloud%20Clinic%20-%20%E0%B8%84%E0%B8%A5%E0%B8%B2%E0%B8%A7%E0%B8%94%E0%B9%8C%E0%B8%84%E0%B8%A5%E0%B8%B4%E0%B8%99%E0%B8%B4%E0%B8%81%20%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99!5e0!3m2!1sth!2sth!4v1",
  address: '1/1 ถ.กลางเมือง ต.ในเมือง อ.เมือง จ.ขอนแก่น 40000 (ใกล้ศึกษาภัณฑ์ขอนแก่น)',
  hours: 'เปิดบริการ 12.00 - 20.00 น. (ปิดทุกวันพุธ)',
  clinicName: 'Cloud Clinic ขอนแก่น',
  clinicNameEn: 'Cloud Clinic Khon Kaen',
};

// Render Navbar
export function renderNavbar(activePage = '') {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'navbar';

  const isSubPage = window.location.pathname.includes('/iv-drip/');
  const prefix = '/';

  nav.innerHTML = `
    <div class="navbar__inner">
      <a href="/" class="navbar__logo" aria-label="Cloud Clinic Home">
        <img src="${prefix}images/logo.jpg" alt="Cloud Clinic" class="navbar__logo-img" width="48" height="48">
      </a>
      <div class="navbar__links" id="navLinks">
        <a href="/" class="navbar__link ${activePage === 'home' ? 'active' : ''}">หน้าแรก</a>
        <a href="/iv-drip-menu/" class="navbar__link ${activePage === 'menu' ? 'active' : ''}">เมนูดริปผิว</a>
        <a href="/reviews/" class="navbar__link ${activePage === 'reviews' ? 'active' : ''}">รีวิว</a>
        <a href="/blog/" class="navbar__link ${activePage === 'blog' ? 'active' : ''}">บทความ</a>
        <a href="/about/" class="navbar__link ${activePage === 'about' ? 'active' : ''}">เกี่ยวกับเรา</a>
        <a href="${CONTACT.lineLink}" target="_blank" class="btn btn--line btn--sm navbar__cta">💬 แชท LINE</a>
      </div>
      <button class="navbar__hamburger" id="hamburger" aria-label="เมนู">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-overlay" id="navOverlay"></div>
  `;
  document.body.prepend(nav);
}

// Render Sticky Contact Bar
export function renderStickyBar() {
  const bar = document.createElement('div');
  bar.className = 'sticky-bar';
  bar.id = 'stickyBar';
  bar.innerHTML = `
    <div class="sticky-bar__inner">
      <a href="${CONTACT.lineLink}" target="_blank" class="sticky-bar__btn sticky-bar__btn--line" aria-label="แชท LINE">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
        แชท LINE
      </a>
      <a href="${CONTACT.phoneTel}" class="sticky-bar__btn sticky-bar__btn--phone" aria-label="โทรออก">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
        โทรจองคิว
      </a>
    </div>
  `;
  document.body.appendChild(bar);

  // Add Facebook Messenger FAB
  const fbFab = document.createElement('a');
  fbFab.href = 'https://m.me/CloudClinickk';
  fbFab.target = '_blank';
  fbFab.className = 'fab-messenger';
  fbFab.setAttribute('aria-label', 'Chat on Messenger');
  fbFab.innerHTML = `
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.923 1.488 5.503 3.821 7.159v3.46c0 .324.348.528.629.351l3.39-2.07c.693.18 1.417.279 2.16.279 5.523 0 10-4.145 10-9.259S17.523 2 12 2zm1.093 12.37l-2.446-2.613-4.755 2.613 5.225-5.55 2.502 2.613 4.698-2.613-5.224 5.55z"/></svg>
  `;
  document.body.appendChild(fbFab);

}

// Render Footer
export function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.id = 'footer';

  const isSubPage = window.location.pathname.includes('/iv-drip/');
  const prefix = '/';

  footer.innerHTML = `
    <div class="container">
      <div class="footer__grid">
        <div>
          <div class="footer__brand">
            <div class="footer__logo"><img src="${prefix}images/logo.jpg" alt="Cloud Clinic" width="48" height="48" style="height: 48px; width: auto;"></div>
            <p class="footer__desc">ดูแลผิวคุณให้สวยใส ดั่งก้อนเมฆที่นุ่มนวล ☁️🩵<br>คลินิกความงามครบวงจร ดริปผิว IV Drip กว่า 12 สูตร ขอนแก่น</p>
          </div>
          <div class="footer__map">
            <iframe src="${CONTACT.googleMapsEmbed}" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="แผนที่ Cloud Clinic ขอนแก่น"></iframe>
          </div>
        </div>
        <div>
          <h4 class="footer__heading">เมนูบริการ</h4>
          <a href="/iv-drip-menu/" class="footer__link">💧 เมนูดริปผิวทั้งหมด</a>
          <a href="/iv-drip/vitality-skin/" class="footer__link">Vitality Skin</a>
          <a href="/iv-drip/renewal-skin/" class="footer__link">Renewal Skin</a>
          <a href="/iv-drip/perfection-skin/" class="footer__link">Perfection Skin</a>
          <a href="/iv-drip/celebrity-skin/" class="footer__link">Celebrity Skin</a>
          <a href="/iv-drip/glow-and-clear/" class="footer__link">Glow & Clear Drip</a>
          <a href="/iv-drip/immune-booster/" class="footer__link">Immune Booster Drip</a>
          <h4 class="footer__heading" style="margin-top: var(--space-6)">เพิ่มเติม</h4>
          <a href="/reviews/" class="footer__link">⭐ รีวิวลูกค้า</a>
          <a href="/about/" class="footer__link">ℹ️ เกี่ยวกับเรา</a>
        </div>
        <div>
          <h4 class="footer__heading">ติดต่อเรา</h4>
          <div class="footer__contact-item">📍 ${CONTACT.address}</div>
          <div class="footer__contact-item">⏰ ${CONTACT.hours}</div>
          <div class="footer__contact-item">📞 <a href="${CONTACT.phoneTel}" style="color: inherit">${CONTACT.phone}</a></div>
          <div class="footer__contact-item">💬 LINE: <a href="${CONTACT.lineLink}" target="_blank" style="color: var(--color-accent-green)">${CONTACT.lineOA}</a></div>
          <div class="footer__contact-item">📘 <a href="${CONTACT.facebook}" target="_blank" style="color: #1877F2">Facebook: Cloud Clinic</a></div>
          <a href="${CONTACT.googleMaps}" target="_blank" class="btn btn--outline btn--sm" style="margin-top: var(--space-4)">📍 ดูแผนที่ Google Maps</a>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="footer__copyright">© 2026 Cloud Clinic ขอนแก่น. All rights reserved.</div>
        <div class="footer__seo-tags">ดริปผิว ขอนแก่น | ฉีดผิว ขอนแก่น | วิตามินผิว ขอนแก่น | คลินิกความงาม ขอนแก่น | รักษาสิว ขอนแก่น | ลดรอยดำ ขอนแก่น | ดริปวิตามินแก้แฮงค์</div>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

// Render Trust Signals
export function renderTrustSignals(container) {
  const html = `
    <div class="trust-signals">
      <div class="trust-signal"><span class="trust-signal__icon">✅</span> ตัวยาแท้ 100%</div>
      <div class="trust-signal"><span class="trust-signal__icon">👨‍⚕️</span> ดูแลโดยแพทย์</div>
      <div class="trust-signal"><span class="trust-signal__icon">⭐</span> รีวิว 5 ดาว</div>
      <div class="trust-signal"><span class="trust-signal__icon">🛡️</span> มาตรฐาน อย.</div>
    </div>
  `;
  if (container) container.innerHTML = html;
  return html;
}
