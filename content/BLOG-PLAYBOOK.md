# Blog Content Playbook

This is the operating manual for the daily blog-publishing automation. Read this in full
before drafting an article. It exists so that unattended daily publishing stays safe,
on-brand, and legally sound for a medical/aesthetic clinic — read it as constraints, not
suggestions.

## Process (do these in order)

1. Open `content/blog-calendar.json`. Take the **first** entry with `"status": "pending"`.
   If there are none left, stop and tell the user the queue is empty — do not invent a
   new topic on the fly.
2. Write the article body following the **Voice & structure** section below, using the
   topic's `angle` field as your brief. Save it as a draft JSON at
   `content/drafts/<slug>.json` following the **Draft JSON schema** below.
3. Run the guardrail check:
   ```bash
   node scripts/check-blog-guardrails.js content/drafts/<slug>.json
   ```
   If it reports failures, fix the draft and re-run. **Never bypass or edit the guardrail
   script to force a pass.**
4. Once guardrails pass, run:
   ```bash
   node scripts/publish-blog-post.js content/drafts/<slug>.json
   ```
   This writes the article HTML, updates the category index + main blog index + sitemap,
   and marks the calendar entry `published`.
5. Build and sanity-check (`npm run build`), then commit and push to `main` (auto-deploys
   via GitHub Pages). If anything about the process felt uncertain — content quality,
   a claim you weren't sure about, a broken image — stop before pushing and leave the
   commit unpushed with a note instead of guessing.

## Non-negotiable compliance rules

Cloud Clinic is a registered clinic (สถานพยาบาล) offering IV vitamin drips — a cosmetic
wellness service, **not** a treatment for disease. Thai advertising law for clinics
(พ.ร.บ. สถานพยาบาล and the FDA's cosmetic/health-claim rules) restricts how this can be
described. `scripts/check-blog-guardrails.js` scans for the phrases below — treat its
blocklist as a hard boundary, not a style suggestion:

- **No cure/guarantee language**: never say a drip "รักษาให้หาย", "หายขาด", "รับประกันผล",
  "การันตีผลลัพธ์". Frame benefits as support/improvement ("ช่วยฟื้นฟู", "ช่วยลด"), not cures.
- **No absolute safety/superiority claims**: avoid "ปลอดภัย 100%", "ไม่มีผลข้างเคียง",
  "ดีที่สุด", "อันดับ 1", "เบอร์ 1" — these require evidence we don't cite here.
- **No diagnosis**: never tell a reader what condition they have. Describe symptoms/signs
  generally and point them to a professional for an actual assessment.
- **No disparaging comparisons**: never name or imply a specific competitor clinic.
- **Always include a safety out**: any article touching a health condition (skin issues,
  fatigue, immunity, detox, etc.) must include a line recommending the reader consult a
  professional for their specific case — this is not boilerplate, it's the legal safety
  valve for the whole article.
- **Prices**: only state a price if it matches `src/js/components.js` (`IV_DRIPS`) exactly.
  When in doubt, omit the number and link to the drip detail page instead.

## Voice & structure

Match the tone and shape of existing articles, e.g.
`blog/skin-tips/acne-solutions/index.html` — warm, informative, slightly editorial Thai,
never hard-sell. Structure:

- **Title**: ≤ 60 characters, contains the primary keyword naturally.
- **Meta description**: ≤ 155 characters, includes the primary keyword, describes the
  actual content (no clickbait).
- **Highlight box**: 1–2 sentences opening the article with the key takeaway.
- **3–5 H2 sections**: mix of short paragraphs and bullet lists. Weave in keyword
  variations naturally — don't stuff.
- **Body length**: 500–900 words total (excluding boilerplate/CTA/related links).
- **CTA**: link to the related IV drip detail page (`relatedDripId` in the calendar
  entry) and the LINE chat, matching the existing `cta-banner` pattern.
- **Related articles**: 2 links, picked by `scripts/publish-blog-post.js` from other
  published articles in the same or an adjacent category — you don't need to pick these
  yourself.

## Draft JSON schema (`content/drafts/<slug>.json`)

```json
{
  "slug": "iv-drip-pain-duration",
  "category": "drip-knowledge",
  "title": "ดริปผิวเจ็บไหม ใช้เวลานานแค่ไหนกว่าจะเห็นผล",
  "metaDescription": "ตอบคำถามที่หลายคนกังวลก่อนลองดริปผิวครั้งแรก เจ็บแค่ไหน ใช้เวลากี่นาที และเริ่มเห็นผลเมื่อไหร่",
  "metaKeywords": "ดริปผิวเจ็บไหม, ดริปผิว ใช้เวลานานแค่ไหน, ฉีดผิว ขอนแก่น",
  "ogTitle": "ดริปผิวเจ็บไหม ใช้เวลานานแค่ไหนกว่าจะเห็นผล",
  "ogDescription": "ตอบคำถามที่หลายคนกังวลก่อนลองดริปผิวครั้งแรก",
  "heroTitle": "ดริปผิวเจ็บไหม?<br>ใช้เวลานานแค่ไหนกว่าจะเห็นผล",
  "readTime": 5,
  "highlightBox": "สรุปสั้นๆ ก่อนอ่านต่อ ใส่ 1-2 ประโยคที่เป็น key takeaway ของบทความ",
  "sections": [
    {
      "heading": "หัวข้อ H2 แรก",
      "paragraphs": ["ย่อหน้า 1", "ย่อหน้า 2"]
    },
    {
      "heading": "หัวข้อ H2 ที่มี list",
      "paragraphs": ["ย่อหน้านำก่อน list (ถ้ามี)"],
      "list": ["ข้อ 1", "ข้อ 2", "ข้อ 3"]
    }
  ],
  "relatedDripId": "vitality-skin",
  "ctaTitle": "หัวข้อ CTA banner ท้ายบทความ",
  "ctaSubtitle": "ประโยครองใต้ CTA พร้อมราคา/โปรโมชั่นถ้ามี (ต้องตรงกับ components.js)"
}
```

Field notes:
- `category` must be one of the keys in `content/blog-calendar.json`'s `categories`.
- `sections` needs at least 3 entries. Each needs `paragraphs` and/or `list` (at least one).
- `relatedDripId` must exist in `IV_DRIPS` inside `src/js/components.js`.
- Do not include HTML tags inside `paragraphs`/`list` text except `<strong>` for emphasis,
  matching the existing article style.
