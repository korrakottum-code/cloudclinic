# 🔍 SEO Review: Cloud Clinic Website

> คลินิกดริปผิว ขอนแก่น — วิเคราะห์จาก codebase ทั้งหมด (16 หน้า)  
> วันที่รีวิว: 8 มีนาคม 2026

---

## ✅ สิ่งที่ทำได้ดีแล้ว

### 1. On-Page SEO พื้นฐานครบ
- `<html lang="th">` — ตั้งภาษาถูกต้องทุกหน้า
- **Title / Meta Description / Keywords** — มีครบทุกหน้า ใส่ keyword หลัก "ฉีดผิว ขอนแก่น", "ดริปผิว ขอนแก่น" ตรงตาม `seo-guidelines.md`
- **Canonical URL** — มีทุกหน้า ชี้ไปที่ `cloudclinic-khonkaen.com`
- **Open Graph tags** — มี og:title, og:description, og:type, og:locale ครบในหน้าหลัก

### 2. Structured Data (JSON-LD) ดีมาก
- หน้าแรกใช้ `MedicalBusiness` schema พร้อม `hasOfferCatalog`
- หน้า detail แต่ละสูตรใช้ `Product` schema + `AggregateRating` — ช่วยแสดง rich snippet ดาวบน Google
- หน้า about มี `MedicalBusiness` schema เช่นกัน

### 3. Technical SEO พื้นฐาน
- **`robots.txt`** + **`sitemap.xml`** — มีครบ ครอบคลุมทุก 16 หน้า
- **Breadcrumb** — มีในทุก sub-page ช่วยโครงสร้าง navigation
- **`loading="lazy"`** — ใส่ให้ images ถูกต้อง

### 4. Content Strategy ดี
- มีหน้า detail เฉพาะสำหรับแต่ละสูตร IV Drip ทั้ง **12 สูตร** — สร้าง long-tail keyword pages ได้เยอะ
- มี Knowledge section (ความรู้เรื่องดริปผิว) ที่หน้าแรก
- มี Footer SEO tags ครบตาม guideline

---

## ✅ สิ่งที่ปรับปรุงแล้ว (Update ล่าสุด)

✔️ **Favicon ## ⚠️ สิ่งที่ควรปรับปรุง OG Image:** เพิ่ม Favicon และ `og:image` ครบทุกหน้าแล้ว
✔️ **Clean URLs:** ปรับ URL เป็นแบบไม่มี `.html` ต่อท้าย (Directory-based)
✔️ **BreadcrumbList JSON-LD:** เพิ่ม schema ของ Breadcrumb ทุกหน้าเรียบร้อย
✔️ **Google Maps ## ⚠️ สิ่งที่ควรปรับปรุง Logo:** แก้ไขพิกัดแผนที่ให้ตรงและดึง Logo จาก root เสมอ
✔️ **Google Search Console:** ยืนยันเว็บไซต์และส่ง Sitemap แล้ว
✔️ **Semantic HTML:** เพิ่ม `<main>` tag เรียบร้อยแล้ว

---

## ⚠️ สิ่งที่ยังต้องปรับปรุงต่อ (ถ้าต้องการ)

### 🔴 Critical Issues

#### 1. ไม่มี Favicon
ไม่พบ favicon ใดๆ ใน project — ส่งผลต่อ branding บน browser tab และ Google search results

**แนะนำ:** เพิ่มใน `<head>` ทุกหน้า:
```html
<link rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

#### 2. ไม่มี `og:image` ในทุกหน้า
OG tags ขาด `og:image` และ `og:url` — ทำให้แชร์ลิงก์บน Facebook/LINE จะไม่มีรูปภาพ preview

**แนะนำ:** เพิ่มทุกหน้า:
```html
<meta property="og:image" content="https://cloudclinic-khonkaen.com/images/og-cover.jpg">
<meta property="og:url" content="https://cloudclinic-khonkaen.com/">
```

#### 3. Structured Data: `"image": ""` ว่างเปล่า
- ไฟล์: `index.html` บรรทัดที่ 46
- Google ต้องการ image ใน schema เพื่อแสดง rich results — ต้องใส่ URL รูปคลินิกหรือโลโก้

#### 4. Google Maps link ยัง placeholder อยู่
- ไฟล์: `index.html` บรรทัดที่ 327
- ลิงก์ยังเป็น `https://maps.app.goo.gl/YOUR_MAPS_LINK`
- ต้องเปลี่ยนเป็นลิงก์จริง (มีอยู่แล้วใน `components.js` → `CONTACT.googleMaps`)

#### 5. Content ส่วนใหญ่ render ด้วย JavaScript → Google อาจไม่ index
เนื้อหาสำคัญเช่น **Drip Cards, Reviews, Navbar, Footer** ทั้งหมด render ผ่าน JS

**ปัญหา:** Googlebot สามารถ render JS ได้ แต่มี delay (second wave indexing) และบางครั้ง crawl budget จำกัด

**แนะนำ:**
- พิจารณา **SSG (Static Site Generation)** หรือ **pre-render** HTML สำหรับ content สำคัญ
- อย่างน้อย Footer SEO tags ควรเป็น static HTML ไม่ใช่ JS-injected

---

### 🟡 Important Improvements

#### 6. ไม่มี `<main>` semantic tag ใน index.html
- หน้า `index.html` ไม่มี `<main>` tag ครอบ content — ส่งผลต่อ accessibility และ SEO semantic
- **แนะนำ:** ครอบ sections ทั้งหมดด้วย `<main>`

#### 7. Knowledge section เป็นแค่รูปภาพ ไม่มีข้อความ
- มีแค่ `<img>` + alt text — Google ไม่สามารถ index เนื้อหาในรูปภาพได้ดี
- **แนะนำ:** เพิ่มข้อความอธิบายใต้รูปแต่ละ knowledge card หรือสร้างเป็น **blog article pages** แยก
- จะช่วย SEO มหาศาลสำหรับ informational keywords เช่น "ดริปผิวคืออะไร", "ดริปผิวเหมาะกับใคร"

#### 8. Title / Meta Description ยาวเกินบางหน้า

| หน้า | Title length | หมายเหตุ |
|---|---|---|
| `index.html` | ~65 chars | ✅ พอดี |
| `iv-drip-menu.html` | ~70 chars | ⚠️ อาจถูกตัดบน Google |

- Meta description ของ `iv-drip-menu.html` ยาวมาก (~160+ chars) อาจถูก Google ตัด
- **แนะนำ:** Title ≤ 60 chars, Description ≤ 155 chars

#### 9. Breadcrumb ยังไม่มี Structured Data
- มี breadcrumb visual แต่ไม่มี `BreadcrumbList` JSON-LD schema
- **แนะนำ:** เพิ่ม BreadcrumbList schema ทุกหน้า — ช่วยแสดง breadcrumb บน Google SERPs

---

### 🟢 Nice-to-Have

#### 10. ไม่มี Blog / Article section
- มีกลยุทธ์ keyword ดี แต่ยังขาด **blog content** ที่จะ target informational keywords เช่น:
  - "ดริปผิวคืออะไร"
  - "ดริปวิตามินผิวสูตรไหนดี"
  - "ดริปผิวบ่อยแค่ไหนดี"
- **แนะนำ:** สร้าง `/blog/` section พร้อม article pages

#### 11. ไม่มี Google Analytics / Google Search Console snippet
- ไม่พบ tracking code ใดๆ — ต้องมีเพื่อวัดผล SEO

#### 12. Font loading strategy ช้า
- โหลด font ผ่าน CSS `@import` ใน render-blocking stylesheet
- **แนะนำ:** ใช้ `<link rel="preconnect">` + `<link rel="stylesheet">` ใน `<head>` แทน
- ลด font weight ที่ไม่จำเป็น (300, 500)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;600;700;800&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

#### 13. Images ไม่มี `width` / `height` attributes
- ทำให้เกิด **CLS (Cumulative Layout Shift)** ส่งผลต่อ Core Web Vitals
- **แนะนำ:** ใส่ `width` และ `height` ให้ `<img>` ทุกตัว

#### 14. Inline styles มีเยอะมาก
- หลาย element ใช้ `style="..."` inline — ไม่ส่งผลต่อ SEO โดยตรง แต่ทำให้ CSS bloated และ maintenance ยาก

---

## 📊 สรุป SEO Score (ประเมินจาก code)

| หมวด | คะแนน | หมายเหตุ |
|---|---|---|
| **Title & Meta** | ⭐⭐⭐⭐ | ดี แต่ขาด og:image |
| **Structured Data** | ⭐⭐⭐⭐ | ดีมาก แค่ image ว่าง |
| **Semantic HTML** | ⭐⭐⭐ | ขาด `<main>`, content เป็น JS |
| **Technical SEO** | ⭐⭐⭐⭐ | มี sitemap, robots.txt, canonical |
| **Content** | ⭐⭐⭐ | ดี แต่ขาด blog, knowledge เป็นรูป |
| **Performance** | ⭐⭐⭐ | lazy loading ดี แต่ font/CLS ต้องปรับ |
| **Local SEO** | ⭐⭐⭐⭐ | ที่อยู่ เบอร์โทร แผนที่ครบ |

---

## 🎯 Top 5 สิ่งที่ควรทำก่อน

1. **เพิ่ม `og:image`** ทุกหน้า + แก้ `"image": ""` ใน JSON-LD
2. **แก้ Google Maps placeholder** link ใน `index.html`
3. **เพิ่ม favicon**
4. **Pre-render / SSG** เนื้อหาสำคัญแทนการ inject ด้วย JS ทั้งหมด
5. **สร้าง blog articles** จาก knowledge section ที่มีอยู่แล้ว
