import {glide,filtered,type Stops} from '../motion';
import {p,typed} from '../timeline';
import {userComment} from './content';
export const FPS=60,SECONDS=42,FRAMES=FPS*SECONDS;
export const events={open:9.65,commentLike1:22.6,commentLike2:25.3,articleLike:29.25,reshare:31.6,focus:34.3,submit:38.0,back:39.35};
export const layout={contentTop:315,columnX:480,columnWidth:1050,imageTop:245,imageWidth:530,imageHeight:530*917/736,bodyTop:958,actionsY:1990,discussionY:2070,commentYs:[2140,2390,2560],inputY:2750,newCommentY:2850};
const scrollStops:Stops=[[0,0],[12.8,0],[14.4,235],[15.5,520],[16.5,850],[17.8,1140],[19,1450],[20.8,1830],[21.6,1960],[23.5,1960],[25.2,2110],[27,2110],[28.5,1830],[31.9,1830],[33.5,2230],[37.9,2230],[38.7,2315],[39.35,2315],[42,2315]];
export function articleScrollAt(t:number){return filtered(t,q=>glide(q,scrollStops),.16)}
export function stateAt(frame:number){const t=Math.max(0,Math.min(FRAMES-1,frame))/FPS,articleScroll=articleScrollAt(t);
 const open=p(t,9.65,10.65)*(1-p(t,39.35,40.35));
 const feedScroll=filtered(t,q=>glide(q,[[0,0],[4.65,0],[5.7,100],[7.4,525],[8.5,560],[40.35,560],[41.6,0],[42,0]]),.16);
 const liked1=t>=22.6,liked2=t>=25.3,articleLiked=t>=29.25,reshared=t>=31.6,submitted=t>=38;
 const clicks=Object.values(events).reduce((v,e)=>v+Math.sin(p(t,e,e+.17)*Math.PI),0);
 return {t,open,feedScroll,articleScroll,liked1,liked2,articleLiked,reshared,submitted,commentLikes:[12+Number(liked1),2+Number(liked2),7],articleLikes:67+Number(articleLiked),articleComments:9+Number(submitted),articleReposts:4+Number(reshared),commentText:typed(userComment,t,34.5,37.55),toast:p(t,31.6,31.83)*(1-p(t,33.1,33.4)),click:clicks,cursorOpacity:p(t,7.8,8.2)*(1-p(t,40.7,41.05))};
}
export type State=ReturnType<typeof stateAt>;
const paths={
 x:[[0,1010],[.35,1010],[3.8,960],[5.5,980],[7.8,1010],[9.65,1000],[10.65,1010],[12.5,1000],[14.5,1010],[16,1005],[18.5,1020],[20.8,1000],[22.6,1000],[25.3,1000],[27,1040],[29.25,970],[31.6,1000],[33.5,1050],[35.8,1110],[38,1140],[38.35,1030],[39.35,820],[40.35,940],[41.6,1010],[42,1010]],
 y:[[0,555],[.35,555],[3.8,540],[5.5,575],[7.8,610],[9.65,535],[10.65,500],[12.5,510],[14.5,575],[16,570],[18.5,610],[20.8,620],[22.6,625],[25.3,680],[27,620],[29.25,520],[31.6,500],[33.5,700],[35.8,765],[38,750],[38.35,710],[39.35,480],[40.35,540],[41.6,555],[42,555]],
 scale:[[0,1.12],[.35,1.12],[3.8,1],[5.5,1.04],[7.8,1.08],[9.65,1.18],[10.65,1.03],[12.5,1.15],[14.5,1.12],[16,1.16],[18.5,1.18],[20.8,1.1],[22.6,1.2],[25.3,1.23],[27,1.12],[29.25,1.3],[31.6,1.3],[33.5,1.15],[35.8,1.25],[38,1.16],[38.35,1.12],[39.35,1.12],[40.35,1.04],[41.6,1.12],[42,1.12]]
} satisfies Record<string,Stops>;
export function cameraAt(t:number){return {x:filtered(t,q=>glide(q,paths.x),.16),y:filtered(t,q=>glide(q,paths.y),.16),scale:filtered(t,q=>glide(q,paths.scale),.16)}}
export function cursorAt(s:State){const t=s.t;
 const x=glide(t,[[0,1000],[7.8,1100],[8.9,800],[9.65,820],[11,820],[20.7,900],[22.6,570],[23.2,570],[24.8,570],[25.3,570],[26,570],[28.3,700],[29.25,495],[30,495],[31.6,700],[32.2,700],[33.5,730],[34.3,670],[37.6,1410],[38,1498],[38.35,1498],[39.25,370],[39.35,370],[40.2,370],[41.05,300],[42,300]]);
 let y=glide(t,[[0,700],[7.8,680],[8.9,490],[9.65,488],[11,400],[20.7,630],[22.6,layout.contentTop+layout.commentYs[0]+126-articleScrollAt(22.6)],[23.2,layout.contentTop+layout.commentYs[0]+126-articleScrollAt(23.2)],[24.8,layout.contentTop+layout.commentYs[1]+126-articleScrollAt(24.8)],[25.3,layout.contentTop+layout.commentYs[1]+126-articleScrollAt(25.3)],[26,layout.contentTop+layout.commentYs[1]+126-articleScrollAt(26)],[28.3,500],[29.25,layout.contentTop+layout.actionsY+22-articleScrollAt(29.25)],[30,layout.contentTop+layout.actionsY+22-articleScrollAt(30)],[31.6,layout.contentTop+layout.actionsY+22-articleScrollAt(31.6)],[32.2,layout.contentTop+layout.actionsY+22-articleScrollAt(32.2)],[33.5,layout.contentTop+layout.inputY+32-articleScrollAt(33.5)],[34.3,layout.contentTop+layout.inputY+32-articleScrollAt(34.3)],[37.6,layout.contentTop+layout.inputY+32-articleScrollAt(37.6)],[38,layout.contentTop+layout.inputY+32-articleScrollAt(38)],[38.35,layout.contentTop+layout.inputY+32-articleScrollAt(38.35)],[39.25,273],[39.35,273],[40.2,273],[41.05,230],[42,230]]);
 return {x,y};
}
