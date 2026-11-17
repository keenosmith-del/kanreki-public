import {Avatar,Icon,Wordmark,Caret,asset,ink,muted,surface} from '../ui';
import type {Person} from '../ui';
import {NavigationRail,Interactions,postStyle} from '../workspace';
import {stateAt as heroState,p} from '../timeline';
import people from '../../assets.json';
import images from '../../video-02-assets.json';
import {hoverAt,galleryCounts,type State} from './timeline';
import {posts,profilePosts,galleryImages,type Post} from './content';
export const image=(key:string)=>key in images?`/film/assets/${images[key as keyof typeof images].file}`:asset(key as keyof typeof people);
export function Verified({size=23}:{size?:number}){return <svg aria-label="verified account" width={size} height={size} viewBox="0 0 24 24" fill="none" style={{flexShrink:0}}><path d="m12 2 3 1.3 3.3.4 1.3 3 2 2.8-.6 3.3.1 3.3-2.7 1.9-1.9 2.7-3.3-.1L12 22l-2.9-1.4-3.3-.4-1.3-3-2-2.8.6-3.3L3 7.8l2.7-1.9L7.6 3.2l3.3.1Z" stroke={ink} strokeWidth="1.3"/><path d="m8 12 2.6 2.6L16 9" stroke={ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
export function Author({person='primary',date='14 November 2026'}:{person?:Person;date?:string}){return <div style={{display:'flex',alignItems:'center',gap:14,fontSize:20,height:42}}><Avatar person={person} size={42}/><span style={{fontWeight:500}}>{people[person].name}</span><Verified size={20}/><span style={{fontSize:17,color:muted,marginLeft:8}}>{date}</span></div>}
export function Rail({s}:{s:State}){
 const blend=(a:number[],b:number[])=>`rgb(${a.map((v,i)=>v+(b[i]-v)*s.feed).join(',')})`;
 const charcoal=[21,21,23],light=[247,247,247],white=[255,255,255];
 return <div data-shared-rail style={{display:'contents'}}><NavigationRail/><style>{`
 [data-video-two] [data-shared-rail]>div>div:nth-child(2){background:${blend(charcoal,light)}!important;color:${blend(white,charcoal)}!important}
 [data-video-two] [data-shared-rail]>div>div:nth-child(4){background:${blend(light,charcoal)}!important;color:${blend(charcoal,white)}!important}
 `}</style></div>;
}
export function WorkspaceHeader(){return <div style={{position:'absolute',left:172,top:42,right:62,display:'flex',alignItems:'center',justifyContent:'space-between'}}><Wordmark size={37}/><div style={{display:'flex',gap:17}}>{(['message','bell'] as const).map(name=><div key={name} style={{position:'relative',width:48,height:48,display:'grid',placeItems:'center'}}><Icon name={name}/><span style={{position:'absolute',right:6,top:3,width:7,height:7,borderRadius:'50%',background:ink}}/></div>)}</div></div>}
export function ProfileHeader(){return <div data-profile-header style={{position:'absolute',left:172,top:128,right:62,height:200}}>
 <div style={{position:'absolute',left:0,top:0}}><Avatar size={136}/></div>
 <div style={{position:'absolute',left:170,top:1}}><div style={{fontSize:23,color:muted,marginBottom:10}}>@keenosmith</div><div style={{display:'flex',gap:16,alignItems:'center',fontSize:49,fontWeight:500,letterSpacing:'-2px'}}>Keeno Smith<Verified size={28}/></div><div style={{fontSize:25,marginTop:18,color:muted}}>Writing about software, design and the way people use technology.</div>
 <div style={{display:'flex',gap:35,fontSize:21,marginTop:30}}>{[['1,248','followers'],['86','following'],['110','published posts']].map(([n,label])=><span key={label}><strong style={{fontWeight:500}}>{n}</strong><span style={{color:muted,marginLeft:9}}>{label}</span></span>)}</div></div>
 <span style={{position:'absolute',right:0,top:5,padding:'14px 24px',borderRadius:40,fontSize:20,background:surface}}>edit profile</span>
 </div>}
const tabs=['Home','Posts','Reposts','Activity','About','Lists','Followers','Following'];
export function ProfileTabs({s}:{s:State}){return <div data-profile-tabs style={{position:'absolute',left:172,top:366,right:62,display:'flex',alignItems:'center',gap:16,height:52}}>{tabs.map((tab,i)=><div key={tab} data-tab={tab} style={{fontSize:21,width:[94,94,116,108,98,86,130,132][i],textAlign:'center',flexShrink:0,padding:'13px 0',borderRadius:16,background:i===0?`rgba(247,247,247,${1-s.posts})`:i===1?`rgba(247,247,247,${s.posts})`:'transparent',fontWeight:(i===0&&s.posts<.5)||(i===1&&s.posts>.5)?500:400,color:i>1?muted:ink,transform:i===1?`scale(${1-(s.t>11.4&&s.t<11.9?s.click:0)*.035})`:undefined}}>{tab}</div>)}</div>}
export function GalleryOverlay({opacity,likes,comments}:{opacity:number;likes:number;comments:number}){return <div data-gallery-overlay style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',gap:32,background:'#15151777',color:'#fff',opacity}}><span style={{display:'flex',gap:11,alignItems:'center',fontSize:28,fontWeight:500}}><Icon name="heart" size={32} filled/>{likes}</span><span style={{display:'flex',gap:11,alignItems:'center',fontSize:28,fontWeight:500}}><Icon name="message" size={31}/>{comments}</span></div>}
export function Gallery({s}:{s:State}){return <div data-profile-gallery style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24,width:1272,margin:0}}>{galleryImages.map((key,i)=><div key={key} style={{position:'relative',aspectRatio:'1',borderRadius:22,overflow:'hidden',background:surface}}><img src={image(key)} alt={`Supplied profile image post ${i+1}`} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:i===2?'50% 47%':'50% 50%',display:'block'}}/><GalleryOverlay opacity={hoverAt(s.t,i)} likes={galleryCounts[i][0]} comments={galleryCounts[i][1]}/></div>)}</div>}
export function PostActions({post,index,s}:{post:Post;index:number;s:State}){
 const liked=index===1&&s.liked,saved=index===2&&s.saved,reposted=index===5&&s.reposted;
 const base={...heroState(0),likes:post.likes+Number(liked),comments:post.comments+Number(index===3&&s.commented),reposts:post.reposts+Number(reposted),shares:post.shares,saved,t:s.t};
 return <div data-post-actions data-liked={liked} data-reposted={reposted}><Interactions s={base}/></div>;
}
export function CommentInteraction({s}:{s:State}){return <>
 {s.replyOpen>0&&!s.commented&&<div data-comment-input style={{position:'absolute',left:0,right:0,top:315,height:84,display:'flex',alignItems:'center',gap:16}}><Avatar size={40}/><div style={{display:'flex',alignItems:'center',flex:1,height:70,background:surface,borderRadius:35,padding:'0 15px 0 24px',fontSize:21}}><span style={{flex:1}}>{s.replyText}<Caret t={s.t} typing/></span><span style={{background:ink,color:'#fff',borderRadius:35,padding:'13px 20px',transform:`scale(${1-(s.t>28.7&&s.t<29.05?s.click:0)*.04})`}}>post</span></div></div>}
 {s.commented&&<div data-submitted-comment style={{position:'absolute',left:0,right:0,top:315,display:'flex',gap:16,transform:`translateY(${(1-p(s.t,28.8,29.05))*6}px)`}}><Avatar size={40}/><div><div style={{fontSize:18,fontWeight:500,marginBottom:8}}>Keeno Smith<span style={{fontSize:15,color:muted,marginLeft:18,fontWeight:400}}>just now</span></div><div style={{fontSize:22,lineHeight:1.5}}>{s.replyText}</div></div></div>}
 </>}
export function EditorialPost({post,index,s,compact=false}:{post:Post;index:number;s:State;compact?:boolean}){
 return <article data-post-id={post.id} style={{...postStyle,position:'relative',height:compact?215:340+(index===3?Math.max(s.replyOpen,Number(s.commented))*110:0)}}>
  <Author person={post.person} date={post.date}/>
  <div style={{position:'absolute',left:0,top:compact?58:59,right:compact?185:260}}><h2 style={{fontSize:compact?31:37,lineHeight:1.18,fontWeight:500,letterSpacing:compact?'-1px':'-1.3px',margin:compact?'0 0 8px':'0 0 14px'}}>{post.title}</h2><p style={{fontSize:compact?20:23,color:muted,lineHeight:1.5,margin:compact?'0 0 10px':'0 0 14px',maxWidth:1050}}>{post.excerpt}</p><div style={{fontSize:16,color:muted}}>3 min read · {post.category}</div></div>
  <img data-article-thumbnail src={image(post.image)} alt={post.title} style={{position:'absolute',right:0,top:compact?20:44,width:compact?136:205,height:compact?136:205,borderRadius:'50%',objectFit:'cover',objectPosition:'50% 45%'}}/>
  <div style={{position:'absolute',left:0,right:0,top:compact?166:260}}><PostActions post={post} index={index} s={s}/></div>
  {!compact&&index===3&&<CommentInteraction s={s}/>}
 </article>;
}
export function PublishedPosts({s}:{s:State}){return <div data-published-post-list>{profilePosts.map((post,i)=><EditorialPost key={post.id} post={post} index={i+10} s={s} compact/>)}</div>}
export function Profile({s}:{s:State}){return <div data-profile-view><ProfileHeader/><ProfileTabs s={s}/><div data-profile-content style={{position:'absolute',left:172,top:430,right:62,height:430,overflow:'hidden',background:'#fff'}}>
 <div data-gallery-page style={{transform:`translateX(${-s.posts*1426}px)`,position:'absolute',inset:0,background:'#fff'}}><Gallery s={s}/></div>
 <div data-posts-page style={{transform:`translateX(${(1-s.posts)*1426}px)`,position:'absolute',inset:0,background:'#fff'}}><PublishedPosts s={s}/></div>
 </div></div>}
export function WorkspaceViews({s}:{s:State}){return <div data-view-stage style={{position:'absolute',left:172,top:113,width:1426,height:747,overflow:'hidden',background:'#fff'}}>
 <div data-profile-page style={{position:'absolute',inset:0,overflow:'hidden',background:'#fff',transform:`translateX(${-s.feed*1426}px)`}}><div style={{position:'absolute',left:-172,top:-113,width:1660,height:860}}><Profile s={s}/></div></div>
 <div data-feed-page style={{position:'absolute',inset:0,overflow:'hidden',background:'#fff',transform:`translateX(${(1-s.feed)*1426}px)`}}><div style={{position:'absolute',left:-172,top:-113,width:1660,height:860}}><Feed s={s}/></div></div>
 </div>}
export function FeedScroll({s}:{s:State}){return <div data-feed-viewport style={{position:'absolute',left:172,top:257,right:62,height:580,overflow:'hidden'}}><div data-feed-scroll style={{transform:`translateY(${-s.scroll}px)`}}>{posts.map((post,index)=><EditorialPost key={post.id} post={post} index={index} s={s}/>)}</div></div>}
export function Feed({s}:{s:State}){return <div data-main-feed>
 <div style={{position:'absolute',left:172,top:113,right:62}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{display:'flex',alignItems:'baseline',gap:29}}><span style={{fontSize:49,fontWeight:500,letterSpacing:'-2px'}}>for you</span><span style={{fontSize:22,color:muted}}>following</span><span style={{fontSize:22,color:muted}}>latest</span></div><span style={{display:'flex',alignItems:'center',gap:12,padding:'16px 24px',borderRadius:50,background:ink,color:'#fff',fontSize:21}}><Icon name="pen" size={23}/>create post</span></div>
 <div style={{height:58,marginTop:25,borderRadius:40,background:surface,color:muted,display:'flex',gap:16,alignItems:'center',padding:'0 25px',fontSize:21}}><Icon name="search" size={24}/>search articles, photographs and people</div></div>
 <FeedScroll s={s}/></div>}
export function CanvasFeather(){return <div style={{position:'absolute',inset:0,pointerEvents:'none',background:'linear-gradient(90deg,#fff,transparent 3%,transparent 97%,#fff),linear-gradient(0deg,#fff,transparent 4%,transparent 96%,#fff)'}}/>}
