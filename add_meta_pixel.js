import fs from 'fs';
import path from 'path';

const PIXEL_ID = '2586135705121356';

const pixelHead = `  <!-- Meta Pixel Code -->
  <script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${PIXEL_ID}');
  fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Meta Pixel Code -->\n`;

function processHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (!['node_modules', 'dist', '.git'].includes(file)) {
                processHtmlFiles(fullPath);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            if (!content.includes(PIXEL_ID)) {
                if (content.includes('</head>')) {
                    content = content.replace('</head>', pixelHead + '</head>');
                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log(`Added Meta Pixel to: ${fullPath}`);
                }
            } else {
                console.log(`Meta Pixel already exists in: ${fullPath}`);
            }
        }
    }
}

console.log(`--- Adding Meta Pixel (${PIXEL_ID}) ---`);
processHtmlFiles('.');
console.log('✅ Done!');
