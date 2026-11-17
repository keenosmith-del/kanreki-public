import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { App } from '../src/App';
import { canonical, origin, pages, structuredData } from '../src/seo';
import { MediaSlot, type MediaSpec } from '../src/components/MediaSlot';
function mount(path='/') {return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);}
describe('public routes and navigation',()=>{
  it.each([['/','kanreki.'],['/about','A place for'],['/contact','Let’s talk.'],['/privacy','privacy'],['/terms','terms'],['/cookies','cookies'],['/unknown','This page isn’t here.'],['/api/users','This page isn’t here.']])('renders %s', (path,heading)=>{
    mount(path); expect(screen.getByRole('heading',{level:1}).textContent).toContain(heading);
  });
  it('preserves six sections with the three approved films integrated',()=>{
    const {container}=mount(); expect(container.querySelectorAll('.cinema-home>section')).toHaveLength(6);expect(container.querySelectorAll('[data-media-slot]')).toHaveLength(6);expect(container.querySelectorAll('.cinema-editorial:not(#profiles):not(#drafting) video,.cinema-editorial:not(#profiles):not(#drafting) img')).toHaveLength(0);
    const profileFilm=container.querySelector('#profiles video')! as HTMLVideoElement;expect(profileFilm.loop).toBe(true);expect(profileFilm.muted).toBe(true);expect(profileFilm.querySelector('source')?.getAttribute('src')).toBe('/media/kanreki-profiles-r03.mp4');expect(screen.getByRole('heading',{name:'profiles and feed interactions'})).toBeTruthy();
    const drafting=container.querySelector('#drafting')!;
    const draftingFilm=drafting.querySelector('video')! as HTMLVideoElement;
    expect(draftingFilm.querySelector('source')?.getAttribute('src')).toBe('/media/kanreki-drafting.mp4');
    expect(draftingFilm.loop&&draftingFilm.muted&&draftingFilm.playsInline).toBe(true);
    expect(drafting.classList.contains('cinema-editorial--media-left')).toBe(true);
    expect(within(drafting as HTMLElement).getByRole('heading',{name:'ai-assisted drafting and editing'})).toBeTruthy();
    expect(within(drafting as HTMLElement).getByRole('link',{name:'try it out'}).getAttribute('href')).toBe('/create-account');
    expect(within(drafting as HTMLElement).queryByText(/Planned feature/)).toBeNull();
    expect(screen.getByText(/Planned writing tools/)).toBeTruthy();
  });
  it('navigates, closes menu with Escape and restores focus',()=>{
    mount();const toggle=screen.getByRole('button',{name:'open menu'});fireEvent.click(toggle);expect(toggle.getAttribute('aria-expanded')).toBe('true');fireEvent.keyDown(document,{key:'Escape'});expect(document.activeElement).toBe(toggle);expect(screen.queryByRole('navigation',{name:'mobile navigation'})).toBeNull();
    fireEvent.click(toggle);fireEvent.click(within(screen.getByRole('navigation',{name:'mobile navigation'})).getByText('about'));expect(screen.getByRole('heading',{level:1}).textContent).toContain('A place for');expect(screen.queryByRole('navigation',{name:'mobile navigation'})).toBeNull();
  });
  it('opens real mail without a faux contact form',()=>{const {container}=mount('/contact');expect(screen.getByRole('link',{name:'keenosmith@kailor.co.za'}).getAttribute('href')).toMatch(/^mailto:/);expect(container.querySelector('form')).toBeNull();});
});
describe('kanreki identity',()=>{
  it('keeps all pages unindexed and identifies kanreki as the publisher',()=>{
    expect(Object.values(pages).every(page=>!page.index)).toBe(true);
    expect(canonical('/')).toBe(origin ? `${origin}/` : '');
    expect(canonical('/unknown')).toBe('');
    expect(structuredData['@graph'][0]).toMatchObject({publisher:{'@id':`${origin}/#organization`}});
    expect(structuredData['@graph'][1]).toMatchObject({name:'kanreki',foundingDate:'2020'});
  });
  it('uses the shared wordmark and establishment year',()=>{
    mount('/about');expect(screen.getByRole('link',{name:'kanreki.'}).textContent).toBe('kanreki.');
    expect(screen.getByText(/Established in 2020/)).toBeTruthy();
    expect(screen.getAllByRole('link',{name:'kailor'})[0].getAttribute('href')).toBe('https://kailor.co.za/');
  });
});
describe('unconditional access restrictions',()=>{
  it.each(['/sign-in','/create-account'])('cannot submit credentials at %s',path=>{
    const {container}=mount(path);expect(screen.getByText(/currently restricted/)).toBeTruthy();
    for(const input of container.querySelectorAll('input')) expect(input.matches(':disabled')).toBe(true);
    expect((container.querySelector('button[type=submit]') as HTMLButtonElement).disabled).toBe(true);
    const fetch=vi.spyOn(window,'fetch');fireEvent.submit(container.querySelector('form')!);expect(fetch).not.toHaveBeenCalled();fetch.mockRestore();
    expect(container.querySelector('form')?.getAttribute('action')).toBeNull();
  });
});
describe('future media lifecycle',()=>{
  const spec:MediaSpec={id:'introduction',label:'film pending',kind:'video',ratio:'16 / 9',alt:'intro',src:'/test.mp4',loop:true};
  it('renders fallback when no source exists',()=>{const {container}=render(<MediaSlot spec={{...spec,src:undefined}}/>);expect(screen.getByText('film pending')).toBeTruthy();expect(container.querySelector('video')).toBeNull();});
  it('keeps autoplay muted, inline, with native loop and without controls and never replays on a rerender',async()=>{
    const play=vi.spyOn(HTMLMediaElement.prototype,'play').mockResolvedValue();
    const {container,rerender}=render(<MediaSlot spec={spec}/>);const video=container.querySelector('video')!;
    expect(video.muted).toBe(true);expect(video.playsInline).toBe(true);expect(video.loop).toBe(true);expect(video.controls).toBe(false);
    fireEvent.loadedData(video);await waitFor(()=>expect(play).toHaveBeenCalledTimes(1));fireEvent.ended(video);rerender(<MediaSlot spec={{...spec}}/>);fireEvent.loadedData(video);expect(play).toHaveBeenCalledTimes(1);expect(container.querySelector('video')).toBe(video);play.mockRestore();
  });
  it('falls back on autoplay rejection and decoding failure',async()=>{
    const play=vi.spyOn(HTMLMediaElement.prototype,'play').mockRejectedValue(new Error('blocked'));
    const {container}=render(<MediaSlot spec={spec}/>);await act(async()=>fireEvent.loadedData(container.querySelector('video')!));expect(container.querySelector('video')).toBeNull();expect(screen.getByText('film pending').closest('[hidden]')).toBeNull();play.mockRestore();
  });
  it('uses static content for reduced motion',()=>{
    const mm=vi.spyOn(window,'matchMedia').mockReturnValue({matches:true,addEventListener:vi.fn(),removeEventListener:vi.fn()} as unknown as MediaQueryList);
    const {container}=render(<MediaSlot spec={spec}/>);expect(container.querySelector('video')).toBeNull();expect(screen.getByText('film pending')).toBeTruthy();mm.mockRestore();
  });
  it('falls back when video decoding fails',()=>{
    const {container}=render(<MediaSlot spec={spec}/>);fireEvent.error(container.querySelector('video')!);expect(container.querySelector('video')).toBeNull();expect(screen.getByText('film pending').closest('[hidden]')).toBeNull();
  });
  it('returns to the clean fallback when an image fails',()=>{
    const {container}=render(<MediaSlot spec={{...spec,kind:'image',src:'/test.webp'}}/>);fireEvent.error(container.querySelector('img')!);expect(container.querySelector('img')).toBeNull();expect(screen.getByText('film pending')).toBeTruthy();
  });
});
