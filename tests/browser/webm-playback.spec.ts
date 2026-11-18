import {test,expect} from '@playwright/test';
for(const [name,seconds] of [['kanreki-drafting',46],['kanreki-search',36],['kanreki-profiles-r03',38]] as const)test(`complete native WebM delivery and loop: ${name}`,async({page})=>{
 test.setTimeout(40000);await page.setViewportSize({width:1920,height:1080});await page.goto('/webm-playback.html');const video=page.locator('video');
 await video.evaluate((el:HTMLVideoElement,src)=>{el.muted=true;el.src=src;el.playbackRate=4;let previous=0;el.addEventListener('timeupdate',()=>{if(previous>el.duration*.75&&el.currentTime<el.duration*.25)el.dataset.looped='true';previous=el.currentTime;});return el.play();},`/media/${name}.webm`);
 await expect(video).toHaveJSProperty('duration',seconds);await expect.poll(()=>video.evaluate((el:HTMLVideoElement)=>el.currentTime),{timeout:10000}).toBeGreaterThan(2);
 await page.screenshot({path:`docs/verification/webm/${name}-native-moving.png`});
 await expect(video).toHaveAttribute('data-looped','true',{timeout:25000});await expect(video).toHaveJSProperty('paused',false);expect(await video.evaluate((el:HTMLVideoElement)=>({error:el.error?.message??null,width:el.videoWidth,height:el.videoHeight}))).toEqual({error:null,width:1920,height:1080});
});
