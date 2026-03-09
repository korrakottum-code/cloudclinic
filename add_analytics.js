import fs from 'fs';
import path from 'path';

const gtagScript = `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-TJZ2GGPF26"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-TJZ2GGPF26');
  </script>\n`;

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
            if (!content.includes('G-TJZ2GGPF26')) {
                // Insert before </head>
                if (content.includes('</head>')) {
                    content = content.replace('</head>', gtagScript + '</head>');
                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log(`Added Google Analytics to: ${fullPath}`);
                }
            } else {
                console.log(`Analytics already exists in: ${fullPath}`);
            }
        }
    }
}

console.log('--- Adding Google Analytics Tag ---');
processHtmlFiles('.');
console.log('✅ Done!');
