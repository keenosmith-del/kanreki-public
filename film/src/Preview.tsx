import {useLayoutEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {flushSync} from 'react-dom';
import {FPS,FRAMES,SECONDS} from './timeline';
import {Hero} from './Hero';
declare global {interface Window {film:{seek:(frame:number)=>Promise<void>;fps:number;frames:number;seconds:number;};}}
function Preview() {
  const [frame,setFrame]=useState(Number(new URLSearchParams(location.search).get('frame')||0));
  useLayoutEffect(()=>{
    window.film={fps:FPS,frames:FRAMES,seconds:SECONDS,seek:async next=>{
      flushSync(()=>setFrame(next));await document.fonts.ready;
      await Promise.all(Array.from(document.images).map(img=>img.decode()));
      await new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));
    }};
  },[]);
  return <Hero frame={frame}/>;
}
createRoot(document.getElementById('root')!).render(<Preview/>);
