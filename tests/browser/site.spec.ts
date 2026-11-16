import { test, expect } from '@playwright/test';
const widths=[1440,1280,768,390,320];
for(const width of widths) {
  test(`homepage and account layouts at ${width}px`,async({page})=>{
    await page.setViewportSize({width,height:900});
    const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    await page.goto('/');await page.evaluate(()=>document.fonts.ready);
    await expect(page.locator('.cinema-home>section')).toHaveCount(6);
    await expect(page.getByRole('link',{name:'kanreki.'})).toBeVisible();
    await expect(page.locator('link[rel=icon]')).toHaveAttribute('href','/url-icon.png');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.screenshot({path:`docs/verification/home-${width}.png`,fullPage:true});
    if(width<=760){await page.getByRole('button',{name:'open menu'}).click();await expect(page.getByRole('navigation',{name:'mobile navigation'})).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'open menu'})).toBeFocused();}
    for(const route of ['/sign-in','/create-account']) {
      await page.goto(route);await expect(page.getByRole('heading',{level:1})).toBeVisible();
      for(const field of await page.locator('input').all())await expect(field).toBeDisabled();
      await expect(page.getByRole('button',{name:/restricted/})).toBeDisabled();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      await page.screenshot({path:`docs/verification/${route.slice(1)}-${width}.png`,fullPage:true});
    }
    expect(errors).toEqual([]);
  });
}
test('direct routes, refresh, links, status codes and metadata',async({page,request})=>{
  for(const route of ['/','/about','/contact','/sign-in','/create-account','/privacy','/terms','/cookies']) {
    const response=await page.goto(route);expect(response?.status()).toBe(200);await page.reload();await expect(page.locator('main h1')).toBeVisible();
    const origin = process.env.SITE_URL || process.env.CF_PAGES_URL;
    if (origin) await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href',`${new URL(origin).origin}${route}`);
    else await expect(page.locator('link[rel=canonical]')).toHaveCount(0);
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, follow');
  }
  for(const route of ['/missing','/api/users','/src/main.tsx','/.env']){const response=await request.get(route);expect(response.status()).toBe(404);expect(await response.text()).toContain('This page isn’t here');}
  await page.goto('/');
  for(const link of await page.locator('a[href^="/"]').all()) { const href=await link.getAttribute('href');expect((await request.get(href!)).status()).toBe(200); }
  const writes:string[]=[];page.on('request',r=>{if(r.method()!=='GET')writes.push(r.url());});await page.goto('/sign-in');await page.keyboard.press('Enter');expect(writes).toEqual([]);
  expect(await page.evaluate(()=>({cookies:document.cookie,local:localStorage.length,session:sessionStorage.length}))).toEqual({cookies:'',local:0,session:0});
});
test('short desktop and reduced motion',async({page})=>{
  await page.setViewportSize({width:1280,height:650});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/create-account');
  await expect(page.getByRole('button',{name:/restricted/})).toBeInViewport();await expect(page.getByRole('navigation',{name:'legal'})).toBeInViewport();
  await page.screenshot({path:'docs/verification/create-account-short-desktop.png',fullPage:true});
  await page.goto('/');await expect(page.locator('video')).toHaveCount(0);await expect(page.getByRole('heading',{level:1})).toBeVisible();
});

test('supplied icon resolves with PNG content',async({request})=>{
  const icon=await request.get('/url-icon.png');expect(icon.status()).toBe(200);expect(icon.headers()['content-type']).toBe('image/png');expect((await icon.body()).subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a');
});
