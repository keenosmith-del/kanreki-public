import {test,expect} from '@playwright/test';
import fs from 'node:fs';
const captured=JSON.parse(fs.readFileSync('docs/verification/contact-match/computed-styles.json','utf8'));
const properties=['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','width','height','paddingTop','paddingRight','paddingBottom','paddingLeft','marginTop','marginBottom','borderRadius','borderTopWidth','borderTopStyle','outlineStyle','outlineWidth','outlineOffset','boxShadow','backgroundColor','color','gap','display','alignItems','justifyContent','animationDuration','strokeWidth','strokeLinecap'];
const canonical=(value:string)=>value.replaceAll('BlinkMacSystemFont','"system-ui"');
for(const width of [1440,768,390,320])test(`production reference styles and visual regression at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/contact');await page.getByRole('link',{name:'open enquiry form'}).press('Enter');
 for(const state of ['initial','name','email','message','validation']){
  if(state==='initial')await page.getByLabel('name',{exact:true}).press('Shift+Tab');
  else if(state==='validation')await page.getByRole('button',{name:'send',exact:true}).click();
  else await page.getByLabel(state==='email'?'email address':state,{exact:true}).click();
  const expected=captured[width][state].kailor;
  // Allow the reference's 180 ms colour transition to reach its actual endpoint.
  if(state!=='initial')await expect(page.getByLabel(state==='email'?'email address':state==='message'?'message':'name',{exact:true})).toHaveCSS('background-color','rgb(233, 233, 235)');
  for(const [selector,styles] of Object.entries(expected) as [string,Record<string,string>][]){
   const actual=await page.locator(selector).first().evaluate((el,props)=>{const s=getComputedStyle(el);return Object.fromEntries(props.map(p=>[p,(s as unknown as Record<string,string>)[p]]));},properties);
   for(const [property,value] of Object.entries(styles)){
    if(property==='outlineWidth'&&styles.outlineStyle==='none')continue;
    if(['width','height','marginTop','marginBottom','letterSpacing'].includes(property)&&/^-?[\d.]+px$/.test(value)){expect(Math.abs(parseFloat(actual[property])-parseFloat(value)),`${width}/${state}/${selector}/${property}`).toBeLessThan(.1);}
    else expect(canonical(actual[property]),`${width}/${state}/${selector}/${property}`).toBe(canonical(value));
   }
  }
  await expect(page.getByRole('dialog')).toHaveScreenshot(`contact-${width}-${state}.png`,{animations:'disabled',maxDiffPixelRatio:.001});
 }
});
test('sending appearance matches the source reference without sending a real email',async({page,context})=>{
 let release!:()=>void;const pending=new Promise<void>(resolve=>release=resolve);await page.route('https://api.emailjs.com/**',async route=>{await pending;await route.fulfill({status:200,body:'OK'});});
 await page.setViewportSize({width:1440,height:900});await page.goto('/contact');await page.getByRole('link',{name:'open enquiry form'}).click();await page.getByLabel('name',{exact:true}).fill('Demo Reader');await page.getByLabel('email address').fill('reader@example.test');await page.getByLabel('message',{exact:true}).fill('Controlled visual test of the sending state.');await page.getByRole('button',{name:'send',exact:true}).click();await expect(page.getByRole('button',{name:'sending…'})).toBeDisabled();await page.mouse.move(0,0);await expect(page.locator('.enquiry-send')).toHaveCSS('background-color','rgb(21, 21, 23)');
 const reference=await context.newPage();await reference.setViewportSize({width:1440,height:900});await reference.goto('/reference-contact.html?sending=1');await expect(reference.locator('dialog')).toHaveCSS('opacity','1');
 for(const selector of ['.surface-dialog','.enquiry-send','.enquiry-cancel','.surface-close','#enquiry-name','#enquiry-email','#enquiry-message']){
  const props=['width','height','padding','borderRadius','backgroundColor','color','fontSize','fontWeight','lineHeight','boxShadow','opacity','cursor'];
  const read=async(tab:typeof page)=>tab.locator(selector).evaluate((el,keys)=>{const s=getComputedStyle(el);return Object.fromEntries(keys.map(key=>[key,(s as unknown as Record<string,string>)[key]]));},props);
  expect(await read(page),selector).toEqual(await read(reference));
 }
 await page.getByRole('dialog').screenshot({path:'docs/verification/contact-match/kanreki-sending.png'});await reference.locator('dialog').screenshot({path:'docs/verification/contact-match/kailor-source-sending.png'});release();await expect(page.getByText('your enquiry has been sent.')).toBeVisible();
});
