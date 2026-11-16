import {expect,it} from 'vitest';
import {render,screen} from '@testing-library/react';
import {RichBody} from '../film/src/workspace';
import {body,stateAt,presentationAt} from '../film/src/timeline';
it('preserves the post wording while applying bold and the embedded design reference',()=>{
 const state=stateAt(Math.round(presentationAt(37.5)*60));
 const {container}=render(<RichBody text={body} s={state}/>);
 expect(container.textContent).toBe(body);
 const link=screen.getByRole('link',{name:'easier to understand'});expect(link.getAttribute('href')).toBe('https://www.w3.org/WAI/tips/designing/');
 for(const phrase of ['main action','Nothing dramatic changed'])expect(screen.getByText(phrase).style.fontWeight).toBe('600');
});
it('keeps the written link unformatted until the insert-link action completes',()=>{
 const state=stateAt(Math.round(presentationAt(35.9)*60));render(<RichBody text={body} s={state}/>);expect(screen.queryByRole('link')).toBeNull();expect(state.attached).toBe(1);expect(state.bold).toBe(true);expect(state.linkPicker).toBeGreaterThan(0);
});
