import { useEffect, useRef, useState, type ReactNode } from 'react';
export type MediaSpec = {
  id: string; label: string; kind: 'video' | 'image'; ratio: string;
  src?: string; webm?: string; poster?: string; mobilePoster?: string; alt: string; loop?: boolean;
};
function useMediaQuery(query:string) {
  const [matches,setMatches]=useState<boolean|null>(null);
  useEffect(()=>{const q=matchMedia(query);const update=()=>setMatches(q.matches);update();q.addEventListener('change',update);return()=>q.removeEventListener('change',update);},[query]);
  return matches;
}
/** Native looping never remounts a playing video. Completion is observed at playback wrap. */
export function MediaSlot({ spec, children, className = '', onFirstCycle, onFallback }: {
  spec:MediaSpec; children?:ReactNode; className?:string; onFirstCycle?:()=>void; onFallback?:()=>void;
}) {
  const reduced=useMediaQuery('(prefers-reduced-motion: reduce)');
  const narrow=useMediaQuery('(max-width: 760px)');
  const mobile=Boolean(spec.mobilePoster)&&narrow===true;
  const video=useRef<HTMLVideoElement>(null);
  const started=useRef(false),completed=useRef(false),lastTime=useRef(0);
  const callbacks=useRef({onFirstCycle,onFallback});callbacks.current={onFirstCycle,onFallback};
  const [failed,setFailed]=useState(false),[playing,setPlaying]=useState(false),[posterFailed,setPosterFailed]=useState(false);
  const poster=mobile?spec.mobilePoster:spec.poster;
  const staticOnly=reduced===true||mobile||failed||!spec.src;
  useEffect(()=>{if(staticOnly)callbacks.current.onFallback?.();},[staticOnly]);
  useEffect(()=>{if(reduced===true||mobile)video.current?.pause();},[reduced,mobile]);
  useEffect(()=>{
    if(staticOnly||reduced===null||narrow===null)return;
    const timer=window.setTimeout(()=>{if(!video.current||video.current.paused){setFailed(true);setPlaying(false);}},12000);
    return()=>window.clearTimeout(timer);
  },[staticOnly,reduced,narrow]);
  function finish() {if(!completed.current){completed.current=true;callbacks.current.onFirstCycle?.();}}
  function samplePlayback() {
    const el=video.current;if(!el||el.seeking||!Number.isFinite(el.duration)||el.duration<=0)return;
    // loop videos skip ended; observe actual decoded playback crossing the boundary.
    if(spec.loop&&lastTime.current>el.duration*.75&&el.currentTime<el.duration*.25)finish();
    lastTime.current=el.currentTime;
  }
  function seekFinished() {
    const el=video.current;if(!el)return;
    // Native looping can dispatch seeked before timeupdate. Recognize that wrap
    // only when the browser records a genuinely played range through the end.
    if(spec.loop&&lastTime.current>el.duration*.75&&el.currentTime<el.duration*.25){
      for(let i=0;i<el.played.length;i++)if(el.played.start(i)<.25&&el.played.end(i)>=el.duration-.1){finish();break;}
    }
    lastTime.current=el.currentTime;
  }
  function start() {
    const el=video.current;if(!el||staticOnly||started.current)return;
    started.current=true;el.muted=true;
    void el.play().then(()=>setPlaying(true)).catch(()=>{setFailed(true);setPlaying(false);});
  }
  const showPoster=spec.kind==='video'&&poster&&!posterFailed&&(!playing||staticOnly);
  return <div className={`media-slot ${className}`} style={{aspectRatio:spec.ratio}} data-media-slot={spec.id}>
    <div className="media-fallback" hidden={Boolean((playing&&!staticOnly)||showPoster)}>{children??<span className="media-caption">{spec.label}</span>}</div>
    {spec.kind==='image'&&spec.src&&!failed&&<img src={spec.src} alt={spec.alt} loading="lazy" onError={()=>setFailed(true)}/>}
    {showPoster&&<img src={poster} alt={spec.alt} onError={()=>setPosterFailed(true)}/>}
    {spec.kind==='video'&&spec.src&&!staticOnly&&reduced===false&&narrow!==null&&<video ref={video} poster={poster} style={{visibility:playing?'visible':'hidden'}} autoPlay muted playsInline loop={spec.loop??false} preload={spec.id==='introduction'?'auto':'metadata'} aria-label={spec.alt}
      onLoadedData={start} onTimeUpdate={samplePlayback} onSeeked={seekFinished} onPlaying={()=>setPlaying(true)} onEnded={()=>{setPlaying(true);finish();}} onError={()=>{setFailed(true);setPlaying(false);}}>
      <source src={spec.src} type="video/mp4"/>{spec.webm&&<source src={spec.webm} type="video/webm"/>}
    </video>}
  </div>;
}
