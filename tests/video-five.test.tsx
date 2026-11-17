import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {stateAt,pagesAt,cameraAt,FPS,FRAMES,transitions} from '../film/src/video5/timeline';
import {PageContent,Article,Saved,SearchField} from '../film/src/video5/components';
import {article,results,query,creators,gallery,olderSaved} from '../film/src/video5/content';
const at=(t:number)=>stateAt(t*FPS);
describe('Video 5 search and saved continuity',()=>{
 it('types one relevant query and retains it across every result category',()=>{
  expect(at(2.5).queryText.length).toBeGreaterThan(0);expect(at(2.5).queryText.length).toBeLessThan(query.length);
  for(const t of [5.2,6.8,8.7,10.6,12.5,16,24,28])expect(at(t).queryText).toBe(query);
  expect([5.2,6.8,8.7,10.6,12.5].map(t=>at(t).category)).toEqual(['all','posts','images','people','posts']);
  expect(at(34).queryText).toBe('');
 });
 it('renders distinct post, image and people results using supplied assets',()=>{
  expect(new Set(results.map(p=>p.id)).size).toBe(4);expect(creators).toHaveLength(3);expect(gallery).toHaveLength(4);
  const posts=renderToStaticMarkup(<PageContent s={at(6.8)} page="posts"/>),images=renderToStaticMarkup(<PageContent s={at(8.7)} page="images"/>),people=renderToStaticMarkup(<PageContent s={at(10.6)} page="people"/>);
  expect(posts.match(/data-circular-thumbnail/g)).toHaveLength(4);expect(images).not.toContain('data-result-id');expect(images).toContain('data-image-grid');expect(people).toContain('data-people-results');
  for(let i=1;i<=4;i++)expect(images).toContain(`search-image-${i}.png`);for(let i=1;i<=3;i++)expect(people).toContain(`search-user-${i}.png`);
 });
 it('preserves the saved article across reader, collection and reopening',()=>{
  expect(at(17.6).saved).toBe(false);expect(at(17.9).saved).toBe(true);expect(at(18).toast).toBeGreaterThan(.9);
  for(const t of [18,24,28,31])expect(at(t).saved).toBe(true);
  const reader=renderToStaticMarkup(<Article s={at(28)}/>),collection=renderToStaticMarkup(<Saved s={at(24)}/>);
  expect(reader).toContain(article.title);expect(reader).toContain('search-post-1.png');expect(reader).toContain('data-bookmarked="true"');
  expect(collection.indexOf(article.id)).toBeLessThan(collection.indexOf(olderSaved[0].id));for(const p of [article,...olderSaved])expect(collection).toContain(p.title);
 });
 it('keeps moving pages adjacent and fully covers the content aperture without overlap',()=>{
  for(const transition of transitions)for(let i=1;i<20;i++){
   const q=pagesAt(transition.at+(transition.end-transition.at)*i/20),out=-q.direction*q.progress*1426,incoming=q.direction*(1-q.progress)*1426;
   const spans=[{start:Math.max(0,out),end:Math.min(1426,out+1426)},{start:Math.max(0,incoming),end:Math.min(1426,incoming+1426)}].sort((a,b)=>a.start-b.start);
   expect(spans[0].start).toBe(0);expect(spans[0].end).toBeCloseTo(spans[1].start,7);expect(spans[1].end).toBe(1426);
  }
 });
 it('has one predictable navigation state and returns to the opening composition',()=>{
  expect([at(0).navigation,at(5).navigation,at(23).navigation,at(34).navigation]).toEqual(['home','search','saved','home']);
  expect(cameraAt(0)).toEqual(cameraAt((FRAMES-1)/FPS));expect(at(0).cursorOpacity).toBe(stateAt(FRAMES-1).cursorOpacity);
  expect(renderToStaticMarkup(<SearchField s={at(0)}/>)).toBe(renderToStaticMarkup(<SearchField s={stateAt(FRAMES-1)}/>));
 });
});
