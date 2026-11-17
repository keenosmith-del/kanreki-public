import {useLayoutEffect,useState} from 'react';
import {Composition,registerRoot,useCurrentFrame,delayRender,continueRender,cancelRender} from 'remotion';
import {Video2} from './Video2';
import {FPS,FRAMES} from './timeline';
import previous from '../../assets.json';
import supplied from '../../video-02-assets.json';
function Film(){const frame=useCurrentFrame(),[handle]=useState(()=>delayRender('Decode original kanreki photographs'));
 useLayoutEffect(()=>{Promise.all([document.fonts.ready,...[...Object.values(previous),...Object.values(supplied)].filter(i=>!('referenceOnly' in i)).map(i=>new Promise<void>((resolve,reject)=>{const img=new Image();img.onload=()=>img.decode().then(resolve,reject);img.onerror=()=>reject(Error(`Unreadable image: ${i.file}`));img.src=`/film/assets/${i.file}`}))]).then(()=>continueRender(handle)).catch(cancelRender)},[handle]);
 return <><style>{'*{box-sizing:border-box}html,body{margin:0;background:#fff}'}</style><Video2 frame={frame}/></>;
}
registerRoot(()=> <Composition id="KanrekiProfilesFilm" component={Film} width={1920} height={1080} fps={FPS} durationInFrames={FRAMES}/>);
