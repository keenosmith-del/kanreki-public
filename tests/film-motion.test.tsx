import {expect,it,vi} from 'vitest';
import {glide} from '../film/src/motion';
import {cameraAt} from '../film/src/camera';
import {storyAt,presentationAt} from '../film/src/timeline';
import {trackText} from '../film/src/text';
it('glides through camera waypoints with continuous velocity and no overshoot',()=>{
 const stops=[[0,0],[1,40],[2,100],[3,100],[4,20]] as const,h=.00001;
 for(const knot of [1,2,3]){
  const left=(glide(knot,stops)-glide(knot-h,stops))/h,right=(glide(knot+h,stops)-glide(knot,stops))/h;
  expect(Math.abs(left-right)).toBeLessThan(.01);
 }
 for(let t=0;t<=4;t+=.01)expect(glide(t,stops)).toBeGreaterThanOrEqual(0);
 for(let t=0;t<=4;t+=.01)expect(glide(t,stops)).toBeLessThanOrEqual(100+1e-9);
});
it('retains continuous opening speed as the slower opening meets the normal timeline',()=>{
 const h=.00001,t=20.65;
 expect(Math.abs((storyAt(t)-storyAt(t-h))/h-(storyAt(t+h)-storyAt(t))/h)).toBeLessThan(.001);
 for(let seconds=0;seconds<60;seconds+=.05){expect(storyAt(seconds+.001)).toBeGreaterThan(storyAt(seconds));expect(presentationAt(storyAt(seconds))).toBeCloseTo(seconds,6)}
});
it('smooths caret line-wrap tracking instead of resetting the horizontal target',()=>{
 vi.spyOn(HTMLCanvasElement.prototype,'getContext').mockReturnValue({font:'',measureText:(text:string)=>({width:text.length*10})} as unknown as CanvasRenderingContext2D);
 const text='one two three four five six seven eight nine ten',h=.000001;
 let largestJump=0;
 for(let t=0;t<4;t+=.002){const a=trackText(text,t,0,4,125,20,500,0),b=trackText(text,t+h,0,4,125,20,500,0);largestJump=Math.max(largestJump,Math.abs(a.x-b.x),Math.abs(a.y-b.y))}
 expect(largestJump).toBeLessThan(.01);vi.restoreAllMocks();
});
it('keeps all camera samples finite with smooth frame-to-frame acceleration',()=>{
 let previous=cameraAt(0);for(let frame=1;frame<3180;frame++){
  const next=cameraAt(frame/60);expect(Number.isFinite(next.x+next.y+next.scale)).toBe(true);expect(next.scale).toBeGreaterThan(.9);
  expect(Math.abs(next.x-previous.x)).toBeLessThan(30);expect(Math.abs(next.y-previous.y)).toBeLessThan(30);previous=next;
 }
});
