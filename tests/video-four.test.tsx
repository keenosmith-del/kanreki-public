import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {stateAt,cameraAt,FPS,FRAMES} from '../film/src/video4/timeline';
import {Feed,ReadingView} from '../film/src/video4/components';
import {posts,article,userComment} from '../film/src/video4/content';
const at=(t:number)=>stateAt(t*FPS);
describe('Video 4 reading and discussion continuity',()=>{
 it('maps four distinct supplied posts to their matching authors and opens only the third',()=>{
  expect(posts.map(p=>p.image)).toEqual(['post1','post2','post3','post4']);expect(posts.map(p=>p.author)).toEqual(['author1','author2','author3','author4']);expect(article).toBe(posts[2]);
  const feed=renderToStaticMarkup(<Feed s={at(8)}/>),reader=renderToStaticMarkup(<ReadingView s={at(12)}/>);
  expect(feed).toContain(article.title);expect(reader).toContain(article.title);expect(reader).toContain('post-3.png');expect(reader).toContain('author-3.png');expect(feed.match(/data-feed-thumbnail/g)).toHaveLength(4);expect(feed.match(/border-radius:50%/g)!.length).toBeGreaterThanOrEqual(8);
 });
 it('increments two comment likes independently from article engagement',()=>{
  expect(at(22).commentLikes).toEqual([12,2,7]);expect(at(23).commentLikes).toEqual([13,2,7]);expect(at(26).commentLikes).toEqual([13,3,7]);expect(at(26).articleLikes).toBe(67);expect(at(30).articleLikes).toBe(68);expect(at(30).articleReposts).toBe(4);expect(at(32).articleReposts).toBe(5);expect(at(32).toast).toBeGreaterThan(.9);
 });
 it('types then inserts one matching comment without overwriting the existing discussion',()=>{
  expect(at(35).commentText.length).toBeGreaterThan(0);expect(at(35).commentText.length).toBeLessThan(userComment.length);expect(at(37.9).commentText).toBe(userComment);expect(at(37.9).articleComments).toBe(9);expect(at(38.2).articleComments).toBe(10);
  const view=renderToStaticMarkup(<ReadingView s={at(38.7)}/>);expect(view.match(/data-comment="/g)).toHaveLength(3);expect(view.match(/data-existing-reply/g)).toHaveLength(1);expect(view.match(/data-user-comment/g)).toHaveLength(1);expect(view).toContain(userComment);expect(at(38.7).commentLikes).toEqual([13,3,7]);expect(at(38.7).articleLiked&&at(38.7).reshared).toBe(true);
 });
 it('restores the previous feed position before returning to the exact opening composition',()=>{
  expect(at(39.7).feedScroll).toBeCloseTo(560,0);expect(at(40.7).feedScroll).toBeGreaterThan(0);const start=at(0),end=stateAt(FRAMES-1);expect(start.feedScroll).toBe(end.feedScroll);expect(start.open).toBe(end.open);expect(start.cursorOpacity).toBe(end.cursorOpacity);expect(cameraAt(0)).toEqual(cameraAt((FRAMES-1)/FPS));
 });
});
