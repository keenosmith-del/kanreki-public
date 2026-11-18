import {Resvg} from '@resvg/resvg-js';
import {readFile,writeFile} from 'node:fs/promises';
const icon=(await readFile('public/url-icon.png')).toString('base64');
const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="white"/><g transform="translate(-21 0)"><image x="257" y="194" width="200" height="200" xlink:href="data:image/png;base64,${icon}"/><text x="449" y="350" fill="#151517" font-family="Helvetica Neue,Arial,sans-serif" font-size="154" font-weight="500" letter-spacing="-10.78">kanreki</text><circle cx="914" cy="342" r="8.25" fill="#151517"/></g><text x="600" y="443" text-anchor="middle" fill="#151517" font-family="Helvetica Neue,Arial,sans-serif" font-size="42" letter-spacing="-1.4">read. write. everything.</text></svg>`;
await writeFile('public/social-preview.svg',svg);
await writeFile('public/social-preview.png',new Resvg(svg,{font:{loadSystemFonts:true}}).render().asPng());
console.log('Rendered official-identity social preview: 1200 × 630.');
