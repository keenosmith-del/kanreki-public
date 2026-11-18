export function siteConfig(env=process.env){
 const preview=env.CF_PAGES==='1'&&env.CF_PAGES_BRANCH!== 'main';
 const production=env.DEPLOYMENT_ENV==='production'&&!preview;
 let origin='';
 if(env.SITE_URL){const url=new URL(env.SITE_URL);if(url.protocol!=='https:'||url.username||url.password||url.pathname!=='/'||url.search||url.hash)throw Error('SITE_URL must be an HTTPS origin without credentials, path, query or fragment.');origin=url.origin;}
 if(production&&(!origin||env.SITE_ORIGIN_VERIFIED!=='true'))throw Error('Production requires SITE_URL and SITE_ORIGIN_VERIFIED=true after the real project hostname and HTTPS are verified.');
 return {production,origin:production?origin:'',environment:production?'production':'preview'};
}
