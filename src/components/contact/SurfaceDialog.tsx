import {useEffect,useRef,type ReactNode} from 'react';
export function SurfaceDialog({children,onClose,busy,restoreTo}:{children:ReactNode|((close:()=>void)=>ReactNode);onClose:()=>void;busy:boolean;restoreTo:HTMLElement|null}){
 const dialog=useRef<HTMLDialogElement>(null);
 function close(){if(!busy)onClose()}
 useEffect(()=>{const el=dialog.current!,overflow=document.body.style.overflow;document.body.style.overflow='hidden';if(!el.open)el.showModal();el.querySelector<HTMLButtonElement>('.surface-close')?.focus();return()=>{el.close();document.body.style.overflow=overflow;const target=restoreTo?.isConnected?restoreTo:document.querySelector<HTMLElement>('.site-mobile-toggle');target?.focus({preventScroll:true})}},[restoreTo]);
 return <dialog ref={dialog} className="surface-dialog" aria-labelledby="enquiry-title" onCancel={e=>{e.preventDefault();close()}} onClick={e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()}}} onKeyDown={e=>{
 if(e.key!=='Tab')return;const list=[...e.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled):not([tabindex="-1"]),textarea:not(:disabled),a[href]')],first=list[0],last=list.at(-1);
 if(!first){e.preventDefault();return}if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
 }}>
 <button className="surface-close" type="button" aria-label="close" disabled={busy} onClick={close}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg></button>
 <div className="surface-scroll"><h2 id="enquiry-title">your enquiry</h2>{typeof children==='function'?children(close):children}</div>
 </dialog>;
}
