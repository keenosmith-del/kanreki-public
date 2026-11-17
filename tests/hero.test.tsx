import {describe,it,expect,vi} from 'vitest';
import {render,fireEvent,waitFor} from '@testing-library/react';
import {MediaSlot,type MediaSpec} from '../src/components/MediaSlot';
import {media} from '../src/media';
import {stateAt,title,body,FRAMES,presentationAt,storyAt} from '../film/src/timeline';
const spec:MediaSpec={id:'introduction',label:'film',kind:'video',ratio:'16 / 9',alt:'intro',src:'/test.mp4',loop:true};
describe('hero first playback cycle',()=>{
  it('keeps account access hidden until playback wraps, reports once, and keeps the same video',async()=>{
    const play=vi.spyOn(HTMLMediaElement.prototype,'play').mockResolvedValue();
    const finish=vi.fn(),fallback=vi.fn();
    const {container,rerender}=render(<MediaSlot spec={spec} onFirstCycle={finish} onFallback={fallback}/>);
    const video=container.querySelector('video')!;
    Object.defineProperty(video,'duration',{configurable:true,value:72});
    Object.defineProperty(video,'currentTime',{configurable:true,writable:true,value:0});
    fireEvent.loadedData(video);await waitFor(()=>expect(play).toHaveBeenCalledOnce());
    video.currentTime=35;fireEvent.timeUpdate(video);expect(finish).not.toHaveBeenCalled();
    video.currentTime=71.8;fireEvent.timeUpdate(video);expect(finish).not.toHaveBeenCalled();
    video.currentTime=.1;fireEvent.timeUpdate(video);expect(finish).toHaveBeenCalledOnce();
    rerender(<MediaSlot spec={{...spec}} onFirstCycle={finish} onFallback={fallback}/>);
    expect(container.querySelector('video')).toBe(video);fireEvent.loadedData(video);
    video.currentTime=71.8;fireEvent.timeUpdate(video);video.currentTime=.1;fireEvent.timeUpdate(video);
    expect(finish).toHaveBeenCalledOnce();expect(play).toHaveBeenCalledOnce();expect(fallback).not.toHaveBeenCalled();play.mockRestore();
  });
  it('does not count seeking backwards as playback completion',()=>{
    const finish=vi.fn();const {container}=render(<MediaSlot spec={spec} onFirstCycle={finish}/>);
    const video=container.querySelector('video')!;Object.defineProperty(video,'duration',{value:72});
    Object.defineProperty(video,'currentTime',{writable:true,value:71});fireEvent.timeUpdate(video);
    video.currentTime=0;fireEvent.seeked(video);fireEvent.timeUpdate(video);expect(finish).not.toHaveBeenCalled();
  });
  it('reveals immediately on rejected autoplay',async()=>{
    const play=vi.spyOn(HTMLMediaElement.prototype,'play').mockRejectedValue(Error('blocked'));
    const fallback=vi.fn();const {container}=render(<MediaSlot spec={spec} onFallback={fallback}/>);
    fireEvent.loadedData(container.querySelector('video')!);await waitFor(()=>expect(fallback).toHaveBeenCalledOnce());play.mockRestore();
  });
  it('preserves the hero and keeps the three feature films active',()=>{
    expect(media.introduction.loop).toBe(true);
    expect(media.introduction.src).toBe('/media/kanreki-hero.mp4');expect(media.feed.src).toBe('/media/kanreki-profiles-r03.mp4');expect(media.feed.loop).toBe(true);expect(media.profile.src).toBe('/media/kanreki-reading.mp4');expect(media.social.src).toBe('/media/kanreki-drafting.mp4');expect(media.writing).not.toHaveProperty('src');expect(media.closing).not.toHaveProperty('src');
    expect(media.social.loop).toBe(true);expect(media.writing.loop).toBe(true);expect(media.closing.loop).toBe(true);
  });
});
describe('publishing timeline',()=>{
  it('can seek into typing and engagement without prior frames',()=>{
    const middle=stateAt(Math.round(presentationAt(30)*60));expect(middle.titleText).toBe(title);expect(middle.bodyText.length).toBeGreaterThan(0);expect(middle.bodyText.length).toBeLessThan(body.length);
    const published=stateAt(Math.round(presentationAt(39.5)*60));expect(published.bodyText).toBe(body);expect(published.titleText).toBe(title);expect(published.likes).toBe(0);expect(published.comments).toBe(0);expect(published.shares).toBe(0);
    expect(stateAt(Math.round(presentationAt(44.5)*60)).likes).toBeGreaterThanOrEqual(43);
    expect(stateAt(Math.round(presentationAt(47)*60))).toMatchObject({likes:64,comments:2,shares:2,saved:true,unread:true});
    expect(stateAt(FRAMES-1).t).toBeCloseTo(52.983333);expect(FRAMES).toBe(3600);expect(presentationAt(13)).toBeGreaterThan(19);expect(storyAt(40)-storyAt(39)).toBe(1);expect(stateAt(0).workspace).toBe(0);
  });
});
