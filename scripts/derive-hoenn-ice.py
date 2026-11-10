import subprocess,struct,json,hashlib,argparse
from pathlib import Path
root=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser(description='Derive Hoenn ice paths from pinned public source geometry.')
parser.add_argument('--ruby-source',type=Path,default=root/'.cache/pokeruby')
parser.add_argument('--emerald-source',type=Path,default=root/'.cache/pokeemerald')
parser.add_argument('--check',action='store_true')
args=parser.parse_args()
solutions=[]
for repo,version,pin in [('pokeruby','RUBY_SAPPHIRE','5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f'),('pokeemerald','EMERALD','731ad5bfd6e6f265508d0efcca0ba42f9dcf5881')]:
 get=lambda name: subprocess.check_output(['git','-C',str(args.emerald_source if repo=='pokeemerald' else args.ruby_source),'show',pin+':'+name])
 mapdata=get('data/layouts/SootopolisCity_Gym_1F/map.bin');maptiles=struct.unpack('<442H',mapdata)
 attrdata=get('data/tilesets/secondary/sootopolis_gym/metatile_attributes.bin');attrs=struct.unpack('<'+'H'*(len(attrdata)//2),attrdata)
 for platform,(top,bottom) in enumerate([(17,19),(12,14),(6,9)],1):
  cells=[(x,y) for y in range(top,bottom+1) for x in range(3,14) if (maptiles[y*17+x]&1023)>=512 and attrs[(maptiles[y*17+x]&1023)-512]&255==0x26 and (maptiles[y*17+x]&0xc00)==0]
  index={cell:i for i,cell in enumerate(cells)};neighbors=[[index[p] for p in [(x,y-1),(x+1,y),(x,y+1),(x-1,y)] if p in index] for x,y in cells]
  start=index[(8,bottom)];target=index[(8,top)];full=(1<<len(cells))-1;count=[0]
  def dfs(current,visited,route):
   count[0]+=1
   if visited==full:return route if current==target else None
   remaining=full^visited
   # A disconnected remainder cannot be a continuous path.
   seed=(remaining&-remaining).bit_length()-1;seen=1<<seed;todo=[seed]
   while todo:
    for n in neighbors[todo.pop()]:
     if remaining>>n&1 and not seen>>n&1:seen|=1<<n;todo.append(n)
   if seen!=remaining:return None
   options=[n for n in neighbors[current] if not visited>>n&1 and (n!=target or visited|(1<<n)==full)]
   options.sort(key=lambda n:sum(not visited>>p&1 for p in neighbors[n]))
   for n in options:
    result=dfs(n,visited|1<<n,route+[n])
    if result:return result
  solution=dfs(start,1<<start,[start]);assert solution,(repo,platform)
  moves='';directions={(0,-1):'N',(1,0):'E',(0,1):'S',(-1,0):'W'}
  for a,b in zip(solution,solution[1:]):moves+=directions[(cells[b][0]-cells[a][0],cells[b][1]-cells[a][1])]
  compressed=[]
  for move in moves:
   if compressed and compressed[-1][0]==move:compressed[-1][1]+=1
   else:compressed.append([move,1])
  row={'version':version,'platform':platform,'start':[8,bottom],'exit':[8,top],'cells':[list(c) for c in cells],'moves':moves,'groups':compressed,'sourceCommit':pin,'sourceRepository':'pret/'+repo,'mapSha256':hashlib.sha256(mapdata).hexdigest(),'attributesSha256':hashlib.sha256(attrdata).hexdigest()};solutions.append(row)
  print(version,platform,len(cells),compressed,'searched',count[0])
result=json.dumps({'scope':'Paths derived from pinned source map tiles and MB_THIN_ICE attributes; not natural-save validation.','platforms':solutions},indent=2)+'\n'
destination=root/'research/routes/hoenn-ice-paths.json'
if args.check:
 assert destination.read_text()==result, 'Derived source geometry or solutions changed.'
else:
 destination.write_text(result)
