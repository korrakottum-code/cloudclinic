// Known intrinsic dimensions for drip images, scraped from existing hand-written pages —
// keeps width/height attributes correct on every generated card (avoids CLS regressions).
export const DRIP_IMAGE_DIMS = {
  'anti-stress.webp': { width: 1600, height: 1728 },
  'detox-liver-care.webp': { width: 1600, height: 1728 },
  'glow-and-clear.webp': { width: 1600, height: 1728 },
  'immune-booster.webp': { width: 1600, height: 1728 },
  'night-owl.webp': { width: 1600, height: 1728 },
  'party-recovery.webp': { width: 1600, height: 1728 },
  'skin-detox-acne.webp': { width: 1600, height: 1728 },
  'slim-and-burn.webp': { width: 1600, height: 1728 },
  'celebrity-skin.webp': { width: 997, height: 1085 },
  'perfection-skin.webp': { width: 997, height: 1085 },
  'renewal-skin.webp': { width: 997, height: 1085 },
  'vitality-skin.webp': { width: 997, height: 1085 },
};

/**
 * @param {object} entry
 * @param {string} entry.href - e.g. "/blog/drip-knowledge/iv-drip-pain-duration/"
 * @param {string} entry.image - e.g. "/images/drips/vitality-skin.webp"
 * @param {string} entry.title
 * @param {string} entry.excerpt
 * @param {string} entry.categoryLabel
 * @param {number} entry.readTime
 * @param {object} [opts]
 * @param {'h2'|'div'} [opts.titleTag='div'] - main blog index uses h2, category indexes use div
 * @param {string} [opts.animateClass='animate-on-scroll']
 */
export function renderBlogCard(entry, opts = {}) {
  const { titleTag = 'div', animateClass = 'animate-on-scroll' } = opts;
  const filename = entry.image.split('/').pop();
  const dims = DRIP_IMAGE_DIMS[filename] || { width: 1600, height: 1728 };

  return `          <a href="${entry.href}" class="blog-card ${animateClass}">
            <img width="${dims.width}" height="${dims.height}" src="${entry.image}" alt="${entry.title}" class="blog-card__image" loading="lazy">
            <div class="blog-card__body">
              <div class="blog-card__category">${entry.categoryLabel}</div>
              <${titleTag} class="blog-card__title">${entry.title}</${titleTag}>
              <p class="blog-card__excerpt">${entry.excerpt}</p>
              <div class="blog-card__meta">
                <span>⏱️ อ่าน ${entry.readTime} นาที</span>
                <span class="blog-card__read-more">อ่านต่อ →</span>
              </div>
            </div>
          </a>`;
}
