import {Panel,Cursor,ink} from '../ui';
import {p,mix} from '../timeline';
import {measure,trackText} from '../text';
import {filtered} from '../motion';
import {stateAt,cameraAt} from './timeline';
import {Rail,WorkspaceHeader,WorkspaceViews,CanvasFeather,documentGeometry,type Geometry} from './components';
import {initialParagraphs,prompt} from './content';
function cursorAt(s:ReturnType<typeof stateAt>,g:Geometry){
 const t=s.t;let x=s.cursorX,y=s.cursorY;
 const a=p(t,16.1,16.65)*(1-p(t,16.65,17.3));x+=(392+g.firstWidth-1270)*a;y+=(g.rowY+20-565)*p(t,15.7,16.1)*(1-p(t,16.65,17.3));
 const b=p(t,23,23.45)*(1-p(t,23.45,23.8));x+=(392+g.endingWidth-1140)*b;
 y+=(g.p3Y+20-685)*p(t,22.7,23)*(1-p(t,23.45,23.8));y+=(g.p3Y-46-625)*p(t,23.45,23.8)*(1-p(t,23.8,24.3));
 const c=p(t,28.9,29.7)*(1-p(t,30.15,30.55));x+=mix(g.boldX-400,g.boldX+g.boldWidth-650,p(t,29.7,30.15))*c;y+=(g.boldY-650)*c;
 return {x,y};
}
export function Video3({frame}:{frame:number}){
 const s=stateAt(frame),g=documentGeometry(s),camera=cameraAt(s.t),cursor=cursorAt(s,g);const t=s.t;
 if(t>=5.4&&t<9.45){camera.x+=(Math.min(945,measure(s.promptText,24,400,-.3))+540-1000)*.12*p(t,5.4,5.8)*(1-p(t,8.9,9.45))}
 if(t>=11.1&&t<15.7){
  const i=t<12.7?0:t<14.35?1:2,a=[11.1,12.7,14.35][i],b=[12.65,14.3,15.5][i];
  const target=trackText(initialParagraphs[i],t,a,b,i===0?1250:955,28,400,-.35,1.45),amount=p(t,a,a+.25)*(1-p(t,b,b+.25));
  camera.x+=(target.x-500)*.08*amount;camera.y+=target.y*.13*amount;
 }
 const selecting=(t>=16.1&&t<16.65)||(t>=23&&t<23.45)||(t>=29.7&&t<30.15);
 return <div data-video-three style={{position:'relative',width:1920,height:1080,background:'#fff',color:ink,fontFamily:'"Helvetica Neue",Helvetica,Arial,sans-serif',overflow:'hidden'}}>
  <style>{'[data-video-three] img{display:block}[data-video-three] [data-post-actions][data-liked="false"] [data-control="heart"] svg{fill:none}'}</style>
  <div data-camera style={{position:'absolute',width:1920,height:1080,transformOrigin:'0 0',transform:`translate(${960-camera.x*camera.scale}px,${540-camera.y*camera.scale}px) scale(${camera.scale})`}}>
   <Panel style={{left:130,top:130,width:1660,height:860,overflow:'hidden',boxShadow:'0 26px 65px #15151708,0 4px 14px #15151703'}}><Rail s={s}/><WorkspaceHeader/></Panel>
   <WorkspaceViews s={s} g={g}/>
   {selecting?<div style={{position:'absolute',left:cursor.x-4,top:cursor.y-16,opacity:s.cursorOpacity}}><svg width="12" height="32" viewBox="0 0 12 32" fill="none" stroke={ink} strokeWidth="1.6"><path d="M2 2h8M6 2v28M2 30h8"/></svg></div>:<Cursor x={cursor.x} y={cursor.y} click={s.click} opacity={s.cursorOpacity}/>}
  </div>
  <CanvasFeather/>
 </div>;
}
