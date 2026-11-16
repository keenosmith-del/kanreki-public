export const FPS = 60;
export const SECONDS = 60;
// Add seven seconds to the opening only; the publishing scenes retain their pace.
export const openingStoryEnd=13.65, openingPresentationEnd=20.65;
export const presentationAt=(storyTime:number)=>storyTime<=openingStoryEnd?storyTime*openingPresentationEnd/openingStoryEnd:storyTime+7;
export const storyAt=(seconds:number)=>seconds<=openingPresentationEnd?seconds*openingStoryEnd/openingPresentationEnd:seconds-7;
export const FRAMES = FPS * SECONDS;
export const title = 'The small changes that make software easier to use';
export const body = 'Last week I simplified a screen that had become crowded with options. We moved search to the top, removed two unnecessary panels and made the main action easier to find. Nothing dramatic changed, but the whole experience became easier to understand.';
export const introduction = 'Publish articles, share photographs and post updates in one feed.';
export const secondDescription = 'Follow people, read their work, and like, comment, save or share.';
export const tagline = 'read. write. everything.';
export const proofTimes = [0,1.7,2.8,4.8,6.6,7.8,9.2,10.7,11.7,13.1,14.7,16,22.8,24.2,29,35.8,38.8,40,43.7,46.5,49.1,50.8,52.983333];
export const clamp = (v: number) => Math.max(0, Math.min(1, v));
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
// Match the read-only kailor cinematic reference's acceleration and settling.
export function ease(x: number) {
  x=clamp(x);let lo=0,hi=1;
  const cubic=(t:number,a:number,b:number)=>3*(1-t)**2*t*a+3*(1-t)*t*t*b+t**3;
  for(let i=0;i<20;i++){const m=(lo+hi)/2;if(cubic(m,.45,.18)<x)lo=m;else hi=m;}
  return x===0||x===1?x:cubic((lo+hi)/2,0,1);
}
export const p=(t:number,a:number,b:number)=>ease((t-a)/(b-a));
export function keys(t:number,stops:readonly (readonly [number,number])[]) {
  if(t<=stops[0][0])return stops[0][1];
  for(let i=1;i<stops.length;i++)if(t<=stops[i][0])return mix(stops[i-1][1],stops[i][1],p(t,stops[i-1][0],stops[i][0]));
  return stops[stops.length-1][1];
}
export function typingPosition(text:string,t:number,start:number,end:number) {
  const weights=Array.from(text,c=>/[.!?]/.test(c)?3.2:c===','?2:c===' '?1.1:1);
  let remaining=clamp((t-start)/(end-start))*weights.reduce((a,b)=>a+b,0),n=0;
  while(n<text.length&&remaining>=weights[n]-1e-8){remaining-=weights[n++];}
  return n===text.length?n:n+remaining/weights[n];
}
export const typed=(text:string,t:number,start:number,end:number)=>text.slice(0,Math.floor(typingPosition(text,t,start,end)));
export const likeEvents=[[40.2,0],[41,4],[42,12],[43,25],[44.4,43],[46,64]] as const;
export function likesAt(t:number) {
  for(let i=1;i<likeEvents.length;i++)if(t<likeEvents[i][0])return Math.round(mix(likeEvents[i-1][1],likeEvents[i][1],clamp((t-likeEvents[i-1][0])/(likeEvents[i][0]-likeEvents[i-1][0]))));
  return t<40.2?0:64;
}
export function stateAt(frame:number) {
  const presentationTime=Math.max(0,Math.min(FRAMES-1,frame))/FPS;
  const t=storyAt(presentationTime);
  const titleText=typed(title,t,24.6,26.2),bodyText=typed(body,t,26.6,35.1);
  const click=[13.35,23.1,38.05,46.6,49.2].reduce((n,a)=>n+Math.sin(p(t,a,a+.2)*Math.PI),0);
  return {t,presentationTime,titleText,bodyText,click,
    workspace:p(t,14.25,16.15),composer:p(t,23.35,24)*(1-p(t,38.3,39.05)),published:p(t,38.55,39.2),
    likes:likesAt(t),comments:Number(t>=43.1)+Number(t>=44.8),shares:Number(t>=44.1)+Number(t>=46.1),
    toast:p(t,39.1,39.4)*(1-p(t,41,41.3)),saved:t>=46.6,unread:t>=43.1,
    cursorX:keys(t,[[0,1330],[12.5,1330],[13.15,960],[13.7,960],[16,350],[19,550],[22.8,1590],[23.4,1590],[24.5,490],[26.3,490],[35.2,490],[37.8,1450],[38.5,1450],[40.3,1000],[45.6,1000],[46.4,1700],[46.9,1700],[48.9,1704],[49.7,1704]]),
    cursorY:keys(t,[[0,780],[12.5,780],[13.15,672],[13.7,672],[16,380],[19,450],[22.8,265],[23.4,265],[24.5,410],[26.3,510],[35.2,650],[37.8,850],[38.5,850],[40.3,710],[45.6,710],[46.4,620],[46.9,620],[48.9,196],[49.7,196]]),
    cursorOpacity:p(t,12.5,12.8)*(1-p(t,49.3,49.6))*(1-p(t,24.7,24.9)*(1-p(t,35.2,35.5))),
  };
}
