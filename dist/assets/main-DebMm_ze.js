(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const i={lineOA:"@Cloud-clinic",lineLink:"https://line.me/ti/p/~@Cloud-clinic",phone:"065-749-2944",phoneTel:"tel:0657492944",facebook:"https://www.facebook.com/CloudClinickk",googleMaps:"https://maps.app.goo.gl/rSfu97bqaFn2N2Sb6",googleMapsEmbed:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.837894283127!2d102.83093951167434!3d16.427958184224795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31228a6fcf7c7c13%3A0xc3f8eec6c321d46d!2sCloud%20clinic%20%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99%20-%20%E0%B8%84%E0%B8%A5%E0%B8%B4%E0%B8%99%E0%B8%B4%E0%B8%81%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%87%E0%B8%B2%E0%B8%A1%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99!5e0!3m2!1sth!2sth!4v1708845233156!5m2!1sth!2sth",address:"1/1 ถ.กลางเมือง ต.ในเมือง อ.เมือง จ.ขอนแก่น 40000 (ใกล้ศึกษาภัณฑ์ขอนแก่น)",hours:"เปิดบริการ 12.00 - 20.00 น. (ปิดทุกวันพุธ)"};function l(e=""){const a=document.createElement("nav");a.className="navbar",a.id="navbar",window.location.pathname.includes("/iv-drip/");const o="/";a.innerHTML=`
    <div class="navbar__inner">
      <a href="/" class="navbar__logo" aria-label="Cloud Clinic Home">
        <img src="${o}images/logo.jpg" alt="Cloud Clinic" class="navbar__logo-img">
      </a>
      <div class="navbar__links" id="navLinks">
        <a href="/" class="navbar__link ${e==="home"?"active":""}">หน้าแรก</a>
        <a href="/iv-drip-menu/" class="navbar__link ${e==="menu"?"active":""}">เมนูดริปผิว</a>
        <a href="/reviews/" class="navbar__link ${e==="reviews"?"active":""}">รีวิว</a>
        <a href="/blog/" class="navbar__link ${e==="blog"?"active":""}">บทความ</a>
        <a href="/about/" class="navbar__link ${e==="about"?"active":""}">เกี่ยวกับเรา</a>
        <a href="${i.lineLink}" target="_blank" class="btn btn--line btn--sm navbar__cta">💬 แชท LINE</a>
      </div>
      <button class="navbar__hamburger" id="hamburger" aria-label="เมนู">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-overlay" id="navOverlay"></div>
  `,document.body.prepend(a)}function c(){const e=document.createElement("div");e.className="sticky-bar",e.id="stickyBar",e.innerHTML=`
    <div class="sticky-bar__inner">
      <a href="${i.lineLink}" target="_blank" class="sticky-bar__btn sticky-bar__btn--line" aria-label="แชท LINE">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
        แชท LINE
      </a>
      <a href="${i.phoneTel}" class="sticky-bar__btn sticky-bar__btn--phone" aria-label="โทรออก">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
        โทรจองคิว
      </a>
    </div>
  `,document.body.appendChild(e);const a=document.createElement("a");a.href="https://m.me/CloudClinickk",a.target="_blank",a.className="fab-messenger",a.setAttribute("aria-label","Chat on Messenger"),a.innerHTML=`
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.923 1.488 5.503 3.821 7.159v3.46c0 .324.348.528.629.351l3.39-2.07c.693.18 1.417.279 2.16.279 5.523 0 10-4.145 10-9.259S17.523 2 12 2zm1.093 12.37l-2.446-2.613-4.755 2.613 5.225-5.55 2.502 2.613 4.698-2.613-5.224 5.55z"/></svg>
  `,document.body.appendChild(a)}function d(){const e=document.createElement("footer");e.className="footer",e.id="footer",window.location.pathname.includes("/iv-drip/");const a="/";e.innerHTML=`
    <div class="container">
      <div class="footer__grid">
        <div>
          <div class="footer__brand">
            <div class="footer__logo"><img src="${a}images/logo.jpg" alt="Cloud Clinic" style="height: 48px; width: auto;"></div>
            <p class="footer__desc">ดูแลผิวคุณให้สวยใส ดั่งก้อนเมฆที่นุ่มนวล ☁️🩵<br>คลินิกความงามครบวงจร ดริปผิว IV Drip กว่า 12 สูตร ขอนแก่น</p>
          </div>
          <div class="footer__map">
            <iframe src="${i.googleMapsEmbed}" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="แผนที่ Cloud Clinic ขอนแก่น"></iframe>
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
          <div class="footer__contact-item">📍 ${i.address}</div>
          <div class="footer__contact-item">⏰ ${i.hours}</div>
          <div class="footer__contact-item">📞 <a href="${i.phoneTel}" style="color: inherit">${i.phone}</a></div>
          <div class="footer__contact-item">💬 LINE: <a href="${i.lineLink}" target="_blank" style="color: var(--color-accent-green)">${i.lineOA}</a></div>
          <div class="footer__contact-item">📘 <a href="${i.facebook}" target="_blank" style="color: #1877F2">Facebook: Cloud Clinic</a></div>
          <a href="${i.googleMaps}" target="_blank" class="btn btn--outline btn--sm" style="margin-top: var(--space-4)">📍 ดูแผนที่ Google Maps</a>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="footer__copyright">© 2026 Cloud Clinic ขอนแก่น. All rights reserved.</div>
        <div class="footer__seo-tags">ดริปผิว ขอนแก่น | ฉีดผิว ขอนแก่น | วิตามินผิว ขอนแก่น | คลินิกความงาม ขอนแก่น | รักษาสิว ขอนแก่น | ลดรอยดำ ขอนแก่น | ดริปวิตามินแก้แฮงค์</div>
      </div>
    </div>
  `,document.body.appendChild(e)}function p(e=""){l(e),c(),d(),v(),f(),m(),u()}function v(){const e=document.getElementById("hamburger"),a=document.getElementById("navLinks"),o=document.getElementById("navOverlay");e&&(e.addEventListener("click",()=>{e.classList.toggle("active"),a.classList.toggle("open"),o.classList.toggle("active"),document.body.style.overflow=a.classList.contains("open")?"hidden":""}),o?.addEventListener("click",()=>{e.classList.remove("active"),a.classList.remove("open"),o.classList.remove("active"),document.body.style.overflow=""}),a?.querySelectorAll(".navbar__link").forEach(s=>{s.addEventListener("click",()=>{e.classList.remove("active"),a.classList.remove("open"),o?.classList.remove("active"),document.body.style.overflow=""})}))}function f(){const e=new IntersectionObserver(a=>{a.forEach(o=>{o.isIntersecting&&(o.target.classList.add("is-visible"),e.unobserve(o.target))})},{threshold:.1,rootMargin:"0px 0px -50px 0px"});document.querySelectorAll(".animate-on-scroll").forEach(a=>{e.observe(a)})}function m(){const e=document.getElementById("navbar");e&&window.addEventListener("scroll",()=>{window.scrollY>50?e.classList.add("scrolled"):e.classList.remove("scrolled")},{passive:!0})}function u(){const e=document.querySelectorAll(".hero__cloud");e.length&&window.addEventListener("scroll",()=>{const a=window.scrollY;e.forEach((o,s)=>{const t=(s+1)*.15;o.style.transform=`translateY(${a*t}px)`})},{passive:!0})}export{p as i};
