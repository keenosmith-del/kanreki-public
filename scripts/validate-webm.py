from pathlib import Path
import subprocess,json,hashlib,re,shutil
root=Path(__file__).resolve().parents[1];work=root/'film/output/delivery-optimized/final';evidence=root/'docs/verification/webm';evidence.mkdir(parents=True,exist_ok=True)
result=[]
def probe(path):
 p=subprocess.run(['ffprobe','-v','error','-threads','2','-count_frames','-show_streams','-show_format','-of','json',str(path)],capture_output=True,text=True,check=True)
 assert not p.stderr,p.stderr
 return json.loads(p.stdout)
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
for name in ['kanreki-drafting','kanreki-search','kanreki-profiles-r03']:
 original=root/'media-originals/webm-2026-11-18'/f'{name}.webm';delivery=work/original.name
 a,b=probe(original),probe(delivery);av,bv=a['streams'][0],b['streams'][0]
 for key in ['codec_name','width','height','r_frame_rate','nb_read_frames']:assert av[key]==bv[key],(name,key,av[key],bv[key])
 assert bv['codec_name']=='vp9' and bv['width']==1920 and bv['height']==1080 and bv['r_frame_rate']=='60/1'
 assert float(a['format']['duration'])==float(b['format']['duration'])
 assert len(b['streams'])==1 and delivery.stat().st_size<24*1024*1024
 def timestamps(path):return subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_entries','frame=best_effort_timestamp_time','-of','csv=p=0',str(path)])
 assert timestamps(original)==timestamps(delivery),'Frame timestamps differ'
 log=evidence/(name+'-decode-ssim.log');stats=evidence/(name+'-ssim-frames.txt')
 args=['ffmpeg','-hide_banner','-xerror','-threads','2','-i',str(original),'-threads','2','-i',str(delivery),'-filter_complex_threads','2','-filter_complex',f'[0:v]blackdetect=d=0.016:pix_th=0.1:pic_th=0.98[a];[1:v]blackdetect=d=0.016:pix_th=0.1:pic_th=0.98[b];[a][b]ssim=stats_file={stats}','-an','-f','null','-']
 p=subprocess.run(args,capture_output=True,text=True,check=True);log.write_text('\n'.join(line.rstrip() for line in p.stderr.splitlines())+'\n')
 scores=[float(x) for x in re.findall(r'All:([0-9.]+)',stats.read_text())]
 assert len(scores)==int(bv['nb_read_frames']) and sum(scores)/len(scores)>.985 and min(scores)>.9
 black=re.findall(r'black_start:[^\n]+',p.stderr);assert not black,black
 for t in [0,5,17, min(30,float(b['format']['duration'])-1),float(b['format']['duration'])-1/60]:
  for label,path in [('original',original),('optimized',delivery)]:subprocess.run(['ffmpeg','-v','error','-threads','2','-ss',str(t),'-i',str(path),'-frames:v','1','-y',str(evidence/f'{name}-{label}-{t:.3f}.png')],check=True)
 item={'path':f'public/media/{name}.webm','originalPath':str(original.relative_to(root)),'originalSha256':digest(original),'sha256':digest(delivery),'bytes':delivery.stat().st_size,'originalBytes':original.stat().st_size,'codec':'vp9','width':1920,'height':1080,'fps':60,'seconds':float(b['format']['duration']),'frames':len(scores),'timestampSequenceIdentical':True,'fullDecode':True,'blackFrames':0,'ssimMean':sum(scores)/len(scores),'ssimMinimum':min(scores),'loopBoundary':'First and last frame timestamps preserved; representative boundary frames exported for moving review.'}
 result.append(item);print(name,round(item['bytes']/1024/1024,2),len(scores),'frames; mean SSIM',round(item['ssimMean'],6),flush=True)
(evidence.parent/'webm-deliveries.json').write_text(json.dumps(result,indent=2)+'\n')
