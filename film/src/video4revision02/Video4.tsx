import {p} from '../timeline';
import {Panel,Cursor,ink} from '../ui';
import {stateAt,cameraAt,cursorAt} from './timeline';
import {NavigationRail,WorkspaceHeader,CanvasFeather,Feed,ReadingView,ReshareToast} from './components';
export function Video4({frame}:{frame:number}){const s=stateAt(frame),camera=cameraAt(s.t),cursor=cursorAt(s);return <div data-video-four style={{position:'relative',width:1920,height:1080,background:'#fff',color:ink,fontFamily:'"Helvetica Neue",Helvetica,Arial,sans-serif',overflow:'hidden'}}>
 <style>{'[data-video-four] img{display:block}[data-video-four] [data-liked="false"] [data-control="heart"] svg{fill:none}[data-video-four] [data-reshared="true"] [data-control="repost"]{color:#151517;background:#f0f0f1;border-radius:12px;box-shadow:0 0 0 7px #f0f0f1}'}</style>
 <div data-camera style={{position:'absolute',width:1920,height:1080,transformOrigin:'0 0',transform:`translate(${960-camera.x*camera.scale}px,${540-camera.y*camera.scale}px) scale(${camera.scale})`}}>
 <Panel style={{left:130,top:130,width:1660,height:860,overflow:'hidden',boxShadow:'0 26px 65px #15151708,0 4px 14px #15151703'}}><NavigationRail/><WorkspaceHeader/></Panel>
 <div style={{position:'absolute',left:302,top:243,width:1426,height:747,overflow:'hidden',background:'#fff'}}><div style={{position:'absolute',left:-302,top:-243,width:1920,height:1080,transform:s.t>=39.35?`translateX(${-(1-p(s.t,39.35,40.35))*1426}px)`:undefined}}><Feed s={s}/></div></div>
 {s.open>0&&<div style={{position:'absolute',left:302,top:243,width:1426,height:747,overflow:'hidden'}}><div style={{position:'absolute',left:-302,top:-243,width:1920,height:1080}}><ReadingView s={s}/></div></div>}<ReshareToast s={s}/><Cursor x={cursor.x} y={cursor.y} click={s.click} opacity={s.cursorOpacity}/>
 </div><CanvasFeather/>
 </div>}
