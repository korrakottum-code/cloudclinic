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
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
