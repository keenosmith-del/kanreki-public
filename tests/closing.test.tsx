import {describe,it,expect,vi} from 'vitest';
import {fireEvent,render,within} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import {Home} from '../src/pages/Home';

describe('approved closing account controls',()=>{
  it('requires complete played coverage, reveals once at native wrap and retains both links',()=>{
    const {container}=render(<MemoryRouter><Home/></MemoryRouter>);
    const closing=container.querySelector('#closing')! as HTMLElement;
    const actions=closing.querySelector('.closing-account-actions')!;
    const video=closing.querySelector('video')!;
    Object.defineProperty(video,'duration',{value:52});
    Object.defineProperty(video,'currentTime',{writable:true,value:51.8});
    expect(actions.getAttribute('aria-hidden')).toBe('true');
    expect([...actions.querySelectorAll('a')].every(a=>a.tabIndex===-1)).toBe(true);
    fireEvent.timeUpdate(video);video.currentTime=.1;fireEvent.timeUpdate(video);
    expect(actions.getAttribute('aria-hidden')).toBe('true');
    Object.defineProperty(video,'played',{value:{length:1,start:()=>0,end:()=>52}});
    video.currentTime=51.8;fireEvent.timeUpdate(video);video.currentTime=.1;fireEvent.seeked(video);
    expect(actions.getAttribute('aria-hidden')).toBe('false');
    expect(within(closing).getByRole('link',{name:'sign in'}).getAttribute('href')).toBe('/sign-in');
    expect(within(closing).getByRole('link',{name:'create account'}).getAttribute('href')).toBe('/create-account');
    expect(actions.closest('[data-media-slot]')).toBeNull();
    video.currentTime=10;fireEvent.timeUpdate(video);
    expect(actions.getAttribute('aria-hidden')).toBe('false');
  });
  it('reveals immediately when playback fails',()=>{
    const {container}=render(<MemoryRouter><Home/></MemoryRouter>);
    fireEvent.error(container.querySelector('#closing video')!);
    expect(container.querySelector('.closing-account-actions')?.getAttribute('aria-hidden')).toBe('false');
  });
  it('uses the closing poster with accessible account links on small screens',()=>{
    const mm=vi.spyOn(window,'matchMedia').mockImplementation(query=>({matches:query.includes('max-width'),addEventListener:vi.fn(),removeEventListener:vi.fn()}) as unknown as MediaQueryList);
    const {container}=render(<MemoryRouter><Home/></MemoryRouter>);
    expect(container.querySelector('#closing video')).toBeNull();
    expect(container.querySelector('#closing img')?.getAttribute('src')).toBe('/media/kanreki-community-mobile.png');
    expect(container.querySelector('.closing-account-actions')?.getAttribute('aria-hidden')).toBe('false');
    mm.mockRestore();
  });
});
