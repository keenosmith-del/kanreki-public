import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {stateAt,FPS,FRAMES,cameraAt} from '../film/src/video6/timeline';
import {creators,featured,previews,tagline} from '../film/src/video6/content';
import {nodes,edges} from '../film/src/video6/community';
import {Notifications,Conversation,ProfileUI,Identity,BrandClosing} from '../film/src/video6/components';
import {Video6} from '../film/src/video6/Video6';
const at=(t:number)=>stateAt(t*FPS);
describe('Video 6 community and identity continuity',()=>{
 it('keeps one featured sender across messages, conversation, profile and community',()=>{
  expect(creators).toHaveLength(11);expect(new Set(creators.map(c=>c.id)).size).toBe(11);expect(previews).toHaveLength(11);
  const inbox=renderToStaticMarkup(<Notifications s={at(6)}/>),chat=renderToStaticMarkup(<Conversation/>),profile=renderToStaticMarkup(<ProfileUI s={at(18)} includeIdentity/>),identity=renderToStaticMarkup(<Identity person={featured} node={nodes[0]} s={at(26)}/>);
  for(const view of [inbox,chat,profile,identity]){expect(view).toContain(featured.name);expect(view).toContain(featured.username);expect(view).toContain('community-user-01.png');}
  expect(inbox.match(/data-sender=/g)).toHaveLength(11);expect(inbox).toContain('-webkit-line-clamp:1');expect(new Set(profile.match(/community-post-0[123].png/g)).size).toBe(3);
 });
 it('follows once, increments exactly one follower and preserves the other metadata',()=>{
  expect(at(21.5).followers).toBe(1248);expect(at(21.6).followers).toBe(1249);expect(at(30).followers).toBe(1249);
  expect(renderToStaticMarkup(<ProfileUI s={at(21)} includeIdentity/>)).toContain('+ follow');expect(renderToStaticMarkup(<ProfileUI s={at(22)} includeIdentity/>)).toContain('following');expect(creators[0].following).toBe(186);expect(creators[0].posts).toBe(84);
 });
 it('places fifty stable identities on one canvas with eleven distinct portraits before reuse',()=>{
  expect(nodes).toHaveLength(50);expect(new Set(nodes.slice(0,11).map(n=>n.person)).size).toBe(11);expect(nodes.slice(0,4).map(n=>n.x)).toEqual([302,2202,4102,6002]);expect(new Set(nodes.map(n=>n.id)).size).toBe(50);
  for(let i=0;i<nodes.length;i++)for(let j=0;j<i;j++)expect(Math.hypot(nodes[i].x-nodes[j].x,nodes[i].y-nodes[j].y)).toBeGreaterThan(400);
  expect(edges.length).toBeLessThan(30);expect(cameraAt(33.7).x).toBeGreaterThan(cameraAt(27).x);expect(cameraAt(41).scale).toBeCloseTo(.1,4);
 });
 it('reduces portraits to points at their existing locations and resolves to the actual brand asset',()=>{
  expect(at(40).portraits).toBe(1);expect(at(42.5).portraits).toBe(0);expect(at(42.5).points).toBe(1);expect(at(46.4).icon).toBe(1);expect(at(46.4).points).toBe(0);
  const brand=renderToStaticMarkup(<BrandClosing s={at(49.5)}/>);expect(brand).toContain('url-icon.png');expect(brand).toContain('kanreki.');expect(brand).toContain(tagline);expect(brand).toContain('border-radius:50%');
 });
 it('never displays duplicate wordmarks or primary avatars during the final handoff',()=>{
  function visible(el:Element){let opacity=1;for(let n:Element|null=el;n;n=n.parentElement){const style=(n as HTMLElement).style;if(style?.opacity)opacity*=Number(style.opacity)}return opacity>.001}
  for(const t of [0,49.5,51.4,51.9]){const host=document.createElement('div');host.innerHTML=renderToStaticMarkup(<Video6 frame={t*FPS}/>);expect(Array.from(host.querySelectorAll('[aria-label="kanreki."]')).filter(visible)).toHaveLength(1);expect(Array.from(host.querySelectorAll('img[alt="Keeno Smith"]')).filter(visible)).toHaveLength(t===49.5?0:1)}
 });
 it('finishes the return to Home without a cursor or brand overlay at the loop boundary',()=>{
  const start=renderToStaticMarkup(<Video6 frame={0}/>),end=renderToStaticMarkup(<Video6 frame={FRAMES-1}/>);
  expect(at(51.9).loop).toBe(1);expect(at(51.9).cursorOpacity).toBe(0);expect(start).toContain('data-home-feed');expect(end).toContain('data-loop-home');expect(end).toContain('data-home-feed');
 });
});
