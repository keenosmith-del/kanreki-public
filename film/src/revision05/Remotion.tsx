import {useLayoutEffect,useState} from 'react';
import {AbsoluteFill,Composition,registerRoot,useCurrentFrame,delayRender,continueRender} from 'remotion';
import {Hero} from './Hero';
import {FPS,FRAMES} from './timeline';
import manifest from '../../assets-revision-05.json';
function Film(){
 const frame=useCurrentFrame();
 const [handle]=useState(()=>delayRender('Load supplied original photographs'));
 useLayoutEffect(()=>{
  Promise.all([document.fonts.ready,...Object.values(manifest).filter(item=>!('referenceOnly' in item)).map(item=>new Promise<void>((resolve,reject)=>{
   const image=new Image();image.onload=()=>image.decode().then(resolve,reject);image.onerror=()=>reject(new Error(`Cannot decode supplied asset ${item.file}`));image.src=`/film/assets/${item.file}`;
  }))]).then(()=>continueRender(handle));
 },[handle]);
 return <AbsoluteFill><style>{'*{box-sizing:border-box}html,body{margin:0;background:white}h2,p{margin-top:0}'}</style><Hero frame={frame}/></AbsoluteFill>;
}
registerRoot(()=> <Composition id="KanrekiHeroRevision05" component={Film} width={1920} height={1080} fps={FPS} durationInFrames={FRAMES}/>);
