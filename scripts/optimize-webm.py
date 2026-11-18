# Reproducible delivery-only encoding; approved originals are retained outside public/.
from pathlib import Path
import subprocess,json,shutil
root=Path(__file__).resolve().parents[1]
work=root/'film/output/delivery-optimized/final';work.mkdir(parents=True,exist_ok=True)
backup=root/'media-originals/webm-2026-11-18';backup.mkdir(parents=True,exist_ok=True)
for name in ['kanreki-drafting','kanreki-search','kanreki-profiles-r03']:
 source=root/'public/media'/f'{name}.webm';original=backup/source.name
 if not original.exists():shutil.copy2(source,original)
 metadata=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','json',str(original)]))
 bitrate=int(22*1024*1024*8/float(metadata['format']['duration']))
 args=['ffmpeg','-hide_banner','-y','-threads','2','-i',str(original),'-map','0:v:0','-an','-c:v','libvpx-vp9','-b:v',str(bitrate),'-maxrate',str(bitrate),'-bufsize',str(bitrate*2),'-crf','24','-deadline','realtime','-cpu-used','5','-row-mt','1','-tile-columns','2','-threads','2','-pix_fmt','yuv420p','-fps_mode','passthrough',str(work/source.name)]
 with open(work/(name+'.log'),'w') as log:subprocess.run(args,stdout=log,stderr=log,check=True)
 print(name,round((work/source.name).stat().st_size/1024/1024,2),'MiB',flush=True)
