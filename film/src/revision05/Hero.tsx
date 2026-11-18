import type {ReactNode} from 'react';
import { stateAt,keys,p,mix,tagline,FPS,FRAMES,SECONDS,secondDescription } from './timeline';
import { asset,Wordmark,Cursor,ink } from './ui';
import { Workspace,Composer,Toast } from './workspace';
import { Opening } from './Opening';
import { measure,trackText } from './text';
import {body} from './timeline';
import {cameraAt} from './camera';
import {filtered} from './motion';
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
  const base=cameraAt(t);let {x,y,scale}=base;
  if(t>=6.9&&t<=11){
    const follow=(q:number)=>{const target=trackText(secondDescription,q,7.38,10.25,1250,74);return {x:(target.x-580)*.08,y:target.y*.14,amount:p(q,7.1,7.7)*(1-p(q,10.1,10.8))}};
    x+=filtered(t,q=>{const a=follow(q);return a.x*a.amount},.18);
    y+=filtered(t,q=>{const a=follow(q);return a.y*a.amount},.18);
  }
  if(t>=26.95&&t<=35.15){
    const follow=(q:number)=>{const target=trackText(body,q,27.5,34.4,1158,30,400,-.5,1.55);const amount=p(q,27.2,27.8)*(1-p(q,34.3,34.9));return {x:(target.x-570)*.045*amount,y:target.y*.1*amount}};
    x+=filtered(t,q=>follow(q).x,.22);y+=filtered(t,q=>follow(q).y,.22);
  }
  const resolve=p(t,49.3,49.9);
  return <div id="film-frame" data-frame={frame} style={{position:'relative',width:1920,height:1080,overflow:'hidden',background:'#fff',color:ink,fontFamily:'"Helvetica Neue", Helvetica, Arial, sans-serif'}}>
    <Camera x={x} y={y} scale={scale}>
      {t>=14&&t<49.9&&<div style={{opacity:1-resolve,filter:`blur(${s.composer*1.6}px)`}}><Workspace s={s}/></div>}
      {t<16.15&&<Opening t={t}/>}
      {t>=23.35&&t<39.05&&<Composer s={s}/>}
      {t>=39&&t<41.5&&<Toast s={s}/>}
      <Cursor x={s.cursorX} y={s.cursorY} click={s.click} opacity={s.cursorOpacity}/>
    </Camera>
    {t>=49.3&&<Closing t={t} dotX={960+(1718.5-x)*scale} dotY={540+(178.5-y)*scale} dotSize={7*scale}/>}
    <div data-canvas-feather style={{position:'absolute',inset:0,pointerEvents:'none',background:'linear-gradient(90deg,#fff 0%,rgba(255,255,255,0) 4%,rgba(255,255,255,0) 96%,#fff 100%),linear-gradient(0deg,#fff 0%,rgba(255,255,255,0) 5%,rgba(255,255,255,0) 95%,#fff 100%)'}}/>
  </div>;
}
