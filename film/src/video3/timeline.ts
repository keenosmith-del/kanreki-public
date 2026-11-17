import {glide,filtered,type Stops} from '../motion';
import {p,typed} from '../timeline';
import {articleTitle,prompt,starter,initialParagraphs,finalParagraphs,firstSuggestion,refreshedSuggestion,shorterSuggestion} from './content';
export const FPS=60,SECONDS=46,FRAMES=FPS*SECONDS;
export const times={starter:5.05,send:9.45,rewrite:17.3,refresh:20.5,replace:22.35,shorten:23.8,acceptShorter:26.0,bold:30.55,image:31.5,chooseImage:32.35,insertImage:32.9,preview:34.5,publish:37.5,home:38.9,create:43.9};
export const generationWindows=[[11.1,12.65],[12.7,14.3],[14.35,15.5]] as const;
export function stateAt(frame:number){
 const t=Math.max(0,Math.min(FRAMES-1,frame))/FPS;
 const reset=t>=times.create;
 const acceptedRewrite=t>=22.45,acceptedShorter=t>=26.1;
 const paragraphs=initialParagraphs.map((text,i)=>{
  if(t<15.5){const [a,b]=generationWindows[i];return typed(text,t,a,b)}
  if(i===1&&acceptedRewrite)return finalParagraphs[1];if(i===2&&acceptedShorter)return finalParagraphs[2];return text;
 });
 const rewritePanel=p(t,17.3,17.55)*(1-p(t,22.35,22.65));
 const shortenPanel=p(t,23.8,24.05)*(1-p(t,26,26.3));
 const suggestion=t<20.5?firstSuggestion:t<23?refreshedSuggestion:shorterSuggestion;
 const click=Object.values(times).reduce((v,at)=>v+Math.sin(p(t,at,at+.18)*Math.PI),0);
 return {t,reset,paragraphs,title:typed(articleTitle,t,10.35,11.05),promptText:reset?'':t<5.05?'':t<5.4?starter:starter+typed(prompt.slice(starter.length),t,5.4,9.0),
  acceptedRewrite,acceptedShorter,suggestion,regenerate:p(t,20.5,20.82),rewritePanel,shortenPanel,
  selectedSentence:t>=16.1&&t<22.45,selectionProgress:p(t,16.1,16.65),selectedEnding:t>=23.0&&t<26.1,endingSelectionProgress:p(t,23,23.45),
  selectBold:t>=29.7&&t<30.55,boldSelectionProgress:p(t,29.7,30.15),bold:t>=30.55,
  editor:p(t,27,27.8),preview:p(t,34.5,35.05),imagePicker:p(t,31.5,31.72)*(1-p(t,32.9,33.15)),imageChosen:t>=32.35,image:p(t,32.9,33.35),published:t>=37.5,
  openingToDraft:p(t,9.5,10.1),toFeed:p(t,38.9,39.6),toOpening:p(t,43.9,44.65),feedScroll:glide(t,[[0,0],[41.2,0],[42.1,150],[43.25,440],[46,440]]),
  toast:p(t,39.6,39.85)*(1-p(t,41.2,41.5)),click,
  cursorOpacity:p(t,4.55,4.85)*(1-p(t,45.05,45.35))*(1-p(t,5.55,5.75)*(1-p(t,8.9,9.15)))*(1-p(t,9.85,10.05)*(1-p(t,15.7,15.95))),
  cursorX:glide(t,[[0,1370],[4.55,1370],[5.05,700],[5.55,700],[8.9,1500],[9.45,1588],[9.85,1588],[15.7,392],[16.1,392],[16.65,1270],[17.3,716],[18,1350],[20.5,1560],[21,1560],[22.35,1420],[22.7,1420],[23,392],[23.45,1140],[23.8,836],[24.3,1300],[26,1420],[26.4,1420],[28.9,650],[29.7,400],[30.15,650],[30.55,373],[31.5,844],[32.35,925],[32.9,1170],[33.5,1490],[34.5,1575],[35.2,1575],[37.5,1580],[38.9,186],[39.4,186],[40.3,950],[42.8,950],[43.9,186],[44.5,186],[45.35,100],[46,100]]),
  cursorY:glide(t,[[0,880],[4.55,880],[5.05,674],[5.55,674],[8.9,762],[9.45,762],[9.85,762],[15.7,565],[16.1,565],[16.65,565],[17.3,506],[18,720],[20.5,650],[21,650],[22.35,802],[22.7,802],[23,685],[23.45,685],[23.8,625],[24.3,520],[26,592],[26.4,592],[28.9,660],[29.7,650],[30.15,650],[30.55,353],[31.5,353],[32.35,570],[32.9,680],[33.5,700],[34.5,281],[35.2,281],[37.5,281],[38.9,320],[39.4,320],[40.3,670],[42.8,680],[43.9,413],[44.5,413],[45.35,100],[46,100]])};
}
export type State=ReturnType<typeof stateAt>;
const paths={
 x:[[0,960],[.4,960],[3.7,960],[5.1,990],[6,1010],[8.8,1170],[9.45,1230],[10.3,960],[11.2,1030],[12.7,1020],[14.5,1060],[15.6,1000],[16.5,1020],[17.6,1100],[19.5,1180],[20.5,1220],[22.35,1100],[23.3,1000],[24.4,1100],[26.1,1000],[27.8,960],[29.7,1000],[30.55,700],[31.5,900],[32.4,1080],[33.55,1410],[34.2,1020],[35.3,1000],[37.5,1180],[38.8,186],[39.3,186],[40.1,960],[42.4,1010],[43.3,800],[43.9,186],[44.25,186],[45.65,960],[46,960]],
 y:[[0,480],[.4,480],[3.7,540],[5.1,650],[6,735],[8.8,750],[9.45,750],[10.3,540],[11.2,490],[12.7,570],[14.5,650],[15.6,550],[16.5,565],[17.6,650],[19.5,660],[20.5,660],[22.35,640],[23.3,690],[24.4,565],[26.1,650],[27.8,550],[29.7,650],[30.55,430],[31.5,470],[32.4,570],[33.55,680],[34.2,570],[35.3,550],[37.5,450],[38.8,320],[39.3,320],[40.1,540],[42.4,640],[43.3,550],[43.9,413],[44.25,413],[45.65,480],[46,480]],
 scale:[[0,1.1],[.4,1.1],[3.7,1],[5.1,1.12],[6,1.28],[8.8,1.38],[9.45,1.38],[10.3,1],[11.2,1.15],[12.7,1.18],[14.5,1.2],[15.6,1],[16.5,1.18],[17.6,1.18],[19.5,1.25],[20.5,1.4],[22.35,1.18],[23.3,1.17],[24.4,1.18],[26.1,1.1],[27.8,1],[29.7,1.16],[30.55,1.27],[31.5,1.2],[32.4,1.2],[33.55,1.4],[34.2,1],[35.3,1],[37.5,1.2],[38.8,2.1],[39.3,2.1],[40.1,1],[42.4,1.08],[43.3,1.08],[43.9,2.1],[44.25,2.1],[45.65,1.1],[46,1.1]]
} satisfies Record<string,Stops>;
export function cameraAt(t:number){return {x:filtered(t,q=>glide(q,paths.x),.16),y:filtered(t,q=>glide(q,paths.y),.16),scale:filtered(t,q=>glide(q,paths.scale),.16)}}
