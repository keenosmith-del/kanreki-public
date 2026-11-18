import emailjs from '@emailjs/browser';
export type EnquiryFields={name:string;email:string;message:string};
export type EnquiryErrors=Partial<Record<keyof EnquiryFields,string>>;
export const limits={name:100,email:254,message:3000};
export const contactConfigured=Boolean(import.meta.env.VITE_EMAILJS_SERVICE_ID&&import.meta.env.VITE_EMAILJS_TEMPLATE_ID&&import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
export const failure='your enquiry could not be sent. please try again.';
export function validateEnquiry(fields:EnquiryFields):EnquiryErrors{
 const errors:EnquiryErrors={};
 if(!fields.name.trim())errors.name='Please enter your name.';else if(fields.name.trim().length>100)errors.name='Please use a shorter name.';
 if(!fields.email.trim())errors.email='Please enter your email address.';else if(fields.email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))errors.email='Enter a valid email address.';
 if(!fields.message.trim())errors.message='Please enter a message.';else if(fields.message.trim().length<10)errors.message='Please add a little more detail.';else if(fields.message.length>3000)errors.message='Please keep your message within 3,000 characters.';
 return errors;
}
// The existing shared template body uses name/email; retain kailor's five API fields too.
let pending=false,lastAttempt=0;
export async function sendEnquiry(fields:EnquiryFields,honeypot=''){
 if(Object.keys(validateEnquiry(fields)).length||honeypot)throw Error(failure);
 if(!contactConfigured)throw Error('enquiry delivery is not configured yet. please try again once contact access is available.');
 if(pending||Date.now()-lastAttempt<10000)throw Error('please wait a moment before sending another enquiry.');
 pending=true;lastAttempt=Date.now();
 try{
  const receipt=await emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID,import.meta.env.VITE_EMAILJS_TEMPLATE_ID,{from_name:fields.name.trim(),reply_to:fields.email.trim(),name:fields.name.trim(),email:fields.email.trim(),form_type:'contact',subject:'kanreki website enquiry',message:fields.message.trim()},{publicKey:import.meta.env.VITE_EMAILJS_PUBLIC_KEY});
  if(!Number.isInteger(receipt?.status)||receipt.status<200||receipt.status>=300)throw Error(failure);
 }catch{throw Error(failure)}finally{pending=false;}
}
