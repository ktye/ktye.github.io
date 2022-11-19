/* from SnappyJs 0.7.0 Zhipeng Jia (MIT) https://github.com/zhipeng-jia/snappyjs */
function compress(u){
 var gh=new Array(15)
 let hf=function(k,s){return(k*0x1e35a7bd)>>>s}
 let l32=function(a,p){return a[p]+(a[p+1]<<8)+(a[p+2]<<16)+(a[p+3]<<24)}
 let eq=function(a,p,q){return a[p]===a[q]&&a[p+1]===a[q+1]&&a[p+2]===a[q+2]&&a[p+3]===a[q+3]}
 let cp=function(x,a,y,b,n){for(let i=0;i<n;i++)y[b+i]=x[a+i]}
 let el=function(x,i,n,r,p){
  if(n<=60){r[p]=(n-1)<<2;p+=1}else if(n<256){r[p]=60<<2;r[p+1]=n-1;p+=2}else{r[p]=61<<2;r[p+1]=(n-1)&0xff;r[p+2]=(n-1)>>>8;p+=3}
  cp(x,i,r,p,n);return p+n}
 let ecl=function(r,p,o,n){
  if(n<12&&o<2048){r[p]=1+((n-4)<<2)+((o>>>8)<<5);r[p+1]=o&0xff;return p+2}
  else{r[p]=2+((n-1)<<2);r[p+1]=o&0xff;r[p+2]=o>>>8;return p+3}}
 let ec=function(r,p,o,n){while(n>=68){p=ecl(r,p,o,64);n-=64}
  if(n>64){p=ecl(r,p,o,60);n-=60};return ecl(r,p,o,n)}
 let cf=function(x,p,xs,r,q){
  var tb=1;while((1<<tb)<=xs&&tb<=14){tb+=1}
  tb-=1;
  var hfs=32-tb
  if(typeof gh[tb]==='undefined'){gh[tb]=new Uint16Array(1<<tb)}
  var ht=gh[tb]
  for(let i=0;i<ht.length;i++)ht[i]=0
  var pe=p+xs,l,bi=p,ne=p
  var ha,nh,ni,c,sk,bb,ba,m,o,ph,ch,f=true,I=15
  if(xs>=I){l=pe-I;p+=1;nh=hf(l32(x,p),hfs)
   while(f){sk=32;ni=p
    do{p=ni;ha=nh;bb=sk>>>5;sk+=1;ni=p+bb;if(p>l){f=false;break};nh=hf(l32(x,ni),hfs);c=bi+ht[ha];ht[ha]=p-bi}while(!eq(x,p,c))
    if(!f){break};q=el(x,ne,p-ne,r,q)
    do{
     ba=p;m=4;while(p+m<pe&&x[p+m]===x[c+m]){m+=1};p+=m;o=ba-c;q=ec(r,q,o,m);ne=p;if(p>=l){f=false;break}
     ph=hf(l32(x,p-1),hfs);ht[ph]=p-1-bi;ch=hf(l32(x,p),hfs);c=bi+ht[ch];ht[ch]=p-bi
    }while(eq(x,p,c))
    if(!f){break};p+=1;nh=hf(l32(x,p),hfs)
  }};if(ne<pe)q=el(x,ne,pe-ne,r,q);return q}
 let pV=function(v,r,p){do{r[p]=v&0x7f;v=v>>>7;if(v>0)r[p]+=0x80;p+=1}while(v>0);return p}
 let maxlen=function(u){return 32+u.length+Math.floor(u.length/6)}
 let ctb=function(r,u){let l=u.length,p=0,n=0,s;n=pV(l,r,n);while(p<l){s=Math.min(l-p,1<<16);n=cf(u,p,s,r,n);p+=s};return n}
 let r=new Uint8Array(maxlen(u));let n=ctb(r,u);return r.slice(0,n)} 
