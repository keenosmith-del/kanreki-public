import {introduction,secondDescription,p,keys,mix,typed} from './timeline';
import {Avatar,Wordmark,asset,ink,Caret,RoundedSentence} from './ui';
import {linesFor} from './text';
import {glide} from './motion';
import manifest from '../../assets-revision-05.json';
export function Opening({t}:{t:number}) {
  const avatar=p(t,11.9,12.45),travel=p(t,14.15,16.15);
  const anchor=glide(t,[[0,960],[.3,960],[1.15,615],[2.95,615],[3.3,275],[11.7,275],[12.55,960],[14.15,960],[16.15,186]]);
  const cy=mix(mix(540,390,avatar),205,travel),size=mix(160,66,travel);
  const word=p(t,.65,1.45)*(1-p(t,2.22,2.95));
  const first=p(t,3.12,3.95)*(1-p(t,6.15,6.95));
  const secondShift=-160*(1-p(t,7.05,7.45))-1400*p(t,11.15,11.9);
  const typedSecond=typed(secondDescription,t,7.38,10.25);
  const secondLines=linesFor(secondDescription,1250,74,500,-2.8);
  let offset=0;
  return <>
    {/* The clip edge stays attached to the icon. Text never exits the viewport. */}
    {t<3.05&&<div data-opening-layer="wordmark" style={{position:'absolute',left:anchor+65,top:455,width:760,height:185,overflow:'hidden'}}><div style={{paddingLeft:35,transform:`translateX(${mix(-780,0,word)}px)`,whiteSpace:'nowrap'}}><Wordmark size={150}/></div></div>}
    {t>=3&&t<7&&<div data-opening-layer="first-description" style={{position:'absolute',left:anchor+65,top:441,width:1390,height:240,overflow:'hidden'}}><div style={{width:1320,paddingLeft:40,fontSize:74,fontWeight:500,letterSpacing:-2.8,lineHeight:1.23,transform:`translateX(${mix(-1400,0,first)}px)`}}><RoundedSentence text={introduction}/></div></div>}
    {t>=7&&t<11.95&&<div data-opening-layer="typed-description" style={{position:'absolute',left:anchor+65,top:441,width:1390,height:250,overflow:'hidden'}}><div style={{width:1320,paddingLeft:40,fontSize:74,fontWeight:500,letterSpacing:-2.8,lineHeight:1.3,transform:`translateX(${secondShift}px)`}}>
      {secondLines.map((line,i)=>{const a=offset;offset+=line.length;const text=typedSecond.slice(a,offset);return <div key={i} style={{height:96.2,whiteSpace:'pre'}}><RoundedSentence text={text}/>{typedSecond.length>=a&&typedSecond.length<offset&&t<10.5&&<Caret t={t} typing/>}</div>;})}
    </div></div>}
    <div style={{position:'absolute',left:anchor-size/2,top:cy-size/2,width:size,height:size,zIndex:4,borderRadius:'50%',overflow:'hidden',background:'#fff'}}>
      <img src={asset('icon')} alt="kanreki icon" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain',opacity:1-avatar,filter:`brightness(${1+Math.sin(p(t,.08,.45)*Math.PI)*.28})`}}/>
      <div style={{position:'absolute',inset:0,opacity:avatar}}><Avatar size={size}/></div>
    </div>
    <div data-welcome style={{position:'absolute',left:600,top:505,width:720,textAlign:'center',opacity:1-p(t,13.6,13.95)}}>
      <div style={{fontSize:29,color:'#77777c',letterSpacing:-.5,opacity:p(t,12.3,12.65),transform:`translateY(${(1-p(t,12.3,12.65))*9}px)`}}>welcome back</div>
      <div style={{fontSize:52,fontWeight:500,letterSpacing:-2,marginTop:13,opacity:p(t,12.5,12.85),transform:`translateY(${(1-p(t,12.5,12.85))*9}px)`}}>{manifest.primary.name}</div>
      <div style={{display:'inline-flex',justifyContent:'center',minWidth:180,marginTop:35,background:ink,color:'#fff',borderRadius:50,padding:'19px 39px',fontSize:26,opacity:p(t,12.85,13.1),transform:`scale(${1-Math.sin(p(t,13.35,13.55)*Math.PI)*.04})`}}>sign in</div>
    </div>
  </>;
}
