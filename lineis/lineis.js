let sin=Math.sin,cos=Math.cos,atan2=Math.atan2,sqrt=Math.sqrt,abs=Math.abs,hypot=Math.hypot,log=Math.log,log10=Math.log10,log2=Math.log2,exp=Math.exp,sign=Math.sign,floor=Math.floor,ceil=Math.ceil,round=Math.round,min=Math.min,max=Math.max,random=Math.random;const pi=Math.PI
let zdiv=(xr,xi,yr,yi)=>{let r=0,d=0,e=0,f=0;if(abs(yr)>=abs(yi)){r=yi/yr;d=yr+r*yi;e=(xr+xi*r)/d;f=(xi-xr*r)/d}else{r=yr/yi;d=yi+r*yr;e=(xr*r+xi)/d;f=(xi*r-xr)/d};return[e,f]}
let attr=(A,m,n,z)=>(A.m=m,A.n=n,A.z=z,A)
let copy=A=>attr(A.slice(),A.m,A.n,A.z)
let zeros=(m,n)=>{let A=new Float64Array(m*(n=(n?n:m)));A.m=m;A.n=n;return A}
let ones=(m,n)=>attr(zeros(m,n).map(x=>1),m,n?n:m)
let onez=(m,n)=>attr(zeros(m,2*(n?n:m)).map((x,i)=>1-(1&i)),m,n?n:m,1)
let eye=n=>{let A=zeros(n,n);for(let i=0;i<n;i++)A[i+n*i]=1;return A}
let eyez=n=>imag(eye(n),zeros(n))
let rand=(m,n)=>attr(zeros(m,n).map(Math.random),m,n?n:m)
let randz=(m,n)=>imag(rand(m,n),rand(m,n))
let real=Z=>attr(Z.filter((x,i)=>!(i&1)),Z.m,Z.n)
let conj=Z=>{Z=copy(Z);if(!Z.z)return z;for(let i=1;i<Z.length;i+=2)Z[i]=-Z[i];return Z}
let imag=(A,B)=>{if(B){let R=zeros(A.m,2*A.n);for(let i=0;i<A.length;i++){R[2*i]=A[i];R[2*i+1]=B[i]};return attr(R,A.m,A.n,1)};return attr(Z.filter((x,i)=>i&1),Z.m,Z.n)}
let nearly=(A,B,eps)=>{eps=eps?eps:1e-12;return A.every((x,i)=>abs(x-B[i])<eps)}
let trans=A=>flip(A.z?conj(A):A)
let flip=A=>{let B=copy(A);let k=0,n=A.n;for(let i=0;i<A.m;i++)if(A.z){for(let j=0;j<2*n;j+=2){B[k++]=A[i+n*j];B[k++]=A[i+n*j+1]}}else{for(let j=0;j<n;j++)B[k++]=A[i+n*j]};return attr(B,A.n,A.m,A.z)}
let band=(A,h)=>{}
let tri=(A,b,c)=>{}
let unband=A=>{}
let untri=A=>{}
let ij=(A,f)=>{let B=copy(A),k=0,n=A.n,m=(A.z?2:1)*A.m;for(let j=0;j<n;j++){if(A.z){for(let i=0;i<m;i+=2){let r=f(A[i+n*2*j],A[1+i+n*2*j],i,j);B[k++]=r[0];B[k++]=r[1]}}else{for(let i=0;i<m;i++)B[k++]=f(A[j+i*n],i,j)}};return B}
let scale=(a,A)=>A.z&&Array.isArray(a)?ij(A,(x,y,i,j)=>{return[x*a[0]-y*a[1]*y,x*a[1]+y*a[0]]}):attr(A.map((x,i)=>x*a),A.m,A.n,A.z)
let add=(A,B)=>attr(A.map((x,i)=>x+B[i]),A.m,A.n,A.z)

let prec=4,form=A=>{if(A.constructor!=Float64Array)return String(A);
 if(A.m*A.n==0)return A.m+"x"+A.n
 let c=Array(min(A.n,10)).fill(0).map(x=>[]),z=A.z,o="",f=x=>prec<0?String(x):x&&(abs(x)<1e-3||abs(x)>=10000)?x.toExponential(prec):x.toFixed(prec)
 for(let i=0;i<min(30,A.m);i++){for(let j=0;j<min(10,A.n);j++){let ij=j+i*A.n*(z?2:1);c[j].push(f(A[ij++])+(z?((A[ij]>=0?"+":"")+f(A[ij])+"i"):""))}}
 c.forEach((x,i)=>{let m=max(...x.map(x=>x.length));c[i]=x.map(x=>x.padStart(1+m," "))})
 m=c[0].length;for(let i=0;i<m;i++){c.forEach(x=>o+=x[i]+" ");o+=A.n>10?"..\n":"\n"};return o+(A.n>30?".."+A.m+"x"+A.n:"")}

let alloc=(x, g)=>($0+=x,((g=$0-$.memory.buffer.byteLength-$0)>0?($.memory.grow((65535+g)>>16),$I=new Int32Array($.memory.buffer),$F=new Float64Array($.memory.buffer)):0),$0-x)
let free=_=>$0=$.__heap_base
let int=(x, p)=>($I[(p=alloc(8))>>2]=x,p)
let float=(x, p)=>($F[(p=alloc(8))>>3]=x,p)
let array=(x, p)=>($F.set(x,p=alloc(x.m*x.n*(x.z?16:8))>>3),p)
let i$=x=>$I[x>>2]
let f$=x=>$F[x>>3]
let $$=(x,m,n,z)=>attr(new Float64Array($0.memory.buffer,x,m*n*(z?2:1)),m,n,z)

let rg=(A,v)=>{let m=A.m,n=A.n,wr=alloc(8*n),wi=alloc(8*n),z=v?alloc(8*m*n):0,fv1=alloc(8*n),iv1=alloc(4*n),e=int(0)
 free($.rg_(int(m),int(n),array(A),wr,wi,int(v),z,iv1,fv1,e))
 A=imag($$(wr,n,1),$$(wi,n,1));return v?[A,$$(z,m,n)]:A}
 

