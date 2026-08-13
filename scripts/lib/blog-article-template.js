import { TRACKING_HEAD, TRACKING_BODY_NOSCRIPT, FONTS_HEAD } from './tracking-snippets.js';

const SITE = 'https://cloudclinicth.com';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderParagraphs(paragraphs = []) {
  return paragraphs.map((p) => `          <p>${p}</p>`).join('\n');
}

function renderList(items = []) {
  if (!items.length) return '';
  const lis = items.map((li) => `            <li>${li}</li>`).join('\n');
  return `          <ul>\n${lis}\n          </ul>`;
}

function renderSection(section) {
  const parts = [`          <h2>${section.heading}</h2>`];
  if (section.paragraphs?.length) parts.push(renderParagraphs(section.paragraphs));
  if (section.list?.length) parts.push(renderList(section.list));
  return parts.join('\n');
}

function renderRelated(related) {
  return related
    .map(
      (r) => `            <a href="${r.href}" class="related-card">
              <span class="related-card__emoji">${r.emoji}</span>
              <div>
                <div class="related-card__cat">${r.categoryLabel}</div>
                <div class="related-card__title">${r.title}</div>
              </div>
            </a>`
    )
    .join('\n');
}

/**
 * @param {object} draft - validated draft content (see content/BLOG-PLAYBOOK.md schema)
 * @param {object} ctx
 * @param {{label:string, path:string}} ctx.categoryMeta
 * @param {object} ctx.drip - entry from IV_DRIPS matching draft.relatedDripId
 * @param {Array<{href:string, emoji:string, categoryLabel:string, title:string}>} ctx.related
 * @param {string} ctx.publishDate - YYYY-MM-DD
 * @param {string} ctx.publishDateThai - human-readable Thai date
 */
export function renderArticleHTML(draft, ctx) {
  const { categoryMeta, drip, related, publishDate, publishDateThai } = ctx;
  const canonical = `${SITE}/blog/${draft.category}/${draft.slug}/`;
  const sectionsHtml = draft.sections.map(renderSection).join('\n\n');

  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(draft.title)} | Cloud Clinic ขอนแก่น</title>
  <meta name="description" content="${escapeHtml(draft.metaDescription)}">
  <meta name="keywords" content="${escapeHtml(draft.metaKeywords)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${escapeHtml(draft.ogTitle)}">
  <meta property="og:description" content="${escapeHtml(draft.ogDescription)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE}/images/og-cover.jpg">
  <link rel="icon" href="/favicon-transparent.ico">
  <link rel="apple-touch-icon" href="/apple-touch-icon-transparent.png">
  <link rel="stylesheet" href="/src/styles/index.css">
  <link rel="stylesheet" href="/src/styles/components.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${escapeHtml(draft.title)}",
    "author": {"@type": "Organization", "name": "Cloud Clinic ขอนแก่น"},
    "publisher": {"@type": "Organization", "name": "Cloud Clinic ขอนแก่น", "url": "${SITE}"},
    "url": "${canonical}",
    "datePublished": "${publishDate}",
    "dateModified": "${publishDate}"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "หน้าแรก", "item": "${SITE}/"},
      {"@type": "ListItem", "position": 2, "name": "บทความ", "item": "${SITE}/blog/"},
      {"@type": "ListItem", "position": 3, "name": "${categoryMeta.label}", "item": "${SITE}${categoryMeta.path}"},
      {"@type": "ListItem", "position": 4, "name": "${escapeHtml(draft.title)}", "item": "${canonical}"}
    ]
  }
  </script>
${FONTS_HEAD}
  <style>
    .article-hero { background: var(--gradient-sky); padding: var(--space-12) 0 var(--space-8); }
    .article-container { max-width: 760px; margin: 0 auto; padding: 0 var(--space-4); }
    .article-meta { display: flex; gap: var(--space-4); font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-4) 0; flex-wrap: wrap; }
    .article-content h2 { font-size: var(--text-2xl); font-weight: 700; color: var(--color-text); margin: var(--space-8) 0 var(--space-4); }
    .article-content p { font-size: var(--text-base); color: var(--color-text-light); line-height: 1.8; margin-bottom: var(--space-4); }
    .article-content ul { padding-left: var(--space-6); margin-bottom: var(--space-4); }
    .article-content li { font-size: var(--text-base); color: var(--color-text-light); line-height: 1.8; margin-bottom: var(--space-2); }
    .highlight-box { background: var(--gradient-sky); border-radius: var(--radius-xl); padding: var(--space-6); margin: var(--space-6) 0; border-left: 4px solid var(--color-primary); }
    .highlight-box p { margin: 0; font-weight: 600; color: var(--color-text); }
    .related-articles { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-4); margin-top: var(--space-6); }
    .related-card { background: white; border-radius: var(--radius-xl); padding: var(--space-5); border: 1px solid var(--color-border-light); text-decoration: none; color: inherit; display: flex; gap: var(--space-3); align-items: flex-start; transition: box-shadow 0.2s; }
    .related-card:hover { box-shadow: var(--shadow-md); }
    .related-card__emoji { font-size: 2rem; flex-shrink: 0; }
    .related-card__title { font-weight: 700; color: var(--color-text); font-size: var(--text-sm); line-height: 1.4; }
    .related-card__cat { font-size: var(--text-xs); color: var(--color-primary); font-weight: 600; margin-bottom: var(--space-1); }
  </style>
${TRACKING_HEAD}
</head>
<body>
${TRACKING_BODY_NOSCRIPT}

  <nav id="navbar"></nav>
  <main>
    <section class="article-hero">
      <div class="article-container">
        <nav style="font-size:var(--text-sm); color:var(--color-text-muted); margin-bottom:var(--space-4);">
          <a href="/" style="color:var(--color-primary);">หน้าแรก</a> ›
          <a href="/blog/" style="color:var(--color-primary);">บทความ</a> ›
          <a href="${categoryMeta.path}" style="color:var(--color-primary);">${categoryMeta.label}</a> ›
          <span>${escapeHtml(draft.title)}</span>
        </nav>
        <div class="section-badge">${categoryMeta.label}</div>
        <h1 style="font-size:var(--text-4xl); font-weight:800; color:var(--color-text); margin:var(--space-4) 0; line-height:1.3;">
          ${draft.heroTitle}
        </h1>
        <div class="article-meta">
          <span>📅 ${publishDateThai}</span>
          <span>⏱️ อ่าน ${draft.readTime} นาที</span>
          <span>✍️ ทีม Cloud Clinic</span>
        </div>
      </div>
    </section>
    <article class="section">
      <div class="article-container">
        <div class="article-content">
          <div class="highlight-box">
            <p>${draft.highlightBox}</p>
          </div>

${sectionsHtml}

          <div class="cta-banner" style="margin-top: var(--space-8);">
            <div class="cta-banner__content">
              <h2 class="cta-banner__title">${draft.ctaTitle}</h2>
              <p class="cta-banner__subtitle">${draft.ctaSubtitle}</p>
              <div class="cta-banner__actions">
                <a href="https://line.me/ti/p/~@Cloud-clinic" target="_blank" class="btn btn--line btn--lg">ปรึกษาทาง LINE</a>
                <a href="/iv-drip/${drip.id}/" class="btn btn--primary btn--lg">ดูรายละเอียดสูตร</a>
              </div>
            </div>
          </div>

          <h2>บทความที่เกี่ยวข้อง</h2>
          <div class="related-articles">
${renderRelated(related)}
          </div>
        </div>
      </div>
    </article>
  </main>
  <script type="module">
    import { initApp } from '/src/js/main.js';
    initApp('blog');
  </script>
</body>
</html>
`;
}
