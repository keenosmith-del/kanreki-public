import {test,expect} from '@playwright/test';
test('all six live films load from the approved media paths',async({page})=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));await page.setViewportSize({width:1440,height:900});await page.goto('/');
 const slots=page.locator('[data-media-slot]');await expect(slots).toHaveCount(6);
 const expected=['kanreki-hero.mp4','kanreki-profiles-r03.mp4','kanreki-drafting.mp4','kanreki-reading.mp4','kanreki-search.mp4','kanreki-community.mp4'];
 for(let index=0;index<6;index++){
  const slot=slots.nth(index);await slot.scrollIntoViewIfNeeded();const video=slot.locator('video');await expect(video).toHaveCount(1);await expect(video.locator('source').first()).toHaveAttribute('src','/media/'+expected[index]);await expect(video).toHaveJSProperty('muted',true);await expect(video).toHaveJSProperty('loop',true);
  await expect.poll(()=>video.evaluate((el:HTMLVideoElement)=>el.videoWidth),{timeout:25000}).toBe(1920);expect(await video.evaluate((el:HTMLVideoElement)=>el.error?.message??null)).toBeNull();
  await page.screenshot({path:`docs/verification/live-film-${index+1}.png`});
  // This QA-only pause bounds simultaneous decoder load after each successful live check.
  await video.evaluate((el:HTMLVideoElement)=>el.pause());
 }
 expect(errors).toEqual([]);
});
test('live enquiry focus, exact input treatment and legal publication status',async({page})=>{
 for(const width of [1440,768,390,320]){
  await page.setViewportSize({width,height:900});await page.goto('/contact');const trigger=page.getByRole('link',{name:'open enquiry form'});await trigger.click();const dialog=page.getByRole('dialog',{name:'your enquiry'});await expect(dialog).toBeVisible();await expect(dialog).toHaveCSS('border-radius','30px');await expect(page.getByRole('button',{name:'close',exact:true})).toBeFocused();
  const name=page.getByLabel('name',{exact:true});await name.click();await expect(name).toHaveCSS('outline-style','none');await expect(name).toHaveCSS('box-shadow','rgb(119, 119, 124) 0px 0px 0px 1px');await expect(name).toHaveCSS('background-color','rgb(233, 233, 235)');await expect(name).toHaveCSS('height','50px');
  const box=await dialog.boundingBox();expect(box!.x).toBeGreaterThanOrEqual(0);expect(box!.x+box!.width).toBeLessThanOrEqual(width);await page.screenshot({path:`docs/verification/live-contact-${width}.png`});await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);await expect(trigger).toBeFocused();
 }
 for(const path of ['/privacy','/terms','/cookies']){await page.goto(path);if(process.env.KANREKI_LEGAL_FINAL==='true'){await expect(page.locator('.review-notice')).toHaveCount(0);await expect(page.getByText(/Effective date:/)).toBeVisible();}else await expect(page.getByText('Working draft | awaiting owner and legal review before publication.')).toBeVisible();}
});
