import fs from 'fs';
import path from 'path';

const gtmHead = `  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-N75JV6S4');</script>
  <!-- End Google Tag Manager -->\n`;

const gtmBody = `  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N75JV6S4"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->\n`;

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
            let modified = false;

            if (!content.includes('GTM-N75JV6S4')) {
                // Add to head
                if (content.includes('</head>')) {
                    content = content.replace('</head>', gtmHead + '</head>');
                    modified = true;
                }
                // Add to body
                if (content.includes('<body>')) {
                    content = content.replace('<body>', '<body>\n' + gtmBody);
                    modified = true;
                }

                if (modified) {
                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log(`Added GTM to: ${fullPath}`);
                }
            } else {
                console.log(`GTM already exists in: ${fullPath}`);
            }
        }
    }
}

console.log('--- Adding Google Tag Manager (GTM-N75JV6S4) ---');
processHtmlFiles('.');
console.log('✅ Done!');
