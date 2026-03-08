import{i as r,I as e}from"./main-B-6nu-R5.js";r("home");const d=document.getElementById("standardDrips");e.standard.forEach((a,s)=>{d.innerHTML+=`
        <a href="./iv-drip/${a.id}.html" class="drip-card" style="text-decoration:none; color:inherit; display:flex; flex-direction:column;">
          <div class="drip-card__image">
            <img src="./${a.image}" alt="${a.name}" loading="lazy">
          </div>
          <div class="drip-card__header">
            <h3 class="drip-card__name">${a.name}</h3>
          </div>
          <div class="drip-card__price">${a.priceText} <span>/ ครั้ง</span></div>
          <p class="drip-card__desc">${a.suitable}</p>
          <div class="drip-card__tags">
            ${a.tags.map(i=>`<span class="drip-card__tag">${i}</span>`).join("")}
          </div>
          <div class="drip-card__cta" style="margin-top:auto;">
            <span class="btn btn--primary btn--sm btn--block">ดูรายละเอียด →</span>
          </div>
        </a>
      `});const c=document.getElementById("premiumDrips");e.premium.forEach((a,s)=>{c.innerHTML+=`
        <a href="./iv-drip/${a.id}.html" class="drip-card drip-card--premium" style="text-decoration:none; color:inherit; display:flex; flex-direction:column;">
          <div class="drip-card__image">
            <img src=".${a.image}" alt="${a.name}" loading="lazy">
          </div>
          <div class="drip-card__header">
            <h3 class="drip-card__name">${a.name}</h3>
          </div>
          <div class="drip-card__price">${a.priceText} <span>/ ครั้ง</span></div>
          <p class="drip-card__desc">${a.benefits}</p>
          <div class="drip-card__tags">
            ${a.tags.map(i=>`<span class="drip-card__tag">${i}</span>`).join("")}
          </div>
          <div class="drip-card__cta" style="margin-top:auto;">
            <span class="btn btn--primary btn--sm btn--block">ดูรายละเอียด →</span>
          </div>
        </a>
      `});const t=[{name:"คุณแนน",service:"Celebrity Skin",text:"ดริปผิวครั้งแรกค่ะ ผิวสว่างขึ้นเลย! บรรยากาศคลินิกดีมาก โซฟานุ่ม มีขนมเสิร์ฟด้วย สบายมาก 🥰",stars:5},{name:"คุณบอส",service:"Party Recovery",text:"แฮงค์หนักมาก มาดริปเสร็จ 15 นาที รู้สึกสดชื่นเลยครับ พนักงานน่ารัก บริการดีมาก 👍",stars:5},{name:"คุณมิ้นท์",service:"Glow & Clear Drip",text:"ทำมา 3 ครั้งแล้วค่ะ ผิวกระจ่างใสขึ้นจริงๆ หน้าไม่หมองเหมือนก่อน ชอบมากค่ะ โปร 2 แถม 2 คุ้มสุดๆ ❤️",stars:5}],n=document.getElementById("reviewCards");t.forEach((a,s)=>{n.innerHTML+=`
        <div class="review-card">
          <div class="review-card__stars">${"".repeat(a.stars)}</div>
          <p class="review-card__text">"${a.text}"</p>
          <div class="review-card__author">
            <div class="review-card__avatar">${a.name.charAt(3)}</div>
            <div>
              <div class="review-card__name">${a.name}</div>
              <div class="review-card__service">${a.service}</div>
            </div>
          </div>
        </div>
      `});
