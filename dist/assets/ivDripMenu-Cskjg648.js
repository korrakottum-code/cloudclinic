import{I as a,A as n,i as r}from"./main-Dt8BFXgA.js";function e(t,s=!1){return`
        <div class="drip-card ${s?"drip-card--premium":""} animate-on-scroll" style="display:flex; flex-direction:column;">
          <div class="drip-card__image">
            <img src="./${t.image}" alt="${t.name}" loading="lazy">
          </div>
          <div style="display:flex; align-items:center; gap:var(--space-3); margin-bottom:var(--space-3);">
            <span style="font-size:2.5rem;">${t.emoji}</span>
            <div>
              <h3 class="drip-card__name">${t.name}</h3>
              <div class="drip-card__price">${t.priceText} <span>/ ครั้ง</span></div>
            </div>
          </div>
          <div style="margin-bottom:var(--space-3);">
            <p style="font-size:var(--text-sm); font-weight:600; color:var(--color-text); margin-bottom:var(--space-1);">🎯 เหมาะสำหรับ:</p>
            <p class="drip-card__desc">${t.suitable}</p>
          </div>
          <div style="margin-bottom:var(--space-3);">
            <p style="font-size:var(--text-sm); font-weight:600; color:var(--color-text); margin-bottom:var(--space-1);">ช่วยเรื่อง:</p>
            <p class="drip-card__desc">${t.benefits}</p>
          </div>
          <div class="drip-card__tags">
            ${t.tags.map(i=>`<span class="drip-card__tag">${i}</span>`).join("")}
          </div>
          <div style="margin-top:auto; display:flex; gap:var(--space-2);">
            <a href="./iv-drip/${t.id}.html" class="btn btn--primary btn--sm" style="flex:1;">ดูรายละเอียด</a>
            <a href="https://line.me/ti/p/~@Cloud-clinic" target="_blank" class="btn btn--line btn--sm" style="flex:1;">จองเลย</a>
          </div>
        </div>
      `}document.getElementById("standardCards").innerHTML=a.standard.map(t=>e(t)).join("");document.getElementById("premiumCards").innerHTML=a.premium.map(t=>e(t,!0)).join("");const d=document.getElementById("comparisonBody");n.forEach(t=>{d.innerHTML+=`
        <tr>
          <td><strong>${t.emoji} ${t.name}</strong></td>
          <td>${t.group==="standard"?"Standard":"Premium"}</td>
          <td><strong>${t.priceText}</strong></td>
          <td>${t.suitable}</td>
          <td>${t.benefits}</td>
          <td><a href="./iv-drip/${t.id}.html" class="btn btn--primary btn--sm">ดูเพิ่ม</a></td>
        </tr>
      `});r("menu");
