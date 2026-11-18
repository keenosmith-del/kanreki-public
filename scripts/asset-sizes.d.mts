export const PAGES_ASSET_LIMIT:number;
export function auditAssetSizes(root:string):Promise<{files:{path:string;bytes:number}[];oversized:{path:string;bytes:number}[]}>;
