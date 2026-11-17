import {expect,it} from 'vitest';
import {render} from '@testing-library/react';
import {stateAt,hoverAt,reply,cameraAt,FRAMES} from '../film/src/video2/timeline';
import {Gallery,EditorialPost,WorkspaceViews,image} from '../film/src/video2/components';
import {posts,profilePosts,galleryImages} from '../film/src/video2/content';
it('shows each distinct overlay only while the cursor is over its own image',()=>{
 for(const [time,index] of [[5.8,0],[7.7,1],[9.5,2]]){const s=stateAt(time*60);for(let i=0;i<3;i++)expect(hoverAt(s.t,i)).toBe(i===index?1:0)}
 const {container}=render(<Gallery s={stateAt(5.8*60)}/>);expect(container.querySelectorAll('img')).toHaveLength(3);expect(container.querySelectorAll('[data-gallery-overlay]')).toHaveLength(3);
});
it('persists engagement on the correct distinct posts and submits the complete comment',()=>{
 expect(new Set(posts.map(p=>p.id)).size).toBe(posts.length);
 const s=stateAt(32*60);expect(s.liked&&s.saved&&s.commented&&s.reposted).toBe(true);expect(s.replyText).toBe(reply);
 const {container}=render(<><EditorialPost post={posts[3]} index={3} s={s}/><EditorialPost post={posts[2]} index={2} s={s}/></>);
 expect(container.querySelector('[data-submitted-comment]')?.textContent).toContain(reply);
 expect(container.querySelector('[data-post-id="simple-approach"] [data-control="message"]')?.textContent).toBe('10');
 expect(container.querySelector('[data-post-id="visual-systems"] [data-control="bookmark"]')?.textContent).toBe('1');
});
it('matches the loop camera and avatar composition without cursor or feed leakage',()=>{
 const start=stateAt(0),end=stateAt(FRAMES-1);expect(start.feed).toBe(0);expect(end.feed).toBe(0);expect(end.posts).toBe(0);expect(start.cursorOpacity).toBe(0);expect(end.cursorOpacity).toBe(0);expect(cameraAt(end.t)).toEqual(cameraAt(0));
});
it('accelerates and stops its populated feed rather than using a constant scroll',()=>{
 const s=(t:number)=>stateAt(t*60).scroll;
 expect(s(21.2)).toBe(s(21.5));expect(s(23.4)).toBe(s(23.9));expect(s(27)).toBe(s(28));expect(s(30)-s(29.5)).toBeGreaterThan(s(19.5)-s(19));
});

it('reserves space for the compact reply while typing so the next article cannot cover it',()=>{
 const s=stateAt(27*60),{container}=render(<EditorialPost post={posts[3]} index={3} s={s}/>);
 expect(container.querySelector('article')?.style.height).toBe('450px');expect(container.querySelector('[data-comment-input]')).not.toBeNull();expect(s.commented).toBe(false);expect(s.replyText.length).toBeGreaterThan(0);
});

it('changes workspace views with opaque surfaces instead of ghosted text crossfades',()=>{
 const s=stateAt(Math.round(17.5*60));
 const {container}=render(<WorkspaceViews s={s}/>);
 for(const selector of ['[data-profile-page]','[data-feed-page]','[data-gallery-page]','[data-posts-page]']){
  const el=container.querySelector(selector) as HTMLElement;
  expect(el.style.opacity).toBe('');expect(el.style.background).toBe('rgb(255, 255, 255)');
 }
 expect(container.querySelector('[data-view-stage]')?.getAttribute('style')).toContain('overflow: hidden');
});
it('replaces the reply field after submission without overlapping it with the posted reply',()=>{
 const {container}=render(<EditorialPost post={posts[3]} index={3} s={stateAt(28.85*60)}/>);
 expect(container.querySelector('[data-comment-input]')).toBeNull();expect(container.querySelector('[data-submitted-comment]')).not.toBeNull();
});

it('keeps the outgoing and incoming page edges aligned during navigation',()=>{
 const {container}=render(<WorkspaceViews s={stateAt(Math.round(17.6*60))}/>);
 const a=container.querySelector('[data-profile-page]') as HTMLElement,b=container.querySelector('[data-feed-page]') as HTMLElement;
 const x=(el:HTMLElement)=>Number(el.style.transform.match(/translateX\(([-.\d]+)px\)/)![1]);
 expect(x(a)+1426).toBeCloseTo(x(b));expect(a.style.overflow).toBe('hidden');expect(b.style.overflow).toBe('hidden');
});

it('uses a separate image for every gallery, profile article and feed article',()=>{
 const paths=[...galleryImages,...profilePosts.map(p=>p.image),...posts.map(p=>p.image)].map(image);
 expect(paths).toHaveLength(12);expect(new Set(paths).size).toBe(paths.length);
 expect(profilePosts.every(profile=>posts.every(feed=>feed.id!==profile.id))).toBe(true);
});
it('keeps the final feed populated after moving the repost stop to the sixth unique article',()=>{
 for(const time of [31.8,33.6,37.9]){const state=stateAt(time*60);expect(posts.length*340+110-state.scroll).toBeGreaterThanOrEqual(580)}
 const state=stateAt(32*60),{container}=render(<EditorialPost post={posts[5]} index={5} s={state}/>);
 expect(container.querySelector('[data-reposted]')?.getAttribute('data-reposted')).toBe('true');
 expect(container.querySelector('[data-control="repost"]')?.textContent).toBe(String(posts[5].reposts+1));
});
