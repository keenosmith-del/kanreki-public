import type { CSSProperties, ReactNode } from 'react';
import manifest from '../assets.json';
export const ink='#151517', muted='#77777C', surface='#F7F7F7';
export type Person = 'primary' | 'contributor1' | 'contributor2' | 'contributor3';
export const asset=(key:keyof typeof manifest)=>`/film/assets/${manifest[key].file}`;
export function Avatar({person='primary',size=48}:{person?:Person;size?:number}) {
  return <img src={asset(person)} alt={manifest[person].name} style={{width:size,height:size,borderRadius:'50%',objectFit:'cover',objectPosition:'50% 30%',flexShrink:0}}/>;
}
export function Wordmark({size=140,dot=true}:{size?:number;dot?:boolean}) {
  return <span role="img" aria-label="kanreki." style={{fontFamily:'"Helvetica Neue", Helvetica, Arial, sans-serif',fontSize:size,fontWeight:500,letterSpacing:'-.07em',display:'inline-flex',alignItems:'baseline',lineHeight:1}}>kanreki{dot&&<span style={{width:size*3/28,height:size*3/28,borderRadius:'50%',background:'currentColor',marginLeft:size*2/28,flexShrink:0}}/>}</span>;
}
export function RoundedSentence({text}:{text:string}){
 return <>{text.split('.').map((part,i,parts)=><span key={i}>{part}{i<parts.length-1&&<span aria-label="." role="img" style={{display:'inline-block',width:'.09em',height:'.09em',borderRadius:'50%',background:'currentColor',marginLeft:'.04em',marginRight:'.02em',verticalAlign:'baseline'}}/>}</span>)}</>;
}
export type IconName = 'home'|'pen'|'compass'|'bookmark'|'heart'|'settings'|'search'|'bell'|'message'|'share'|'arrow'|'close'|'image'|'check'|'bold'|'italic'|'underline'|'heading'|'link'|'list'|'align'|'quote'|'thumbDown'|'repost'|'more';
export function Icon({name,size=28,filled=false}:{name:IconName;size?:number;filled?:boolean}) {
  const paths:Record<IconName,ReactNode>={
    bold:<path d="M7 4h7a4 4 0 0 1 0 8H7m0-8v16h8a4 4 0 0 0 0-8H7"/>,
    italic:<path d="M10 4h9M5 20h9M15 4 9 20"/>,
    underline:<path d="M6 4v8a6 6 0 0 0 12 0V4M4 21h16"/>,
    heading:<path d="M5 4v16M19 4v16M5 12h14"/>,
    link:<path d="m10 14 4-4m-5 6-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 0 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0"/>,
    list:<><path d="M8 5h13M8 12h13M8 19h13"/><circle cx="3" cy="5" r=".7"/><circle cx="3" cy="12" r=".7"/><circle cx="3" cy="19" r=".7"/></>,
    align:<path d="M3 4h18M3 9h12M3 14h18M3 19h12"/>,
    quote:<path d="M4 7h6v7H5l-1 4m10-11h6v7h-5l-1 4"/>,
    home:<><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/></>,
    pen:<><path d="M12 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7M15 4l5 5M10 14l-1 4 4-1L22 8l-4-4Z"/></>,
    compass:<><circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6Z"/></>,
    bookmark:<path d="M6 3h12v18l-6-4-6 4Z"/>,
    heart:<path d="M20.5 5.5a5 5 0 0 0-7 0L12 7l-1.5-1.5a5 5 0 0 0-7 7L12 21l8.5-8.5a5 5 0 0 0 0-7Z"/>,
    settings:<><circle cx="12" cy="12" r="3"/><path d="m9 3-1 3-3 1-2 4 2 2v4l4 3 3-1 3 1 4-3v-4l2-2-2-4-3-1-1-3Z"/></>,
    search:<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    bell:<><path d="M5 17h14l-2-4V9a5 5 0 0 0-10 0v4ZM10 21h4"/></>,
    message:<path d="M21 11.5a9 9 0 0 1-9 9c-1.5 0-3-.3-4.3-1L3 21l1.5-4.7A9 9 0 1 1 21 11.5Z"/>,
    share:<><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4m-6.8 7 6.8 4"/></>,
    repost:<><path d="m3 7 4-4 4 4M7 3v12a3 3 0 0 0 3 3h3m8-1-4 4-4-4m4 4V9a3 3 0 0 0-3-3h-3"/></>,
    thumbDown:<><path d="M15 14v5a3 3 0 0 1-3 3l-4-9V2h10a2 2 0 0 1 2 1.7l1 7A3 3 0 0 1 18 14ZM8 2H3v11h5"/></>,
    more:<><circle cx="4" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="20" cy="12" r="1.2" fill="currentColor" stroke="none"/></>,
    arrow:<path d="M4 12h16m-6-6 6 6-6 6"/>, close:<path d="m6 6 12 12M6 18 18 6"/>,
    image:<><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8" cy="8" r="1"/><path d="m3 17 5-5 4 4 4-6 5 7"/></>,
    check:<path d="m5 12 4 4L19 6"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={filled?'currentColor':'none'} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
export function Panel({children,style={}}:{children:ReactNode;style?:CSSProperties}) {
  return <div style={{position:'absolute',background:'#fff',borderRadius:48,boxShadow:'0 44px 100px #15151710,0 8px 25px #15151706',...style}}>{children}</div>;
}
export function Caret({t,typing=false}:{t:number;typing?:boolean}) {return <span style={{display:'inline-block',width:2,height:'1em',background:ink,verticalAlign:'-.12em',marginLeft:3,opacity:typing||Math.floor(t*3)%2?1:.25}}/>;}
export function Cursor({x,y,click,opacity}:{x:number;y:number;click:number;opacity:number}) {
  return <div style={{position:'absolute',left:x,top:y,zIndex:30,opacity,transform:`scale(${1-click*.15})`,transformOrigin:'0 0'}}><svg width="30" height="38" viewBox="0 0 30 38"><path d="M2 2v29l8-8 6 13 5-3-6-12h12Z" fill={ink} stroke="#fff" strokeWidth="2"/></svg><span style={{position:'absolute',left:-14,top:-14,width:32,height:32,border:'2px solid #151517',borderRadius:'50%',opacity:click*.25,transform:`scale(${1+click})`}}/></div>;
}
