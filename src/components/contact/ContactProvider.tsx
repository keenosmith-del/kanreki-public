import {createContext,useContext,useState,useRef,useEffect,type ReactNode,type FormEvent,type MouseEvent} from 'react';
import {SurfaceDialog} from './SurfaceDialog';
import {sendEnquiry,validateEnquiry,type EnquiryFields,type EnquiryErrors} from '../../services/enquiries';
import './contact.css';
const ContactContext=createContext<(trigger?:HTMLElement)=>void>(()=>{});
export const useContact=()=>useContext(ContactContext);
export function ContactLink({children,className=''}:{children:ReactNode;className?:string}){
 const open=useContact();return <a href="/contact" className={className} aria-haspopup="dialog" onClick={(e:MouseEvent<HTMLAnchorElement>)=>{if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();open(e.currentTarget)}}>{children}</a>;
}
function EnquiryDialog({onClose,onSent,restoreTo}:{onClose:()=>void;onSent:()=>void;restoreTo:HTMLElement|null}){
 const [fields,setFields]=useState<EnquiryFields>({name:'',email:'',message:''}),[errors,setErrors]=useState<EnquiryErrors>({}),[sending,setSending]=useState(false),[sendError,setSendError]=useState(''),pending=useRef(false),mounted=useRef(true),trap=useRef<HTMLInputElement>(null);
 useEffect(()=>{mounted.current=true;return()=>{mounted.current=false}},[]);
 async function submit(e:FormEvent){e.preventDefault();if(pending.current)return;const invalid=validateEnquiry(fields);setErrors(invalid);const field=(['name','email','message'] as const).find(key=>invalid[key]);if(field){document.getElementById('enquiry-'+field)?.focus();return}pending.current=true;setSending(true);setSendError('');try{await sendEnquiry(fields,trap.current?.value);if(mounted.current)onSent()}catch(e){if(mounted.current)setSendError(e instanceof Error?e.message:'your enquiry could not be sent. please try again.')}finally{pending.current=false;if(mounted.current)setSending(false)}}
 return <SurfaceDialog onClose={onClose} busy={sending} restoreTo={restoreTo}>{close=><form className="enquiry-form" onSubmit={submit} noValidate aria-busy={sending}>
 {(['name','email','message'] as const).map(field=><div className="enquiry-field" key={field}><label htmlFor={'enquiry-'+field}>{field==='email'?'email address':field}</label>{field==='message'?<textarea id={'enquiry-'+field} name={field} required maxLength={3000} placeholder="tell us a little about your enquiry..." value={fields[field]} disabled={sending} aria-invalid={!!errors[field]} aria-describedby={errors[field]?'enquiry-'+field+'-error':undefined} onChange={e=>{setFields({...fields,[field]:e.target.value});setErrors({...errors,[field]:undefined})}}/>:<input id={'enquiry-'+field} name={field} type={field==='email'?'email':'text'} autoComplete={field} required maxLength={field==='email'?254:100} placeholder={field==='name'?'your name':'you@example.com'} value={fields[field]} disabled={sending} aria-invalid={!!errors[field]} aria-describedby={errors[field]?'enquiry-'+field+'-error':undefined} onChange={e=>{setFields({...fields,[field]:e.target.value});setErrors({...errors,[field]:undefined})}}/>}{errors[field]&&<p className="enquiry-error" id={'enquiry-'+field+'-error'} role="alert">{errors[field]}</p>}</div>)}
 <div hidden aria-hidden="true"><label>leave this field empty<input ref={trap} name="company-website" tabIndex={-1} autoComplete="off"/></label></div>
 {sendError&&<p className="enquiry-error" role="alert">{sendError}</p>}
 <div className="enquiry-actions"><button className="enquiry-send" type="submit" disabled={sending}>{sending?'sending…':'send'}<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button><button className="enquiry-cancel" type="button" disabled={sending} onClick={close}>cancel</button></div>
 </form>}</SurfaceDialog>;
}
export function ContactProvider({children}:{children:ReactNode}){
 const [open,setOpen]=useState(false),[toast,setToast]=useState(''),trigger=useRef<HTMLElement|null>(null);
 useEffect(()=>{if(!toast)return;const timer=setTimeout(()=>setToast(''),4500);return()=>clearTimeout(timer)},[toast]);
 return <ContactContext.Provider value={target=>{trigger.current=target??document.activeElement as HTMLElement;setToast('');setOpen(true)}}>{children}{open&&<EnquiryDialog restoreTo={trigger.current} onClose={()=>setOpen(false)} onSent={()=>{setOpen(false);setToast('your enquiry has been sent.')}}/>}<div className="enquiry-toast-position" role="status" aria-live="polite">{toast&&<div className="enquiry-toast">{toast}</div>}</div></ContactContext.Provider>;
}
