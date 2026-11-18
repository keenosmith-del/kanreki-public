export type Creator={id:number;name:string;username:string;bio:string;followers:number;following:number;posts:number;crop:string};
export const creators:Creator[]=[
 {id:1,name:'Malik Hayes',username:'malikhayes',bio:'Illustration, visual identity and the details that give a character its voice.',followers:1248,following:186,posts:84,crop:'50% 16%'},
 {id:2,name:'Lena Brooks',username:'lenabrooks',bio:'Notes on design, coffee and the small rituals of everyday life.',followers:934,following:214,posts:62,crop:'50% 28%'},
 {id:3,name:'Iris Cole',username:'iriscole',bio:'Photographs, personal essays and things worth looking at twice.',followers:1820,following:302,posts:97,crop:'50% 30%'},
 {id:4,name:'Theo Mercer',username:'theomercer',bio:'Writing about typography, print and the way ideas become visible.',followers:2186,following:173,posts:114,crop:'50% 28%'},
 {id:5,name:'Jalen Reed',username:'jalenreed',bio:'Style, movement and a slower way of noticing the world.',followers:763,following:128,posts:48,crop:'50% 19%'},
 {id:6,name:'Noah Ellis',username:'noahellis',bio:'Clothes, composition and thoughtful everyday design.',followers:1056,following:241,posts:73,crop:'50% 22%'},
 {id:7,name:'Mina Avery',username:'minaavery',bio:'Personal photographs and conversations about creative work.',followers:1437,following:319,posts:106,crop:'50% 35%'},
 {id:8,name:'Freya Lane',username:'freyalane',bio:'Finding stories in ordinary rooms and everyday objects.',followers:682,following:154,posts:51,crop:'50% 20%'},
 {id:9,name:'Esme Hart',username:'esmehart',bio:'Light, portraiture and observations from behind the lens.',followers:2730,following:286,posts:132,crop:'50% 30%'},
 {id:10,name:'Alex Quinn',username:'alexquinn',bio:'Colour, graphic design and playful ways to communicate.',followers:1674,following:208,posts:89,crop:'50% 27%'},
 {id:11,name:'Owen Blake',username:'owenblake',bio:'Essays about books, ideas and the conversations between them.',followers:1183,following:167,posts:68,crop:'50% 30%'}
];
export const featured=creators[0];
export const previews=[
 'Hey, I came across your latest post about visual identity.',
 'The way you described that quiet moment in the photograph stayed with me.',
 'Have you tried keeping a few notes alongside your image posts?',
 'Your observation about the spacing made me look at that layout again.',
 'What made you choose that particular image for the article?',
 'I have been thinking about the same relationship between clothes and shape.',
 'Would you be interested in continuing the conversation about illustration?',
 'There is a small detail in your last photograph I wanted to ask about.',
 'The natural light in that portrait is really interesting. How did you approach it?',
 'Your point about simple shapes connects with something I am working through.',
 'I found another essay that builds on the question in your last post.'
];
export const conversation=[previews[0],'Thanks for reading. What stood out to you?',"The part about keeping things simple. I've been exploring something similar."];
export const tagline='read. write. everything.';
