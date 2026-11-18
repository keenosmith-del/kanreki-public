import {it,expect} from 'vitest';
import {render} from '@testing-library/react';
import manifest from '../film/assets-revision-05.json';
import {Workspace,Composer,PublishedPost,RichBody} from '../film/src/revision05/workspace';
import {stateAt,presentationAt,likesAt,storyAt,body,introduction,FRAMES} from '../film/src/revision05/timeline';
import {cameraAt} from '../film/src/revision05/camera';
const state=(t:number)=>stateAt(Math.round(presentationAt(t)*60));
it('maps three distinct commenters and feed images without replacing the primary avatar',()=>{
 expect(manifest.primary.file).toBe('avatar.png');
 expect(new Set([manifest.contributor1.file,manifest.contributor2.file,manifest.contributor3.file]).size).toBe(3);
 expect([manifest.post1.file,manifest.post2.file,manifest.post3.file]).toEqual(['post-01.png','post-02.png','post-03.png']);
 const {container}=render(<Workspace s={state(20)}/>);
 for(const name of ['post-01.png','post-02.png','post-03.png'])expect(container.querySelector(`img[src$="/${name}"]`)).toBeTruthy();
 expect(container.textContent).toContain('search articles, images and people');
 expect(container.querySelectorAll('path[d="M12 4v16M4 12h16"]')).toHaveLength(2);
});
it('uses one creation image in the picker, attachment and resulting post',()=>{
 const {container}=render(<><Composer s={state(27.15)}/><PublishedPost s={state(46.5)}/></>);
 expect(container.querySelectorAll('img[src$="/create-post-image-01.png"]')).toHaveLength(3);
 expect(container.querySelectorAll('[data-image-choice]')).toHaveLength(1);
 expect(container.textContent).not.toContain('post-image2.png');
});
it('shows three independent, persistent comments with an accurate counter',()=>{
 expect(state(43).comments).toBe(0);expect(state(44).comments).toBe(1);expect(state(45.2).comments).toBe(2);expect(state(46.5).comments).toBe(3);
 const {container}=render(<PublishedPost s={state(46.5)}/>);
 for(const person of ['new-user-01.png','new-user-02.png','new-user-03.png'])expect(container.querySelectorAll(`img[src$="/${person}"]`)).toHaveLength(1);
 expect(container.textContent).toContain('Fewer choices, and a much clearer next step. That matters.');
});
it('reserves complete paragraph layout during typing and retains final rich text',()=>{
 const {container,rerender}=render(<RichBody text={body.slice(0,45)} s={state(28.5)}/>);
 expect(container.textContent).toBe(body);expect(container.querySelector('[style*="visibility: hidden"]')).toBeTruthy();
 rerender(<RichBody text={body} s={state(37.5)}/>);
 expect(container.querySelector('[data-rich-link]')?.getAttribute('href')).toContain('w3.org/WAI');
 expect(container.querySelector('[data-rich-term="main action"]')?.getAttribute('style')).toContain('600');
});
it('holds a legible close-up while likes visibly increase',()=>{
 expect(likesAt(40)).toBe(0);expect(likesAt(46)).toBe(64);
 let previous=0;for(let t=40;t<=47;t+=1/60){const next=likesAt(t);expect(next).toBeGreaterThanOrEqual(previous);expect(next-previous).toBeLessThanOrEqual(1);previous=next;}
 for(const t of [41.7,42.2,42.8]){const c=cameraAt(t);expect(c.scale).toBeGreaterThan(1.6);expect(c.x).toBeLessThan(670);}
 expect(likesAt(42.8)-likesAt(41.7)).toBeGreaterThan(10);
});
it('preserves duration and has no camera jumps at any presentation frame or remapping boundary',()=>{
 expect(FRAMES).toBe(3600);expect(introduction).toBe('Publish articles, share images and post updates in one feed.');
 let last=cameraAt(storyAt(0));for(let frame=1;frame<3600;frame++){
  const c=cameraAt(storyAt(frame/60));expect(Math.abs(c.x-last.x)).toBeLessThan(30);expect(Math.abs(c.y-last.y)).toBeLessThan(30);expect(Math.abs(c.scale-last.scale)).toBeLessThan(.045);last=c;
 }
 const h=.00001;for(const t of [20.15,20.65,21.15])expect(Math.abs((storyAt(t+h)-storyAt(t))/h-(storyAt(t)-storyAt(t-h))/h)).toBeLessThan(.001);
});
it('keeps the publish target readable during the push rather than sweeping it sharply across the frame',()=>{
 for(let t=37.2;t<39.6;t+=1/60){const a=cameraAt(t),b=cameraAt(t+1/60);
  const movement=Math.hypot((1450-b.x)*b.scale-(1450-a.x)*a.scale,(850-b.y)*b.scale-(850-a.y)*a.scale);
  expect(movement).toBeLessThan(12);
 }
});
