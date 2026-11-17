export const query='brand identity';
export type Post={id:string;image:string;author:string;name:string;username:string;date:string;title:string;excerpt:string;category:string;likes:number;comments:number;reposts:number;shares:number;oldAsset?:boolean};
export const results:Post[]=[
 {id:'identity-in-use',image:'post1',author:'user1',name:'Rowan Ellis',username:'rowanellis',date:'2 hours ago',title:'A brand identity in everyday use',excerpt:'A simple dog illustration connects an invoice, stationery and smaller printed details.',category:'Brand identity',likes:42,comments:6,reposts:3,shares:2},
 {id:'friendly-circle',image:'post2',author:'user2',name:'Felix Reed',username:'felixreed',date:'yesterday',title:'A friendly character starts with a clear shape',excerpt:'A blue circle, a wave and a few confident lines establish an approachable visual voice.',category:'Brand identity',likes:61,comments:9,reposts:4,shares:5},
 {id:'packaging-character',image:'post3',author:'user3',name:'Ada Lane',username:'adalane',date:'2 days ago',title:'Carrying a character onto packaging',excerpt:'A cookie illustration turns a plain paper bag into a recognisable part of an identity.',category:'Brand identity',likes:83,comments:11,reposts:6,shares:3},
 {id:'coffee-wordmark',image:'post4',author:'user4',name:'Miles Hart',username:'mileshart',date:'3 days ago',title:'A coffee identity with a bold silhouette',excerpt:'Heavy lettering and a person embracing a cup bring a compact identity into focus.',category:'Brand identity',likes:29,comments:4,reposts:2,shares:1}
];
export const article=results[0];
export const paragraphs=[
 'An identity becomes useful when it can move beyond a single logo. Here, the same dog illustration appears at different scales across an invoice, larger sheets and small printed cards.',
 'The rounded outline stays recognisable as the information changes. Quiet typography leaves room for practical details, letting the character add warmth without competing with the document.'
];
export const creators=[
 {id:'user1',name:'Rowan Ellis',username:'rowanellis',description:'Brand identities, print and the details that make them work.'},
 {id:'user2',name:'Felix Reed',username:'felixreed',description:'Writing about characters, illustration and visual identity.'},
 {id:'user3',name:'Ada Lane',username:'adalane',description:'Packaging, typography and the everyday life of a brand.'}
];
export const gallery=['image1','image2','image3','image4'];
export const olderSaved:Post[]=[
 {id:'saved-chicken',image:'post-3.png',author:'author-3.png',name:'Eli Parker',username:'eliparker',date:'17 November 2026',title:'When a character and its lettering share a voice',excerpt:'A calling chicken, chunky letters and a generous orange field create one clear visual rhythm.',category:'Visual culture',likes:67,comments:9,reposts:4,shares:6,oldAsset:true},
 {id:'saved-lines',image:'post-4.png',author:'author-4.png',name:'Jude Bennett',username:'judebennett',date:'16 November 2026',title:'How little does a face need?',excerpt:'A looping line, two dots and a short dash leave plenty of room for expression.',category:'Drawing',likes:43,comments:6,reposts:2,shares:4,oldAsset:true}
];
export const sectionCopy={heading:'search and saved content',description:'Search articles, photographs and people, filter results by content type, and save posts to return to later.'};
