import {Panel,Cursor,ink} from '../ui';
import {stateAt,cameraAt} from './timeline';
import {Rail,WorkspaceHeader,WorkspaceViews,CanvasFeather} from './components';
export function Video2({frame}:{frame:number}){
 const s=stateAt(frame),camera=cameraAt(s.t);
 return <div data-video-two style={{position:'relative',width:1920,height:1080,overflow:'hidden',background:'#fff',color:ink,fontFamily:'"Helvetica Neue", Helvetica, Arial, sans-serif'}}>
  <style>{'[data-video-two] img{display:block}[data-video-two] [data-post-actions][data-liked="false"] [data-control="heart"] svg{fill:none}[data-video-two] [data-post-actions][data-reposted="true"] [data-control="repost"]{color:#080809;font-weight:600}[data-video-two] [data-post-actions][data-reposted="true"] [data-control="repost"] svg{stroke-width:2}'}</style>
  <div data-camera style={{position:'absolute',width:1920,height:1080,transformOrigin:'0 0',transform:`translate(${960-camera.x*camera.scale}px,${540-camera.y*camera.scale}px) scale(${camera.scale})`}}>
   <Panel style={{left:130,top:130,width:1660,height:860,overflow:'hidden',boxShadow:'0 26px 65px #15151708,0 4px 14px #15151703'}}><Rail s={s}/><WorkspaceHeader/><WorkspaceViews s={s}/></Panel>
   <Cursor x={s.cursorX} y={s.cursorY} click={s.click} opacity={s.cursorOpacity}/>
  </div>
  <CanvasFeather/>
 </div>;
}
