import{i as a}from"./main-Dt8BFXgA.js";const t=[{name:"คุณแนน",initial:"น",image:"celebrity-skin.jpg",service:"Celebrity Skin",text:"ดริปผิวครั้งแรกค่ะ ผิวสว่างขึ้นเลย! บรรยากาศคลินิกดีมาก โซฟานุ่ม มีขนมเสิร์ฟด้วย สบายมาก แอร์เย็นฉ่ำ พนักงานน่ารักมาก จะกลับมาทำอีกแน่นอนค่ะ 🥰",stars:5},{name:"คุณบอส",initial:"บ",image:"party-recovery.jpg",service:"Party Recovery Drip",text:"แฮงค์หนักมากครับ เมื่อคืนดื่มหนัก ตื่นมาแทบไม่ไหว เพื่อนแนะนำมาดริปที่นี่ 15 นาทีเองครับ สดชื่นเลย! พนักงานน่ารัก บริการดีมาก ที่จอดรถสะดวก 👍",stars:5},{name:"คุณมิ้นท์",initial:"ม",image:"glow-and-clear.jpg",service:"Glow & Clear Drip",text:"ทำมา 3 ครั้งแล้วค่ะ ผิวกระจ่างใสขึ้นจริงๆ หน้าไม่หมอง ไม่คล้ำเหมือนก่อน เพื่อนๆ ถามว่าไปทำอะไรมา ชอบมากค่ะ โปร 2 แถม 2 คุ้มสุดๆ ❤️",stars:5},{name:"คุณเอิร์ธ",initial:"อ",image:"immune-booster.jpg",service:"Immune Booster Drip",text:"ช่วงนี้เป็นหวัดบ่อยมาก เพื่อนแนะนำให้มาดริปเสริมภูมิ รู้สึกดีขึ้นเลยครับ ร่างกายกระฉับกระเฉง ไม่อ่อนเพลียเหมือนก่อน แถมผิวก็สว่างขึ้นอีก 💪",stars:5},{name:"คุณพลอย",initial:"พ",image:"skin-detox-acne.jpg",service:"Skin Detox & Acne Clear Drip",text:"เป็นสิวเรื้อรังมานาน ลองดริปสูตรลดสิวดูค่ะ สิวอักเสบลดลงเยอะเลย! ผิวดูดีขึ้นมาก ราคาไม่แพงด้วย คุณหมอให้คำปรึกษาดีมากค่ะ 🌟",stars:5},{name:"คุณเจ",initial:"จ",image:"night-owl.jpg",service:"Night Owl Drip",text:"ทำงานดึกเป็นประจำ นอนวันละ 4-5 ชม. ร่างกายอ่อนเพลียมาก มาดริปสูตร Night Owl สดชื่นขึ้นเลยครับ สมองโล่งขึ้น ทำงานได้ดีขึ้น 🦉",stars:5},{name:"คุณฟ้า",initial:"ฟ",image:"vitality-skin.jpg",service:"Vitality Skin",text:"เริ่มต้นสูตรแรก ราคาไม่แพง คุณภาพดีมากค่ะ คลินิกสะอาด บรรยากาศดี โซฟานุ่มสบาย มีน้ำ มีขนมเสิร์ฟให้ ถูกใจมากค่ะ จะซื้อโปร 2 แถม 2 เลย 🩵",stars:5},{name:"คุณต้น",initial:"ต",image:"slim-and-burn.jpg",service:"Slim & Burn Drip",text:"ออกกำลังกายอยู่แล้ว แต่อยากเร่งผลลัพธ์ มาลองดริปดู รู้สึกว่าเผาผลาญดีขึ้นครับ ไม่เมื่อยล้าหลังออกกำลังกาย แถมผิวดีขึ้นอีก สุดยอดครับ 🏃‍♂️",stars:5}],r=document.getElementById("allReviews");t.forEach((i,e)=>{r.innerHTML+=`
        <div class="review-card animate-on-scroll animate-delay-${e%4+1}">
          <div class="review-card__image">
            <img src="./images/drips/${i.image}" alt="${i.name} Review" loading="lazy">
          </div>
          <div class="review-card__stars">${"".repeat(i.stars)}</div>
          <p class="review-card__text">"${i.text}"</p>
          <div class="review-card__author">
            <div class="review-card__avatar">${i.initial}</div>
            <div>
              <div class="review-card__name">${i.name}</div>
              <div class="review-card__service">${i.service}</div>
            </div>
          </div>
        </div>
      `});a("reviews");
