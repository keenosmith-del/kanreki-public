export type Stops=readonly (readonly [number,number])[];
/** Shape-preserving cubic interpolation: continuous velocity, without overshoot. */
export function glide(t:number,stops:Stops){
 const n=stops.length;if(t<=stops[0][0])return stops[0][1];if(t>=stops[n-1][0])return stops[n-1][1];
 const h=stops.slice(1).map((s,i)=>s[0]-stops[i][0]);
 const d=h.map((v,i)=>(stops[i+1][1]-stops[i][1])/v);
 const slope=(i:number)=>{
  if(i===0||i===n-1)return 0;
  if(d[i-1]*d[i]<=0)return 0;
  const w1=2*h[i]+h[i-1],w2=h[i]+2*h[i-1];return (w1+w2)/(w1/d[i-1]+w2/d[i]);
 };
 let i=0;while(t>stops[i+1][0])i++;
 const u=(t-stops[i][0])/h[i],u2=u*u,u3=u2*u;
 return (2*u3-3*u2+1)*stops[i][1]+(u3-2*u2+u)*h[i]*slope(i)+(-2*u3+3*u2)*stops[i+1][1]+(u3-u2)*h[i]*slope(i+1);
}
export const smoother=(value:number)=>{const x=Math.max(0,Math.min(1,value));return x*x*x*(x*(x*6-15)+10)};
/** Deterministic symmetric temporal filtering, independent of render order. */
export function filtered(t:number,fn:(time:number)=>number,radius=.24){
 let sum=0,weight=0;
 for(let i=-8;i<=8;i++){const w=Math.exp(-.5*(i/3)**2);sum+=fn(t+i*radius/8)*w;weight+=w;}
 return sum/weight;
}
