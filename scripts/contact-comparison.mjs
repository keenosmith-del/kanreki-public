import {Resvg} from '@resvg/resvg-js';
import {readFile,writeFile} from 'node:fs/promises';
const root='docs/verification/contact-match',styles=JSON.parse(await readFile(root+'/computed-styles.json','utf8'));
for(const width of [1440,768,390,320])for(const state of ['initial','name','email','message','validation']){
 const modalHeight=parseFloat(styles[width][state].kailor['.surface-dialog'].height);
 const crop=width>=768?{x:(width-520)/2-28,y:(900-modalHeight)/2-28,width:576,height:Math.ceil(modalHeight)+56}:{x:0,y:0,width,height:900};
 const pictures=await Promise.all(['kailor','kanreki'].map(async site=>`data:image/jpeg;base64,${(await readFile(`${root}/${site}-${width}-${state}.jpg`)).toString('base64')}`));
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${crop.width*2+16}" height="${crop.height+36}"><rect width="100%" height="100%" fill="white"/><text x="16" y="23" font-family="Helvetica Neue,Arial" font-size="15" fill="#151517">kailor production</text><text x="${crop.width+32}" y="23" font-family="Helvetica Neue,Arial" font-size="15" fill="#151517">kanreki corrected</text>${pictures.map((href,index)=>`<svg x="${index*(crop.width+16)}" y="36" width="${crop.width}" height="${crop.height}" viewBox="${crop.x} ${crop.y} ${crop.width} ${crop.height}"><image width="${width}" height="900" href="${href}"/></svg>`).join('')}</svg>`;
 await writeFile(`${root}/comparison-${width}-${state}.png`,new Resvg(svg,{font:{loadSystemFonts:true}}).render().asPng());
}
console.log('Created 20 side-by-side comparisons from unchanged actual screenshots.');
