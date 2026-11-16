import type {ReactNode} from 'react';
import { stateAt,keys,p,mix,tagline,FPS,FRAMES,SECONDS,secondDescription } from './timeline';
import { asset,Wordmark,Cursor,ink } from './ui';
import { Workspace,Composer,Toast } from './workspace';
import { Opening } from './Opening';
import { measure,trackText } from './text';
import {body} from './timeline';
function Camera({x,y,scale,children}:{x:number;y:number;scale:number;children:ReactNode}) {
  return <div data-camera style={{position:'absolute',width:1920,height:1080,transformOrigin:'0 0',transform:`translate(${960-x*scale}px,${540-y*scale}px) scale(${scale})`}}>{children}</div>;
}
function Closing({t,dotX,dotY,dotSize}:{t:number;dotX:number;dotY:number;dotSize:number}) {
  const enter=p(t,49.5,50.15),leave=p(t,51.95,52.6),size=170;
  const textWidth=measure('kanreki',size,500,-size*.07),gap=size*2/28,circle=size*3/28;
  const left=(1920-textWidth-gap-circle)/2;
  const dotTarget=left+textWidth+gap+circle/2;
  return <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
    <div style={{position:'absolute',left,top:434,width:textWidth+2,height:190,overflow:'hidden'}}><div style={{transform:`translateX(${(1-enter+leave)*textWidth}px)`}}><Wordmark size={size} dot={false}/></div></div>
    <span style={{position:'absolute',left:mix(dotX,dotTarget,enter),top:mix(dotY,568,enter),width:mix(dotSize,circle,enter),height:mix(dotSize,circle,enter),background:ink,borderRadius:'50%',transform:'translate(-50%,-50%)',opacity:1-p(t,52.35,52.65)}}/>
    <div style={{position:'absolute',top:645,width:'100%',textAlign:'center',fontSize:40,letterSpacing:-1.4,opacity:p(t,49.95,50.35)*(1-p(t,51.85,52.25)),transform:`translateY(${(1-enter)*9}px)`}}>{tagline}</div>
    <img src={asset('icon')} alt="" style={{position:'absolute',left:880,top:460,width:160,height:160,objectFit:'contain',opacity:p(t,52.3,52.9)}}/>
  </div>;
}
export function Hero({frame}:{frame:number}) {
  const s=stateAt(frame),t=s.t;
  const descriptionTrack=trackText(secondDescription,t,7.38,10.25,1250,74);
  const bodyTrack=trackText(body,t,26.6,35.1,1158,30,400,-.5,1.55);
  let x=keys(t,[[0,960],[1.5,960],[3,960],[3.8,1000],[4.7,960],[7,960],[7.5,940],[10.5,960],[12.5,960],[13.4,960],[14.15,960],[16.15,960],[18.5,975],[21.7,1330],[23.2,1510],[24.2,960],[26.3,990],[35.2,990],[36.1,960],[37.9,1430],[39.3,960],[40.7,1000],[43.2,1000],[46.9,1070],[48,1200],[49.2,1704],[49.7,1718.5]]);
  let y=keys(t,[[0,540],[12.5,540],[13.4,540],[14.15,390],[16.15,540],[18.5,535],[23.2,270],[24.2,540],[26.3,530],[35.2,610],[36.1,540],[37.9,850],[39.3,540],[40.7,640],[43.2,700],[46.9,700],[48,500],[49.2,196],[49.7,178.5]]);
  let scale=keys(t,[[0,1],[1.5,1.04],[2.7,1],[3.8,1.1],[4.7,1],[7.3,1.1],[10.6,1],[12.5,1],[13.4,1],[14.15,1.28],[16.15,1],[18.5,1.03],[21.7,1.3],[23.2,1.8],[24.2,1],[24.8,1.15],[26.3,1.05],[27.2,1.18],[35.2,1.18],[36.1,1],[37.9,1.9],[39.3,1],[40.7,1.16],[43.2,1.12],[46.9,1.05],[48,1.15],[49.2,2.5],[49.7,2.6]]);
  if(t>=7.38&&t<10.5) {
    const amount=p(t,7.38,7.7)*(1-p(t,10.1,10.5));
    x+=((descriptionTrack.x-580)*.11)*amount;
    y+=descriptionTrack.y*.18*amount;
  }
  if(t>=26.6&&t<35.7) {
    const amount=p(t,26.6,27)*(1-p(t,35.1,35.7));
    x+=(bodyTrack.x-570)*.1*amount;y+=bodyTrack.y*.18*amount;
  }
  const resolve=p(t,49.3,49.9);
  return <div id="film-frame" data-frame={frame} style={{position:'relative',width:1920,height:1080,overflow:'hidden',background:'#fff',color:ink,fontFamily:'"Helvetica Neue", Helvetica, Arial, sans-serif'}}>
    <Camera x={x} y={y} scale={scale}>
      {t>=14&&t<49.9&&<div style={{opacity:1-resolve}}><Workspace s={s}/></div>}
      {t<16.15&&<Opening t={t}/>}
      {t>=23.35&&t<39.05&&<Composer s={s}/>}
      {t>=39&&t<41.5&&<Toast s={s}/>}
      <Cursor x={s.cursorX} y={s.cursorY} click={s.click} opacity={s.cursorOpacity}/>
    </Camera>
    {t>=49.3&&<Closing t={t} dotX={960+(1718.5-x)*scale} dotY={540+(178.5-y)*scale} dotSize={7*scale}/>}
  </div>;
}
