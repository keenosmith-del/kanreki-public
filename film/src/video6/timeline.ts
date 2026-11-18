import {glide,filtered,type Stops} from '../motion';
import {p} from '../timeline';
export const FPS=60,SECONDS=52,FRAMES=FPS*SECONDS;
export type Page='home'|'notifications'|'conversation'|'profile';
export const transitions:readonly {at:number;end:number;from:Page;to:Page}[]=[{at:4.65,end:5.2,from:'home',to:'notifications'},{at:11.85,end:12.4,from:'notifications',to:'conversation'},{at:16.85,end:17.45,from:'conversation',to:'profile'}];
export function pageAt(t:number){let page:Page='home';for(const tr of transitions){if(t<tr.at)break;if(t<tr.end)return {from:tr.from,to:tr.to,q:p(t,tr.at,tr.end),moving:true};page=tr.to}return {from:page,to:page,q:1,moving:false}}
export const events={notification:4.65,message:11.85,profile:16.85,follow:21.55};
export function stateAt(frame:number){const t=Math.max(0,Math.min(FRAMES-1,frame))/FPS,loop=p(t,50.5,51.8);return {t,page:pageAt(t),followed:t>=21.55,followers:1248+Number(t>=21.55),
 notification:p(t,.9,1.3)*(1-p(t,4.65,5.0)),inboxScroll:glide(t,[[0,0],[6.4,0],[8.6,340],[9.2,340],[11.1,0],[52,0]]),
 retract:p(t,25,26.3),portraits:1-p(t,41,42.25),points:p(t,41,42.25)*(1-p(t,45.85,46.35)),connections:p(t,42.05,42.85)*(1-p(t,45.25,46)),collapse:p(t,43,46),icon:p(t,45.75,46.4),
 word:p(t,46.8,48.2),tagline:p(t,48,48.75),brandShift:p(t,46.5,47.6),loop,
 cursorOpacity:p(t,2.8,3.15)*(1-p(t,24.2,24.6)),click:Object.values(events).reduce((s,a)=>s+Math.sin(p(t,a,a+.17)*Math.PI),0)};}
export type State=ReturnType<typeof stateAt>;
const paths={
 x:[[0,960],[.35,960],[1.4,1000],[3.9,1140],[4.65,1140],[5.7,960],[8.4,1000],[10.9,1000],[11.85,1030],[13,1000],[15.4,990],[16.85,700],[17.8,960],[19.2,1020],[21.55,1100],[22.2,1100],[24.3,960],[26.6,960],[27,960],[29.1,2860],[31.4,4760],[33.7,6660],[34.2,6660],[36,5200],[37.7,3500],[41,3500],[52,3500]],
 y:[[0,540],[.35,540],[1.4,500],[3.9,410],[4.65,410],[5.7,540],[8.4,570],[10.9,500],[11.85,450],[13,540],[15.4,525],[16.85,290],[17.8,540],[19.2,540],[21.55,390],[22.2,390],[24.3,540],[26.6,380],[27,380],[29.1,380],[31.4,380],[33.7,380],[34.2,380],[36,350],[37.7,350],[41,350],[52,350]],
 scale:[[0,1],[.35,1],[1.4,1.02],[3.9,1.15],[4.65,1.15],[5.7,1],[8.4,1.03],[10.9,1.05],[11.85,1.12],[13,1.02],[15.4,1.06],[16.85,1.3],[17.8,1],[19.2,1.03],[21.55,1.2],[22.2,1.2],[24.3,1],[26.6,1.06],[27,1.06],[29.1,1.06],[31.4,1.06],[33.7,1.06],[34.2,1.06],[36,.38],[37.7,.2],[40.4,.1],[41,.1],[52,.1]]
} satisfies Record<string,Stops>;
export function cameraAt(t:number){return {x:filtered(t,q=>glide(q,paths.x),.2),y:filtered(t,q=>glide(q,paths.y),.2),scale:filtered(t,q=>glide(q,paths.scale),.2)}}
export function cursorAt(t:number){return {x:glide(t,[[0,1300],[2.8,1420],[4.65,1420],[5.8,1000],[8.6,1000],[10.8,850],[11.85,800],[13,800],[15.8,690],[16.85,500],[18,500],[20.7,1500],[21.55,1620],[22.3,1620],[24.6,1700],[52,1700]]),y:glide(t,[[0,850],[2.8,420],[4.65,420],[5.8,450],[8.6,600],[10.8,450],[11.85,369],[13,350],[15.8,300],[16.85,285],[18,285],[20.7,340],[21.55,285],[22.3,285],[24.6,900],[52,900]])}}
