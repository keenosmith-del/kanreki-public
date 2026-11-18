import {it,expect} from 'vitest';
import {render,screen,fireEvent} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import {App} from '../src/App';
function mount(path:string){return render(<MemoryRouter initialEntries={[path]}><App/></MemoryRouter>);}
it('publishes owner-authorized notices with a working privacy contact action',()=>{
 const {container}=mount('/privacy');expect(container.querySelector('.review-notice')).toBeNull();expect(screen.getByText('Effective date: 18 November 2026.')).toBeTruthy();expect(screen.getByText(/Keeno Smith in his personal capacity/)).toBeTruthy();expect(screen.getByText(/newly adopted manual process/)).toBeTruthy();expect(container.textContent).toContain('12 months after the last relevant correspondence');expect(container.textContent).toContain('reviewed quarterly');expect(container.textContent).not.toMatch(/Pty Ltd|registration number|legally approved|automated deletion is implemented/);fireEvent.click(screen.getByRole('link',{name:'contact the team'}));expect(screen.getByRole('dialog',{name:'your enquiry'})).toBeTruthy();
});
it('distinguishes application storage from conditional hosting cookies',()=>{
 const {container}=mount('/cookies');expect(container.querySelector('.review-notice')).toBeNull();expect(container.textContent).toContain('not a guarantee about every hosting security response');expect(container.textContent).toContain('cf_clearance');expect(container.textContent).toContain('does not offer an optional-cookie consent banner');
});
it('keeps public website terms separate from future application accounts',()=>{
 const {container}=mount('/terms');expect(container.textContent).toContain('do not replace those terms or authorize access');expect(container.textContent).toContain('South African law applies');expect(container.querySelector('.review-notice')).toBeNull();
});
