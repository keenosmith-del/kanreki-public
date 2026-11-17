import {expect,it} from 'vitest';
import {render} from '@testing-library/react';
import {stateAt,cameraAt,FRAMES} from '../film/src/video3/timeline';
import {initialParagraphs,finalParagraphs,prompt,articleTitle,paragraphRemainder,firstSuggestion,refreshedSuggestion,shorterSuggestion} from '../film/src/video3/content';
import {PublishedFeed,DocumentHeader} from '../film/src/video3/components';
it('types the requested prompt and completes a real three-paragraph draft before editing',()=>{
 expect(stateAt(7*60).promptText.length).toBeGreaterThan(25);expect(stateAt(7*60).promptText.length).toBeLessThan(prompt.length);expect(stateAt(9.2*60).promptText).toBe(prompt);
 expect(stateAt(12*60).paragraphs[0].length).toBeGreaterThan(0);expect(stateAt(12*60).paragraphs[0]).not.toBe(initialParagraphs[0]);expect(stateAt(15.6*60).paragraphs).toEqual(initialParagraphs);
});
it('refreshes a distinct suggestion and replaces only the selected passage',()=>{
 expect(stateAt(18*60).suggestion).toBe(firstSuggestion);expect(stateAt(21*60).suggestion).toBe(refreshedSuggestion);expect(firstSuggestion).not.toBe(refreshedSuggestion);
 const revised=stateAt(22.7*60);expect(revised.paragraphs[0]).toBe(initialParagraphs[0]);expect(revised.paragraphs[1]).toBe(refreshedSuggestion+' '+paragraphRemainder);expect(revised.paragraphs[2]).toBe(initialParagraphs[2]);
 const shortened=stateAt(26.4*60);expect(shortened.paragraphs).toEqual(finalParagraphs);expect(shortened.paragraphs[2]).toBe(shorterSuggestion);
});
it('retains the accepted revisions, formatting and inserted image in preview and publication',()=>{
 for(const time of [33.5,35.8,40.2]){const s=stateAt(time*60);expect(s.title).toBe(articleTitle);expect(s.paragraphs).toEqual(finalParagraphs);expect(s.bold).toBe(true);expect(s.image).toBe(1)}
 expect(stateAt(40*60).published).toBe(true);
});
it('publishes the same article above two distinct established posts with three circular supplied thumbnails',()=>{
 const {container}=render(<PublishedFeed s={stateAt(40.2*60)}/>);const posts=container.querySelectorAll('[data-feed-post]');expect(posts).toHaveLength(3);expect(posts[0].querySelector('h2')?.textContent).toBe(articleTitle);expect(posts[0].textContent).toContain('just now');
 const images=Array.from(container.querySelectorAll('[data-feed-post]>img')) as HTMLImageElement[];expect(images.map(i=>i.getAttribute('src'))).toEqual(['/film/assets/new-post-image.png','/film/assets/feed-existing-1.png','/film/assets/feed-existing-2.png']);for(const img of images)expect(img.style.borderRadius).toBe('50%');expect(container.textContent).toContain('post shared');
});
it('returns to the opening composer state and matching camera for a seamless 46-second loop',()=>{
 const start=stateAt(0),end=stateAt(FRAMES-1);expect(FRAMES).toBe(2760);expect(end.promptText).toBe(start.promptText);expect(end.toOpening).toBe(1);expect(start.cursorOpacity).toBe(0);expect(end.cursorOpacity).toBe(0);expect(cameraAt(end.t)).toEqual(cameraAt(start.t));
});

it('updates the reader metadata after publication instead of leaving a not-published label',()=>{
 const {container}=render(<DocumentHeader s={stateAt(37.8*60)}/>);expect(container.textContent).toContain('published · just now');expect(container.textContent).not.toContain('not published');
});
