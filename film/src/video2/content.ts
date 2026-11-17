import type {Person} from '../ui';
export type Post={id:string;person:Person;date:string;title:string;excerpt:string;category:string;image:string;likes:number;comments:number;reposts:number;shares:number};
export const posts:Post[]=[
 {id:'launch',person:'contributor1',date:'14 November 2026',title:'A quieter approach to launching something new',excerpt:'A launch can start a conversation. The work that follows gives people a reason to return.',category:'Ideas & business',image:'post1',likes:12,comments:3,reposts:1,shares:2},
 {id:'small-changes',person:'primary',date:'14 November 2026',title:'The small changes that make software easier to use',excerpt:'Move the important decisions into focus. A clearer screen starts with fewer competing demands.',category:'Software & design',image:'post2',likes:64,comments:2,reposts:1,shares:2},
 {id:'visual-systems',person:'contributor3',date:'13 November 2026',title:'A visual system that leaves room to grow',excerpt:'Consistency is useful when it helps a team make better decisions, rather than repeating the same answer.',category:'Design & culture',image:'feedArticle1',likes:38,comments:6,reposts:2,shares:4},
 {id:'simple-approach',person:'contributor2',date:'13 November 2026',title:'Finding the simplest way through a complex idea',excerpt:'A useful diagram makes the relationships visible. The next step becomes easier to explain.',category:'Ideas & technology',image:'feedArticle2',likes:82,comments:9,reposts:3,shares:5},
 {id:'interfaces',person:'primary',date:'12 November 2026',title:'Interfaces that give the content room to breathe',excerpt:'Small details in spacing and hierarchy can change the way a whole experience feels.',category:'Software & design',image:'feedArticle3',likes:46,comments:5,reposts:2,shares:3},
 {id:'everyday-data',person:'contributor3',date:'11 November 2026',title:'Making everyday data easier to understand',excerpt:'The clearest view is often the one that shows how something changes, and what matters next.',category:'Design & technology',image:'feed1',likes:53,comments:7,reposts:4,shares:6},
 {id:'better-work',person:'contributor2',date:'10 November 2026',title:'Good work continues after the first version',excerpt:'Listening, refining and returning to the details are part of making something useful.',category:'Process & practice',image:'feed2',likes:29,comments:4,reposts:1,shares:2},
];
export const galleryImages=['gallery1','gallery2','gallery3'] as const;
export const profilePosts:Post[]=[
 {id:'profile-perspectives',person:'primary',date:'14 November 2026',title:'A different way to look at familiar ideas',excerpt:'The references we return to can change how we see the work in front of us.',category:'Design & culture',image:'profileArticle1',likes:64,comments:2,reposts:1,shares:2},
 {id:'profile-interfaces',person:'primary',date:'12 November 2026',title:'Small interfaces, carefully considered',excerpt:'A closer look at the details that make everyday software feel clear and useful.',category:'Software & design',image:'profileArticle2',likes:46,comments:5,reposts:2,shares:3}
];
export const sectionCopy={title:'profiles and feed interactions',description:'View user profiles, browse published photographs and articles, and navigate between personal posts and the main feed. Interact with content through likes, comments, reposts and saved posts.'};
