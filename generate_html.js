import { IV_DRIPS, REVIEWS } from './src/js/components.js';
import fs from 'fs';

function generateStandardDrips(prefix) {
    let html = '';
    IV_DRIPS.standard.forEach((drip, i) => {
        html += `
        <a href="${prefix}iv-drip/${drip.id}/" class="drip-card" style="text-decoration:none; color:inherit; display:flex; flex-direction:column;">
          <div class="drip-card__image-wrapper">
            <img src="${prefix}images/${drip.id}.jpg" alt="${drip.name}" class="drip-card__image" loading="lazy">
            <div class="drip-card__badge" style="background: var(--color-primary)">${drip.badge}</div>
          </div>
          <div class="drip-card__content" style="flex:1; display:flex; flex-direction:column;">
            <h3 class="drip-card__title">${drip.name}</h3>
            <p class="drip-card__desc" style="flex:1">${drip.desc}</p>
            <div class="drip-card__price-row" style="margin-top:auto;">
              <div>
                <div class="drip-card_import { IV_DRIPS, REVIEWS } f  import fs from 'fs';

function generateStandardDrips(prefi 2
function generateS       let html = '';
    IV_DRIPS.standarla    IV_DRIPS.stanin        html += `
        <a href="${prefix??       <a href=            <div class="drip-card__image-wrapper">
            <img src="${prefix}images/${drip.id}.jpg" alt="${drip.name}" class="drip-card__image"              <img src="${prefix}images/${drip.id l            <div class="drip-card__badge" style="background: var(--color-primary)">${drip.badge}</div>
         {d          </div>
          <div class="drip-card__content" style="flex:1; display:flex; flex-directioco          <div               <h3 class="drip-card__title">${drip.name}</h3>
            <p class="drip-card__deal            <p class="drip-card__desc" style="flex:1">${d
             <div class="drip-card__price-row" style="margin-top:auto;or              <div>
                <div class="drip-card_import { IV_                  <dar
function generateStandardDrips(prefi 2
function generateS       let html = '';
    IV_DRdrifunction generateS       let html = 'lo    IV_DRIPS.standarla    IV_DRIPS.sta          <a href="${prefix??       <a href=            <d/p            <img src="${prefix}images/${drip.id}.jpg" alt="${drip.nato;">
              <div>
         {d          </div>
          <div class="drip-card__content" style="flex:1; display:flex; flex-directioco          <div               <h3 class="drip-card__title">${drip.name}</h3>
            <p class="drip-car<span class="btn btn--outline b          <div class="dripr:            <p class="drip-card__deal            <p class="drip-card__desc" style="flex:1">${d
             <div class="drip-card__price-row" style="margin-top:;
             <div class="drip-card__price-row" style="margin-top:auto;or              <div>
 ((                <div class="drip-card_import { IV_                  <dar
function generate__function generateStandardDrips(prefi 2
function generateS       let htm??function generateS       let html = '-c    IV_DRdrifunction generateS       liv              <div>
         {d          </div>
          <div class="drip-card__content" style="flex:1; display:flex; flex-directioco          <div               <h3 class="drip-card__title">${drip.name}</h3>
            iv         {d       d_          <div class="dripv>            <p class="drip-car<span class="btn btn--outline b          <div class="dripr:            <p class="drip-card__deal            <p class="drip-card__d g             <div class="drip-card__price-row" style="margin-top:;
             <div class="drip-card__price-row" style="margin-top:auto;or    enerateReviews('/'));
