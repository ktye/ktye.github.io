function compress(u){ //see github.com/zhipeng-jia/snappyjs(0.7.0)
 let G=new Array(15)
 let H=(k,s)=>(k*0x1e35a7bd)>>>s
 let L=(a,p)=>a[p]+(a[p+1]<<8)+(a[p+2]<<16)+(a[p+3]<<24)
 let E=(a,p,q)=>a[p]===a[q]&&a[p+1]===a[q+1]&&a[p+2]===a[q+2]&&a[p+3]===a[q+3]
 let N=function(x,i,n,r,p){
  if(n<=60){r[p]=(n-1)<<2;p++}else if(n<256){r[p]=60<<2;r[p+1]=n-1;p+=2}else{r[p]=61<<2;r[p+1]=(n-1)&255;r[p+2]=(n-1)>>>8;p+=3}
  r.set(x.subarray(i,i+n),p);return p+n}
 let C=function(r,p,o,n){
  if(n<12&&o<2048){r[p]=1+((n-4)<<2)+((o>>>8)<<5);r[p+1]=o&255;return p+2}
  else{r[p]=2+((n-1)<<2);r[p+1]=o&255;r[p+2]=o>>>8;return p+3}}
 let A=function(r,p,o,n){while(n>=68){p=C(r,p,o,64);n-=64}
  if(n>64){p=C(r,p,o,60);n-=60};return C(r,p,o,n)}
 let F=function(x,p,s,r,q){
  let t=1;while((1<<t)<=s&&t<=14)t++;t--
  let h=32-t;if(typeof G[t]==='undefined'){G[t]=new Uint16Array(1<<t)}
  let g=G[t];g.fill(0)
  let e=p+s,l,b=p,n=p,a,d,j,c,k,u,v,m,o,w,y,f=1
  if(s>=15){l=e-15;p++;d=H(L(x,p),h)
   while(f){k=32;j=p
    do{p=j;a=d;u=k>>>5;k++;j=p+u;if(p>l){f=0;break};d=H(L(x,j),h);c=b+g[a];g[a]=p-b}while(!E(x,p,c))
    if(!f)break;q=N(x,n,p-n,r,q)
    do{v=p;m=4;while(p+m<e&&x[p+m]===x[c+m])m++;p+=m;o=v-c;q=A(r,q,o,m);n=p;if(p>=l){f=0;break}
     w=H(L(x,p-1),h);g[w]=p-1-b;y=H(L(x,p),h);c=b+g[y];g[y]=p-b}while(E(x,p,c))
    if(!f)break;p++;d=H(L(x,p),h)
  }};if(n<e)q=N(x,n,e-n,r,q);return q}
 let P=function(v,r,p){do{r[p]=v&127;v=v>>>7;if(v>0)r[p]+=128;p++}while(v>0);return p}
 let M=x=>32+x.length+Math.floor(x.length/6)
 let T=function(r,u){let l=u.length,p=0,n=0,s;n=P(l,r,n);while(p<l){s=Math.min(l-p,1<<16);n=F(u,p,s,r,n);p+=s};return r.slice(0,n)}
 let r=new Uint8Array(M(u));return T(r,u)}
