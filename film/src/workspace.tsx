import type { CSSProperties } from 'react';
import manifest from '../assets.json';
import { Avatar, Wordmark, Icon, Panel, Caret, asset, ink, muted, surface, type Person, type IconName } from './ui';
import { title, body, p, mix, likeEvents, type stateAt } from './timeline';
type State=ReturnType<typeof stateAt>;
export const postStyle:CSSProperties={background:'#fff',borderRadius:24};
function Author({person='primary',time='just now'}:{person?:Person;time?:string}) {
  return <div style={{display:'flex',alignItems:'center',gap:14,fontSize:20}}><Avatar person={person} size={42}/><span style={{fontWeight:500}}>{manifest[person].name}</span><span style={{color:muted,fontSize:17,marginLeft:9}}>{time}</span></div>;
}
export function NavigationRail({hideAvatar=false}:{hideAvatar?:boolean}) {
  const icons:IconName[]=['home','pen','compass','bookmark','heart'];
  return <div style={{position:'absolute',left:0,top:0,bottom:0,width:112,background:surface,borderRadius:'48px 0 0 48px',display:'flex',alignItems:'center',flexDirection:'column',paddingTop:42,gap:31}}>
    <div style={{opacity:hideAvatar?0:1,marginBottom:20}}><Avatar size={66}/></div>
    {icons.map((name,i)=><div key={name} style={{width:62,height:62,borderRadius:21,display:'grid',placeItems:'center',background:i===0?ink:'transparent',color:i===0?'#fff':ink}}><Icon name={name} size={28}/></div>)}
    <div style={{marginTop:'auto',paddingBottom:34}}><Icon name="settings"/></div>
  </div>;
}
function Indicator({name,s}:{name:'bell'|'message';s:State}) {
  return <div style={{position:'relative',width:48,height:48,display:'grid',placeItems:'center'}}><Icon name={name}/><span style={{position:'absolute',right:6,top:3,width:7,height:7,borderRadius:'50%',background:ink,transform:`scale(${s.unread?1.25:1})`}}/></div>;
}
export function Interactions({s,existing=false}:{s:State;existing?:boolean}) {
  const entries:[IconName,number][]=[['heart',existing?12:s.likes],['message',existing?3:s.comments],['share',existing?2:s.shares]];
  const pulse=existing?0:likeEvents.slice(1).reduce((n,[at])=>n+Math.sin(p(s.t,at,at+.3)*Math.PI),0);
  return <div data-post-interactions style={{display:'flex',alignItems:'center',gap:32,fontSize:19,color:muted,height:44}}>{entries.map(([name,count])=><span key={name} style={{display:'flex',alignItems:'center',gap:10,color:count>0?ink:muted}}><span style={{display:'flex',transform:`scale(${1+(name==='heart'?pulse*.09:0)})`}}><Icon name={name} size={25} filled={name==='heart'&&count>0}/></span><span style={{fontVariantNumeric:'tabular-nums'}}>{count}</span></span>)}<span style={{marginLeft:'auto',color:!existing&&s.saved?ink:muted,transform:`scale(${1+(!existing?Math.sin(p(s.t,46.6,46.85)*Math.PI)*.06:0)})`}}><Icon name="bookmark" filled={!existing&&s.saved} size={24}/></span></div>;
}
export function Comments({s}:{s:State}) {
  return <div style={{marginTop:22}}>{([
    ['contributor1',43.1,'Removing the extra decisions is usually what makes the difference.'],
    ['contributor2',44.8,'The search placement alone sounds like a big improvement.'],
  ] as const).map(([person,start,text])=><div key={person} style={{display:'flex',gap:16,marginTop:17,opacity:p(s.t,start,start+.35),transform:`translateY(${(1-p(s.t,start,start+.35))*14}px)`}}><Avatar person={person} size={41}/><div><div style={{fontSize:18,fontWeight:500,marginBottom:6}}>{manifest[person].name}<span style={{color:muted,fontWeight:400,marginLeft:15,fontSize:15}}>just now</span></div><div style={{fontSize:21,lineHeight:1.5}}>{text}</div></div></div>)}</div>;
}
export function PublishedPost({s}:{s:State}) {
  return <article style={{...postStyle,padding:'4px 0 10px'}}><Author/><h2 style={{fontSize:35,lineHeight:1.15,letterSpacing:'-1.5px',fontWeight:500,margin:'18px 0 12px',maxWidth:1030}}>{title}</h2><p style={{fontSize:22,lineHeight:1.5,margin:'0 0 20px',maxWidth:1160}}>{body}</p><div style={{color:muted,fontSize:16,marginBottom:20}}>1 min read · Software &amp; design</div><Interactions s={s}/><Comments s={s}/></article>;
}
function ExistingPost({s,second=false}:{s:State;second?:boolean}) {
  return <article style={{...postStyle,padding:'0 0 26px'}}><Author person={second?'contributor3':'contributor1'} time={second?'yesterday':'2 hours ago'}/><div style={{display:'flex',gap:35,alignItems:'center',marginTop:18}}><div style={{flex:1}}><h2 style={{fontSize:36,lineHeight:1.2,fontWeight:500,letterSpacing:'-1.2px',margin:'0 0 14px'}}>{second?'Building a brand that keeps showing up':'A quieter approach to launching something new'}</h2><p style={{fontSize:23,color:muted,lineHeight:1.55,margin:'0 0 20px'}}>{second?'The useful part of a visual identity is how well it works across the small, everyday things.':'A launch can start a conversation. The work that follows gives people a reason to return.'}</p><div style={{color:muted,fontSize:16}}>3 min read · {second?'Design & culture':'Ideas & business'}</div></div><img src={asset(second?'post2':'post1')} alt={second?'A brand built to operate in the field':'Launch like a field, not a firework'} style={{width:205,height:205,objectFit:'cover',objectPosition:'50% 45%',borderRadius:'50%',flexShrink:0}}/></div><div style={{marginTop:22}}><Interactions s={s} existing/></div></article>;
}
export function Workspace({s}:{s:State}) {
  const newPost=s.published;
  return <Panel style={{left:130,top:130,width:1660,height:860,opacity:s.workspace,overflow:'hidden'}}>
    <NavigationRail hideAvatar={s.t<16.15}/>
    <div style={{position:'absolute',left:172,top:42,right:62,display:'flex',alignItems:'center',justifyContent:'space-between'}}><Wordmark size={37}/><div style={{display:'flex',gap:17}}><Indicator name="message" s={s}/><Indicator name="bell" s={s}/></div></div>
    <div style={{position:'absolute',left:172,top:113,right:62}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{display:'flex',alignItems:'baseline',gap:29}}><span style={{fontSize:49,fontWeight:500,letterSpacing:'-2px'}}>for you</span><span style={{fontSize:22,color:muted}}>following</span></div><div style={{display:'flex',alignItems:'center',gap:12,padding:'16px 24px',borderRadius:50,background:ink,color:'#fff',fontSize:21,transform:`scale(${1-(s.t>22.9&&s.t<23.4?s.click:0)*.04})`}}><Icon name="pen" size={23}/>create post</div></div>
      <div style={{height:58,marginTop:25,marginBottom:32,borderRadius:40,background:surface,color:muted,display:'flex',gap:16,alignItems:'center',padding:'0 25px',fontSize:21}}><Icon name="search" size={24}/>search articles, photographs and people</div>
      <div data-feed-viewport style={{position:'relative',height:590,overflow:'hidden'}}>
        <div style={{transform:`translateY(${-p(s.t,44.8,47)*160}px)`}}>
          <div style={{height:newPost*560,overflow:'hidden',opacity:newPost}}><PublishedPost s={s}/></div>
          <div style={{paddingTop:newPost*26}}><ExistingPost s={s}/><div style={{marginTop:30}}><ExistingPost s={s} second/></div></div>
        </div>
      </div>
    </div>
  </Panel>;
}
function FormattingToolbar() {
  const groups: [IconName,string][][]=[
    [['bold','bold'],['italic','italic'],['underline','underline']],
    [['heading','text style'],['link','insert link']],
    [['list','bulleted list'],['align','text alignment'],['quote','quote']],
    [['image','add image']],
  ];
  return <div role="toolbar" aria-label="format post" style={{display:'flex',alignItems:'center',gap:18,marginTop:20,height:46,color:ink}}>{groups.map((group,i)=><div key={i} style={{display:'flex',gap:6,paddingRight:i<groups.length-1?18:0,borderRight:i<groups.length-1?'1px solid #e9e9eb':'none'}}>{group.map(([name,label])=><span key={name} role="button" aria-label={label} style={{width:36,height:36,display:'grid',placeItems:'center',borderRadius:10,background:name==='bold'?'#f7f7f7':'transparent'}}><Icon name={name} size={21}/></span>)}</div>)}</div>;
}
export function Composer({s}:{s:State}) {
  const collapse=p(s.t,38.3,39.05),enter=p(s.t,23.35,24);
  return <>
    <div style={{position:'absolute',inset:-1000,background:`rgba(21,21,23,${s.composer*.10})`,backdropFilter:`blur(${s.composer*3}px)`,opacity:s.composer}}/>
    <Panel style={{left:mix(360,302,collapse),top:mix(190,360,collapse)+(1-enter)*28,width:1250,height:720,opacity:s.composer,transform:`scale(${mix(.95,1,enter)*mix(1,.93,collapse)})`,transformOrigin:'0 0',padding:'38px 46px',borderRadius:34,boxShadow:'0 30px 95px #15151725'}}>
      <Author time="new post"/><span style={{position:'absolute',right:40,top:42,color:muted}}><Icon name="close"/></span>
      <FormattingToolbar/>
      <div style={{marginTop:22,fontSize:40,fontWeight:500,letterSpacing:'-1.4px',lineHeight:1.25,minHeight:100}}>{s.titleText||<span style={{color:muted}}>Title</span>}{s.t>=24.6&&s.t<26.4&&<Caret t={s.t} typing/>}</div>
      <div style={{fontSize:30,lineHeight:1.55,letterSpacing:'-.5px',minHeight:260,marginTop:8}}>{s.bodyText||<span style={{color:muted}}>Share what you’re thinking about…</span>}{s.t>=26.6&&s.t<35.2&&<Caret t={s.t} typing/>}</div>
      <div style={{position:'absolute',bottom:30,left:46,right:46,display:'flex',alignItems:'center',justifyContent:'space-between'}}><span role="button" aria-label="add image" style={{display:'flex',gap:13,alignItems:'center',fontSize:20,color:muted}}><Icon name="image"/>add image</span><span style={{display:'flex',gap:22,alignItems:'center',background:ink,color:'#fff',borderRadius:50,fontSize:24,padding:'18px 29px',transform:`scale(${1-(s.t>37.9&&s.t<38.5?s.click:0)*.045})`}}>publish<Icon name="arrow"/></span></div>
    </Panel>
  </>;
}
export function Toast({s}:{s:State}) {
  return <Panel style={{left:1135,top:865,padding:'22px 28px',borderRadius:22,display:'flex',gap:15,alignItems:'center',fontSize:21,opacity:s.toast,transform:`translateY(${(1-s.toast)*16}px)`}}><Icon name="check" size={25}/>Your post has been shared.</Panel>;
}
