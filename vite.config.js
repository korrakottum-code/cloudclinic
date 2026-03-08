import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ivDripMenu: resolve(__dirname, 'iv-drip-menu.html'),
        about: resolve(__dirname, 'about.html'),
        reviews: resolve(__dirname, 'reviews.html'),
        vitalitySkin: resolve(__dirname, 'iv-drip/vitality-skin.html'),
        renewalSkin: resolve(__dirname, 'iv-drip/renewal-skin.html'),
        perfectionSkin: resolve(__dirname, 'iv-drip/perfection-skin.html'),
        celebritySkin: resolve(__dirname, 'iv-drip/celebrity-skin.html'),
        glowAndClear: resolve(__dirname, 'iv-drip/glow-and-clear.html'),
        immuneBooster: resolve(__dirname, 'iv-drip/immune-booster.html'),
        skinDetoxAcneClear: resolve(__dirname, 'iv-drip/skin-detox-acne-clear.html'),
        partyRecovery: resolve(__dirname, 'iv-drip/party-recovery.html'),
        slimAndBurn: resolve(__dirname, 'iv-drip/slim-and-burn.html'),
        detoxLiverCare: resolve(__dirname, 'iv-drip/detox-liver-care.html'),
        nightOwl: resolve(__dirname, 'iv-drip/night-owl.html'),
        antiStressSleepWell: resolve(__dirname, 'iv-drip/anti-stress-sleep-well.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
