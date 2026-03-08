import{I as t,A as n,i as r}from"./main-Cwf2sOX-.js";function e(a,s=!1){return`
        <div class="drip-card ${s?"drip-card--premium":""} animate-on-scroll" style="display:flex; flex-direction:column;">
          <div class="drip-card__image">
            <img src="./${a.image}" alt="${a.name}" loading="lazy">
          </div>
          <div style="display:flex; align-items:center; gap:var(--space-3); margin-bottom:var(--space-3);">
            <span style="font-size:2.5rem;">${a.emoji}</span>
            <div>
              <h3 class="drip-card__name">${a.name}</h3>
              <div class="drip-card__price">${a.priceText} <span>/ ครั้ง</span></div>
            </div>
          </div>
          <div style="margin-bottom:var(--space-3);">
            <p style="font-size:var(--text-sm); font-weight:600; color:var(--color-text); margin-bottom:var(--space-1);">🎯 เหมาะสำหรับ:</p>
            <p class="drip-card__desc">${a.suitable}</p>
          </div>
          <div style="margin-bottom:var(--space-3);">
            <p style="font-size:var(--text-sm); font-weight:600; color:var(--color-text); margin-bottom:var(--space-1);">ช่วยเรื่อง:</p>
            <p class="drip-card__desc">${a.benefits}</p>
          </div>
          <div class="drip-card__tags">
            ${a.tags.map(i=>`<span class="drip-card__tag">${i}</span>`).join("")}
          </div>
          <div style="margin-top:auto; display:flex; gap:var(--space-2);">
            <a href="./iv-drip/${a.id}/" class="btn btn--primary btn--sm" style="flex:1;">ดูรายละเอียด</a>
            <a href="https://line.me/ti/p/~@Cloud-clinic" target="_blank" class="btn btn--line btn--sm" style="flex:1;">จองเลย</a>
          </div>
        </div>
      `}document.getElementById("standardCards").innerHTML=t.standard.map(a=>e(a)).join("");document.getElementById("premiumCards").innerHTML=t.premium.map(a=>e(a,!0)).join("");const d=document.getElementById("comparisonBody");n.forEach(a=>{d.innerHTML+=`
        <tr>
          <td><strong>${a.emoji} ${a.name}</strong></td>
          <td>${a.group==="standard"?"Standard":"Premium"}</td>
          <td><strong>${a.priceText}</strong></td>
          <td>${a.suitable}</td>
          <td>${a.benefits}</td>
          <td><a href="./iv-drip/${a.id}/" class="btn btn--primary btn--sm">ดูเพิ่ม</a></td>
        </tr>
      `});r("menu");
