import {useLayoutEffect,useState} from 'react';
import {Composition,registerRoot,useCurrentFrame,delayRender,continueRender,cancelRender} from 'remotion';
import {Video6} from './Video6';
import {FPS,FRAMES} from './timeline';
import previous from '../../assets.json';
import existing from '../../video-04-assets.json';
import supplied from '../../video-06-assets.json';
function Film(){const frame=useCurrentFrame(),[handle]=useState(()=>delayRender('Decode supplied images and approved avatars'));
 useLayoutEffect(()=>{Promise.all([document.fonts.ready,...[...Object.values(previous),...Object.values(existing),...Object.values(supplied)].filter(i=>!('referenceOnly' in i)).map(i=>new Promise<void>((resolve,reject)=>{const img=new Image();img.onload=()=>img.decode().then(resolve,reject);img.onerror=()=>reject(Error(`Unreadable image: ${i.file}`));img.src=`/film/assets/${i.file}`}))]).then(()=>continueRender(handle)).catch(cancelRender)},[handle]);
 return <><style>{'*{box-sizing:border-box}html,body{margin:0;background:#fff}'}</style><Video6 frame={frame}/></>;
}
registerRoot(()=> <Composition id="KanrekiCommunityFilm" component={Film} width={1920} height={1080} fps={FPS} durationInFrames={FRAMES}/>);
