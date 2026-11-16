import {test,expect} from '@playwright/test';
import hero from '../../src/hero-production.json';

test('wordmark circular period and fallback account routes',async({page})=>{
  await page.goto('/');
  const circle=await page.locator('.site-header-brand .brand-text').evaluate(el=>{
    const s=getComputedStyle(el,'::after');return {width:s.width,height:s.height,borderRadius:s.borderRadius,color:s.backgroundColor,margin:s.marginLeft};
  });
  expect(circle).toEqual({width:'3px',height:'3px',borderRadius:'50%',color:'rgb(21, 21, 23)',margin:'2px'});
  await expect(page.locator('.site-header-brand')).toHaveAccessibleName('kanreki.');
  if(!hero.ready){await expect(page.locator('.hero-account-actions')).toBeVisible();await expect(page.locator('.hero-account-actions')).toHaveClass(/is-visible/);}
  await page.locator('.site-sign-in').click();await expect(page).toHaveURL(/\/sign-in$/);await expect(page.getByRole('button',{name:/restricted/})).toBeDisabled();
});
for(const width of [390,320])test(`mobile fallback safe area ${width}`,async({page})=>{
  await page.setViewportSize({width,height:844});await page.goto('/');
  await expect(page.locator('.introduction video')).toHaveCount(0);
  await expect(page.locator('.hero-account-actions')).toHaveClass(/is-visible/);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.locator('.hero-account-actions a').last()).toBeInViewport();
});
test('actual production playback loops and retains HTML account actions',async({page})=>{
  test.skip(!hero.ready,'Production media blocked until exact supplied assets are readable and export review passes.');
  await page.goto('/');const video=page.locator('.introduction video');
  await expect(video).toHaveJSProperty('loop',true);await expect(video).toHaveJSProperty('muted',true);await expect(video).toHaveJSProperty('playsInline',true);await expect(video).toHaveJSProperty('controls',false);
  await expect(page.locator('.hero-account-actions')).not.toHaveClass(/is-visible/);
  await video.evaluate((v:HTMLVideoElement)=>{v.playbackRate=16;});
  await expect(page.locator('.hero-account-actions')).toHaveClass(/is-visible/,{timeout:20000});
  await expect(video).toHaveJSProperty('paused',false);
  await page.locator('.hero-account-actions .button').click();await expect(page).toHaveURL(/\/create-account$/);
});
test('production autoplay rejection exposes HTML account actions',async({page})=>{
  test.skip(!hero.ready,'Production video is not yet available.');
  await page.addInitScript(()=>{HTMLMediaElement.prototype.play=()=>Promise.reject(new DOMException('blocked','NotAllowedError'));});
  await page.goto('/');await expect(page.locator('.hero-account-actions')).toHaveClass(/is-visible/);await expect(page.locator('.introduction video')).toHaveCount(0);
});
test('reduced motion immediately exposes accounts without a video request',async({page})=>{
  const videos:string[]=[];page.on('request',r=>{if(/\.(mp4|webm)(\?|$)/.test(r.url()))videos.push(r.url());});
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
  await expect(page.locator('.introduction video')).toHaveCount(0);await expect(page.locator('.hero-account-actions')).toHaveClass(/is-visible/);expect(videos).toEqual([]);
});
