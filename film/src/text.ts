import {typingPosition, mix} from './timeline';
let context:CanvasRenderingContext2D|null=null;
export function measure(text:string,size:number,weight=500,spacing=-2.8) {
  context??=document.createElement('canvas').getContext('2d')!;
  context.font=`${weight} ${size}px "Helvetica Neue", Helvetica, Arial`;
  return context.measureText(text).width+text.length*spacing;
}
export function linesFor(text:string,width:number,size:number,weight=500,spacing=-2.8) {
  const lines:string[]=[];let line='';
  for(const word of text.split(' ')) {
    if(line&&measure(line+' '+word,size,weight,spacing)>width){lines.push(line+' ');line=word;}
    else line+=(line?' ':'')+word;
  }
  lines.push(line);return lines;
}
// Continuous glyph position with a short temporal filter across line wraps.
export function trackText(text:string,t:number,start:number,end:number,width:number,size:number,weight=500,spacing=-2.8,lineHeight=1.3) {
  const lines=linesFor(text,width,size,weight,spacing);
  function position(time:number) {
    let n=typingPosition(text,time,start,end),i=0;
    while(i<lines.length-1&&n>=lines[i].length){n-=lines[i].length;i++;}
    const line=lines[i],whole=Math.floor(n),fraction=n-whole;
    const x=mix(measure(line.slice(0,whole),size,weight,spacing),measure(line.slice(0,whole+1),size,weight,spacing),fraction);
    return {x,y:i*size*lineHeight};
  }
  const samples=[-.18,-.12,-.06,0,.06,.12,.18].map(offset=>position(t+offset));
  return {x:samples.reduce((s,q)=>s+q.x,0)/samples.length,y:samples.reduce((s,q)=>s+q.y,0)/samples.length,lines};
}
