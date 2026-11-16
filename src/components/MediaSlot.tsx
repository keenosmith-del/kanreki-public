import { useEffect, useRef, useState, type ReactNode } from 'react';
export type MediaSpec = {
  id: string; label: string; kind: 'video' | 'image'; ratio: string;
  src?: string; poster?: string; alt: string; loop?: boolean;
};
function useReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => { const q = matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(q.matches); update(); q.addEventListener('change', update); return () => q.removeEventListener('change', update); }, []);
  return reduced;
}
/** Asset-free until src is supplied. Non-looping videos retain the decoded last frame. */
export function MediaSlot({ spec, children, className = '' }: { spec: MediaSpec; children?: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const started = useRef(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const fallback = children ?? <span className="media-caption">{spec.label}</span>;
  useEffect(() => {
    if (reduced) video.current?.pause();
    // Never restart on preference changes or unrelated renders.
  }, [reduced]);
  function start() {
    const el = video.current;
    if (!el || reduced || started.current) return;
    started.current = true; el.muted = true;
    void el.play().then(() => setPlaying(true)).catch(() => { setFailed(true); setPlaying(false); });
  }
  return <div className={`media-slot ${className}`} style={{ aspectRatio: spec.ratio }} data-media-slot={spec.id}>
    <div className="media-fallback" hidden={playing && !failed && !reduced}>{fallback}</div>
    {spec.kind === 'image' && spec.src && !failed && <img src={spec.src} alt={spec.alt} loading="lazy" onError={() => setFailed(true)} />}
    {spec.kind === 'video' && spec.poster && !posterFailed && (!playing || failed || reduced) && <img src={spec.poster} alt={spec.alt} onError={() => setPosterFailed(true)} />}
    {spec.kind === 'video' && spec.src && !failed && !reduced && <video ref={video} src={spec.src} poster={spec.poster} style={{ visibility: playing ? 'visible' : 'hidden' }} autoPlay muted playsInline loop={spec.loop ?? false} preload={spec.id === 'introduction' ? 'auto' : 'metadata'}
      aria-label={spec.alt} onLoadedData={start} onEnded={() => setPlaying(true)} onError={() => { setFailed(true); setPlaying(false); }} />}
  </div>;
}
