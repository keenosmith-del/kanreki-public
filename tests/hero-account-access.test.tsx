import {expect,it,vi} from 'vitest';
import {render,fireEvent,waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import {Home} from '../src/pages/Home';
vi.mock('../src/media',async importOriginal=>{
 const original=await importOriginal<typeof import('../src/media')>();
 return {...original,media:{...original.media,introduction:{...original.media.introduction,src:'/media/kanreki-hero.mp4',poster:undefined,mobilePoster:undefined}}};
});
it('reveals one account-access action after native loop completion and keeps the playing video',async()=>{
 const play=vi.spyOn(HTMLMediaElement.prototype,'play').mockResolvedValue();
 const {container,rerender}=render(<MemoryRouter><Home/></MemoryRouter>);
 const actions=container.querySelector('.hero-account-actions')!;
 const video=container.querySelector('video')!;
 expect(actions.getAttribute('aria-hidden')).toBe('true');expect(actions.querySelector('a')?.tabIndex).toBe(-1);
 Object.defineProperty(video,'duration',{configurable:true,value:60});Object.defineProperty(video,'currentTime',{configurable:true,writable:true,value:0});
 fireEvent.loadedData(video);await waitFor(()=>expect(play).toHaveBeenCalledOnce());
 video.currentTime=59.8;fireEvent.timeUpdate(video);expect(actions.getAttribute('aria-hidden')).toBe('true');
 Object.defineProperty(video,'played',{configurable:true,value:{length:1,start:()=>0,end:()=>60}});
 video.currentTime=.05;fireEvent.seeked(video);
 expect(actions.getAttribute('aria-hidden')).toBe('false');
 expect(actions.querySelectorAll('a')).toHaveLength(1);expect(actions.querySelector('a')?.textContent).toBe('account access');expect(actions.querySelector('a')?.getAttribute('href')).toBe('/create-account');expect(actions.querySelector('a')?.tabIndex).toBe(0);
 rerender(<MemoryRouter><Home/></MemoryRouter>);expect(container.querySelector('video')).toBe(video);expect(actions.getAttribute('aria-hidden')).toBe('false');expect(play).toHaveBeenCalledOnce();play.mockRestore();
});
