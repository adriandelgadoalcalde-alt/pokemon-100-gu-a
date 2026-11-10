import subprocess,json,struct,collections,argparse,hashlib
from pathlib import Path
parser=argparse.ArgumentParser(description="Derive Sabrinas teleport route from the pinned map.")
parser.add_argument("--source",type=Path,required=True)
parser.add_argument("--check",action="store_true")
args=parser.parse_args()
repo=str(args.source);pin='ce6406d8c2eaf46d543c8a2606de0c3cb1951982'
get=lambda p:subprocess.check_output(['git','-C',repo,'show',pin+':'+p])
m=json.loads(get('data/maps/SaffronCity_Gym/map.json'));layouts=json.loads(get('data/layouts/layouts.json'));layout=next(l for l in layouts['layouts'] if l.get('id')==m['layout'])
w,h=layout['width'],layout['height'];a=struct.unpack('<'+'H'*(w*h),get(layout['blockdata_filepath']))
walk={(x,y) for y in range(h) for x in range(w) if a[y*w+x]&0xc00==0}
warps=m['warp_events'];
blocked={(o['x'],o['y']) for o in m['object_events']};leader=next(o for o in m['object_events'] if 'SABRINA' in o.get('graphics_id',''));target=(leader['x'],leader['y'])
starts=[(p['x'],p['y']) for p in warps if p['dest_map']!='MAP_SAFFRON_CITY_GYM']
warpby={(p['x'],p['y']):p for p in warps}
start=starts[0];queue=collections.deque([start]);previous={start:None};transitions={}
goal=None
while queue:
 p=queue.popleft()
 if abs(p[0]-target[0])+abs(p[1]-target[1])==1:goal=p;break
 for dx,dy in [(0,-1),(1,0),(0,1),(-1,0)]:
  nxt=(p[0]+dx,p[1]+dy);teleport=None
  if nxt not in walk or nxt in blocked:continue
  if nxt in warpby:
   entry=warpby[nxt]
   if entry['dest_map']!='MAP_SAFFRON_CITY_GYM':continue
   dest=warps[int(entry['dest_warp_id'])];teleport=[list(nxt),[dest['x'],dest['y']]];nxt=(dest['x'],dest['y'])
  if nxt not in previous:previous[nxt]=p;transitions[nxt]=teleport;queue.append(nxt)
assert goal
path=[];p=goal
while previous[p] is not None:path.append({'destination':list(p),'teleport':transitions[p]});p=previous[p]
path.reverse();
# Room components ignore teleport activation, only used to name the pad's corner.
rooms=[];unvisited=walk.copy()
while unvisited:
 seed=next(iter(unvisited));comp={seed};q=[seed];unvisited.remove(seed)
 while q:
  x,y=q.pop()
  for v in [(x+1,y),(x-1,y),(x,y+1),(x,y-1)]:
   if v in unvisited:unvisited.remove(v);comp.add(v);q.append(v)
 rooms.append(comp)
for step in [s for s in path if s['teleport']]:
 src=tuple(step['teleport'][0]);room=next(r for r in rooms if src in r);xs=[p[0] for p in room];ys=[p[1] for p in room];

report={'sourceCommit':pin,'sourceRepository':'pret/pokefirered','map':'SaffronCity_Gym','width':w,'height':h,'mapSha256':hashlib.sha256(get(layout['blockdata_filepath'])).hexdigest(),'mapEventsSha256':hashlib.sha256(get('data/maps/SaffronCity_Gym/map.json')).hexdigest(),'teleports':[s['teleport'] for s in path if s['teleport']],'scope':'Derived navigation through pinned collision cells and warp targets, avoiding NPC positions; not a natural-save test.'}
result=json.dumps(report,indent=2)+'\n'
destination=Path(__file__).resolve().parents[1]/'research/routes/frlg-teleporters.json'
if args.check:
 assert destination.read_text()==result, 'The pinned teleporter derivation changed.'
else:
 destination.write_text(result)
print('Pinned Saffron gym warp path verified.')
