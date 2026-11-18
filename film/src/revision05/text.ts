import {typingPosition,mix} from './timeline';
import {smoother,filtered} from './motion';
let context:CanvasRenderingContext2D|null=null;
const widths=new Map<string,number>();
export function measure(text:string,size:number,weight=500,spacing=-2.8){
 const key=`${size}/${weight}/${spacing}/${text}`;const cached=widths.get(key);if(cached!==undefined)return cached;
 context??=document.createElement('canvas').getContext('2d')!;context.font=`${weight} ${size}px "Helvetica Neue", Helvetica, Arial`;
 const width=context.measureText(text).width+text.length*spacing;widths.set(key,width);return width;
}
export function linesFor(text:string,width:number,size:number,weight=500,spacing=-2.8){
 const lines:string[]=[];let line='';for(const word of text.split(' ')){if(line&&measure(line+' '+word,size,weight,spacing)>width){lines.push(line+' ');line=word}else line+=(line?' ':'')+word}lines.push(line);return lines;
}
export function trackText(text:string,t:number,start:number,end:number,width:number,size:number,weight=500,spacing=-2.8,lineHeight=1.3){
 const lines=linesFor(text,width,size,weight,spacing),offsets:number[]=[];let used=0;for(const line of lines){offsets.push(used);used+=line.length}
 const weights=Array.from(text,c=>/[.!?]/.test(c)?3.2:c===','?2:c===' '?1.1:1),total=weights.reduce((a,b)=>a+b,0);
 const wraps=offsets.slice(1).map(index=>start+weights.slice(0,index).reduce((a,b)=>a+b,0)/total*(end-start));
 const xInLine=(line:string,n:number)=>{n=Math.max(0,Math.min(line.length,n));const whole=Math.floor(n);return mix(measure(line.slice(0,whole),size,weight,spacing),measure(line.slice(0,whole+1),size,weight,spacing),n-whole)};
 const position=(time:number)=>{
  const n=typingPosition(text,time,start,end);
  for(let i=0;i<wraps.length;i++)if(Math.abs(time-wraps[i])<.34){
   const blend=smoother((time-wraps[i]+.34)/.68);
   return {x:mix(xInLine(lines[i],n-offsets[i]),xInLine(lines[i+1],n-offsets[i+1]),blend),y:(i+blend)*size*lineHeight};
  }
  let i=0;while(i<lines.length-1&&n>=offsets[i+1])i++;return {x:xInLine(lines[i],n-offsets[i]),y:i*size*lineHeight};
 };
 return {x:filtered(t,q=>position(q).x,.1),y:filtered(t,q=>position(q).y,.1),lines};
}
