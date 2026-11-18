import {describe,it,expect,vi,beforeEach,afterEach} from 'vitest';
import emailjs from '@emailjs/browser';
vi.mock('@emailjs/browser',()=>({default:{send:vi.fn()}}));
const fields={name:'Demo Reader',email:'reader@example.test',message:'Please tell me about future access.'};
beforeEach(()=>{vi.resetModules();vi.mocked(emailjs.send).mockReset();for(const key of ['SERVICE_ID','TEMPLATE_ID','PUBLIC_KEY'])vi.stubEnv('VITE_EMAILJS_'+key,'mock-'+key);});
afterEach(()=>vi.unstubAllEnvs());
describe('shared EmailJS delivery',()=>{
 it('rejects missing configuration without a request or success',async()=>{vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY','');const {sendEnquiry,contactConfigured}=await import('../src/services/enquiries');expect(contactConfigured).toBe(false);await expect(sendEnquiry(fields)).rejects.toThrow('not configured');expect(emailjs.send).not.toHaveBeenCalled();});
 it('uses the approved shared public identifiers and privacy-safe template fields',async()=>{vi.mocked(emailjs.send).mockResolvedValue({status:200,text:'OK'});const {sendEnquiry}=await import('../src/services/enquiries');await sendEnquiry(fields);expect(emailjs.send).toHaveBeenCalledWith('mock-SERVICE_ID','mock-TEMPLATE_ID',{from_name:fields.name,reply_to:fields.email,name:fields.name,email:fields.email,form_type:'contact',subject:'kanreki website enquiry',message:fields.message},{publicKey:'mock-PUBLIC_KEY'});});
 it.each([400,429,500,undefined])('rejects unsuccessful receipt %s',async status=>{vi.mocked(emailjs.send).mockResolvedValue({status,text:'failed'} as never);const {sendEnquiry}=await import('../src/services/enquiries');await expect(sendEnquiry(fields)).rejects.toThrow('could not be sent');});
 it('handles a network failure honestly',async()=>{vi.mocked(emailjs.send).mockRejectedValue(Error('network'));const {sendEnquiry}=await import('../src/services/enquiries');await expect(sendEnquiry(fields)).rejects.toThrow('could not be sent');});
 it('blocks concurrent sends and a rapid retry without storing tracking data',async()=>{let resolve!:(value:{status:number;text:string})=>void;vi.mocked(emailjs.send).mockReturnValue(new Promise(r=>resolve=r));const {sendEnquiry}=await import('../src/services/enquiries');const first=sendEnquiry(fields);await expect(sendEnquiry(fields)).rejects.toThrow('wait');resolve({status:200,text:'OK'});await first;await expect(sendEnquiry(fields)).rejects.toThrow('wait');expect(emailjs.send).toHaveBeenCalledTimes(1);expect(localStorage.length).toBe(0);});
 it('validates lengths, minimum detail, email and honeypot before transmission',async()=>{const {validateEnquiry,sendEnquiry}=await import('../src/services/enquiries');for(const value of [{...fields,name:''},{...fields,name:'x'.repeat(101)},{...fields,email:'invalid'},{...fields,email:'x'.repeat(255)+'@test.org'},{...fields,message:'short'},{...fields,message:'x'.repeat(3001)}]){expect(Object.keys(validateEnquiry(value)).length).toBeGreaterThan(0);await expect(sendEnquiry(value)).rejects.toThrow();}await expect(sendEnquiry(fields,'bot')).rejects.toThrow();expect(emailjs.send).not.toHaveBeenCalled();});
});

it('retains kailor parameter names and the dashboard-verified legacy name/email aliases',async()=>{
 const {readFile}=await import('node:fs/promises');const reference=JSON.parse(await readFile('tests/fixtures/kailor-contact/source.json','utf8'));
 expect(reference.templateParameters).toEqual(['from_name','reply_to','form_type','subject','message']);
 vi.mocked(emailjs.send).mockResolvedValue({status:200,text:'OK'});const {sendEnquiry}=await import('../src/services/enquiries');await sendEnquiry(fields);const params=vi.mocked(emailjs.send).mock.calls[0][2];expect(Object.keys(params!).sort()).toEqual(['email','form_type','from_name','message','name','reply_to','subject']);expect(params!.subject).toBe('kanreki website enquiry');
});
