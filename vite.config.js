import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        notFound: resolve(__dirname, '404.html'),
        ivDripMenu: resolve(__dirname, 'iv-drip-menu/index.html'),
        about: resolve(__dirname, 'about/index.html'),
        reviews: resolve(__dirname, 'reviews/index.html'),
        vitalitySkin: resolve(__dirname, 'iv-drip/vitality-skin/index.html'),
        renewalSkin: resolve(__dirname, 'iv-drip/renewal-skin/index.html'),
        perfectionSkin: resolve(__dirname, 'iv-drip/perfection-skin/index.html'),
        celebritySkin: resolve(__dirname, 'iv-drip/celebrity-skin/index.html'),
        glowAndClear: resolve(__dirname, 'iv-drip/glow-and-clear/index.html'),
        immuneBooster: resolve(__dirname, 'iv-drip/immune-booster/index.html'),
        skinDetoxAcneClear: resolve(__dirname, 'iv-drip/skin-detox-acne-clear/index.html'),
        partyRecovery: resolve(__dirname, 'iv-drip/party-recovery/index.html'),
        slimAndBurn: resolve(__dirname, 'iv-drip/slim-and-burn/index.html'),
        detoxLiverCare: resolve(__dirname, 'iv-drip/detox-liver-care/index.html'),
        nightOwl: resolve(__dirname, 'iv-drip/night-owl/index.html'),
        antiStressSleepWell: resolve(__dirname, 'iv-drip/anti-stress-sleep-well/index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
        blogDripKnowledge: resolve(__dirname, 'blog/drip-knowledge/index.html'),
        blogSkinTips: resolve(__dirname, 'blog/skin-tips/index.html'),
        blogHealthGuide: resolve(__dirname, 'blog/health-guide/index.html'),
        blogWhatIsIvDrip: resolve(__dirname, 'blog/drip-knowledge/what-is-iv-drip/index.html'),
        blogVitaminGuide: resolve(__dirname, 'blog/drip-knowledge/vitamin-guide/index.html'),
        blogSafetyTips: resolve(__dirname, 'blog/drip-knowledge/safety-tips/index.html'),
        blogBrighteningTips: resolve(__dirname, 'blog/skin-tips/brightening-tips/index.html'),
        blogAcneSolutions: resolve(__dirname, 'blog/skin-tips/acne-solutions/index.html'),
        blogAntiAging: resolve(__dirname, 'blog/skin-tips/anti-aging/index.html'),
        blogImmuneBoost: resolve(__dirname, 'blog/health-guide/immune-boost/index.html'),
        blogDetoxGuide: resolve(__dirname, 'blog/health-guide/detox-guide/index.html'),
        blogRecoveryTips: resolve(__dirname, 'blog/health-guide/recovery-tips/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
