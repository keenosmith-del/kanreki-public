import {glide,filtered,type Stops} from '../motion';
import {p,typed} from '../timeline';
import {query} from './content';
export const FPS=60,SECONDS=36,FRAMES=FPS*SECONDS;
export type Page='home'|'all'|'posts'|'images'|'people'|'article'|'saved';
export const transitions:readonly {at:number;end:number;from:Page;to:Page;direction:1|-1}[]=[
 {at:4.5,end:4.95,from:'home',to:'all',direction:1},
 {at:6,end:6.38,from:'all',to:'posts',direction:1},
 {at:7.7,end:8.08,from:'posts',to:'images',direction:1},
 {at:9.7,end:10.08,from:'images',to:'people',direction:1},
 {at:11.6,end:11.98,from:'people',to:'posts',direction:-1},
 {at:14.1,end:14.65,from:'posts',to:'article',direction:1},
 {at:21.3,end:21.9,from:'article',to:'saved',direction:1},
 {at:26.9,end:27.45,from:'saved',to:'article',direction:1},
 {at:30.1,end:30.65,from:'article',to:'saved',direction:-1},
 {at:33,end:33.6,from:'saved',to:'home',direction:-1}
];
export const events={focus:1.65,submit:4.5,posts:6,images:7.7,people:9.7,returnPosts:11.6,open:14.1,save:17.7,saved:21.3,reopen:26.9,back:30.1,home:33};
export function pagesAt(t:number){let page:Page='home';for(const tr of transitions){if(t<tr.at)break;if(t<tr.end){const q=p(t,tr.at,tr.end);return {from:tr.from,to:tr.to,progress:q,direction:tr.direction,moving:true}}page=tr.to}return {from:page,to:page,progress:1,direction:1 as const,moving:false}}
export function stateAt(frame:number){const t=Math.max(0,Math.min(FRAMES-1,frame))/FPS,page=pagesAt(t),saved=t>=17.7,reset=t>=33;
 const category=t<6?'all':t<7.7?'posts':t<9.7?'images':t<11.6?'people':'posts';
 return {t,page,category,saved,queryText:reset?'':typed(query,t,2,4.05),searchFocused:t>=1.65&&t<4.5,
  navigation:t>=33?'home':t>=21.3?'saved':t>=4.5?'search':'home',
  postsScroll:glide(t,[[0,0],[12.3,0],[13.25,40],[36,40]]),savedScroll:glide(t,[[0,0],[24.2,0],[25.15,135],[25.5,135],[26.2,0],[36,0]]),
  toast:p(t,17.7,17.92)*(1-p(t,19.15,19.4)),
  click:Object.values(events).reduce((sum,at)=>sum+Math.sin(p(t,at,at+.17)*Math.PI),0),
  cursorOpacity:p(t,.6,.9)*(1-p(t,34.8,35.15))};
}
export type State=ReturnType<typeof stateAt>;
const paths={
 x:[[0,960],[.35,960],[1.65,1000],[2.2,1010],[4.05,1090],[4.5,1100],[5.3,960],[6,970],[7.2,1000],[8.3,970],[9.25,1110],[10.2,1030],[11.15,1090],[12.2,970],[13.5,1000],[14.65,1000],[16.2,1060],[17.7,1030],[19.1,1040],[20.3,650],[21.3,430],[21.9,430],[23,960],[24.8,1000],[26.2,970],[27.5,1050],[29.3,1150],[30.1,800],[31.1,960],[32.1,650],[33,430],[33.6,430],[35.5,960],[36,960]],
 y:[[0,540],[.35,540],[1.65,440],[2.2,430],[4.05,430],[4.5,430],[5.3,565],[6,550],[7.2,580],[8.3,620],[9.25,630],[10.2,610],[11.15,610],[12.2,555],[13.5,565],[14.65,610],[16.2,640],[17.7,650],[19.1,630],[20.3,650],[21.3,590],[21.9,590],[23,580],[24.8,665],[26.2,570],[27.5,610],[29.3,650],[30.1,440],[31.1,575],[32.1,470],[33,340],[33.6,340],[35.5,540],[36,540]],
 scale:[[0,1],[.35,1],[1.65,1.14],[2.2,1.16],[4.05,1.16],[4.5,1.16],[5.3,1],[6,1.03],[7.2,1.05],[8.3,1.04],[9.25,1.08],[10.2,1.04],[11.15,1.08],[12.2,1.02],[13.5,1.08],[14.65,1.05],[16.2,1.1],[17.7,1.2],[19.1,1.15],[20.3,1.35],[21.3,1.65],[21.9,1.65],[23,1],[24.8,1.05],[26.2,1.02],[27.5,1.08],[29.3,1.12],[30.1,1.15],[31.1,1.02],[32.1,1.3],[33,1.65],[33.6,1.65],[35.5,1],[36,1]]
} satisfies Record<string,Stops>;
export function cameraAt(t:number){return {x:filtered(t,q=>glide(q,paths.x),.18),y:filtered(t,q=>glide(q,paths.y),.18),scale:filtered(t,q=>glide(q,paths.scale),.18)}}
export function cursorAt(s:State){const t=s.t;return {
 x:glide(t,[[0,1200],[.9,1200],[1.65,790],[2.1,790],[4.2,1683],[4.5,1683],[5.4,800],[6,483],[7.7,609],[8.7,1200],[9.7,735],[10.8,1320],[11.6,483],[13,800],[14.1,780],[15.5,950],[17.7,1550],[19,1550],[20.4,550],[21.3,186],[22,186],[23.2,950],[25.3,1050],[26.3,800],[26.9,780],[28.6,1200],[30.1,390],[31,700],[32,500],[33,186],[33.7,186],[35.15,180],[36,180]]),
 y:glide(t,[[0,800],[.9,800],[1.65,354],[2.1,354],[4.2,354],[4.5,354],[5.4,500],[6,432],[7.7,432],[8.7,680],[9.7,432],[10.8,650],[11.6,432],[13,515],[14.1,505],[15.5,620],[17.7,919],[19,919],[20.4,700],[21.3,599],[22,599],[23.2,650],[25.3,700],[26.3,515],[26.9,480],[28.6,650],[30.1,270],[31,650],[32,450],[33,320],[33.7,320],[35.15,230],[36,230]])};}
