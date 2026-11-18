import {creators} from './content';
export type Node={id:number;person:number;x:number;y:number};
// The four large identities and the next seven people share this canvas from the start.
const core=[[302,258],[2202,258],[4102,258],[6002,258],[302,-900],[2202,-900],[4102,-900],[6002,-900],[1102,1458],[3502,1458],[5502,1458]];
export const nodes:Node[]=core.map(([x,y],i)=>({id:i,person:i,x,y}));
for(const [count,rx,ry,phase] of [[18,5800,3000,.08],[21,7800,4300,.17]])for(let j=0;j<count;j++){
 const a=j/count*Math.PI*2+phase+.045*Math.sin(j*2.17),r=1+.035*Math.sin(j*3.1);const id=nodes.length;
 nodes.push({id,person:(j*5+(count===18?2:7))%creators.length,x:3500+rx*r*Math.cos(a)-68,y:350+ry*r*Math.sin(a)-68});
}
export const edges=nodes.flatMap((node,i)=>{if(i===0||i%2)return [];let nearest=0,d=Infinity;for(let j=0;j<i;j++){const q=nodes[j],n=(node.x-q.x)**2+(node.y-q.y)**2;if(n<d){d=n;nearest=j}}return [[nearest,i] as const]});
