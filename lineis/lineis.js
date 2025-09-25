let sin=Math.sin,cos=Math.cos,atan2=Math.atan2,sqrt=Math.sqrt,abs=Math.abs,hypot=Math.hypot,log=Math.log,log10=Math.log10,log2=Math.log2,exp=Math.exp,sign=Math.sign,floor=Math.floor,ceil=Math.ceil,round=Math.round,min=Math.min,max=Math.max,random=Math.random;const pi=Math.PI
let zdiv=(xr,xi,yr,yi)=>{let r=0,d=0,e=0,f=0;if(abs(yr)>=abs(yi)){r=yi/yr;d=yr+r*yi;e=(xr+xi*r)/d;f=(xi-xr*r)/d}else{r=yr/yi;d=yi+r*yr;e=(xr*r+xi)/d;f=(xi*r-xr)/d};return[e,f]}
let attr=(A,m,n,z)=>(A.m=m,A.n=n,A.z=z,A)
let copy=A=>attr(A.slice(),A.m,A.n,A.z)
let size=A=>[A.m,A.n]
let zeros=(m,n)=>{let A=new Float64Array(m*(n=(n?n:m)));A.m=m;A.n=n;return A}
let zeroz=(m,n)=>attr(zeros(m,2*(n?n:m)),m,n?n:m,1)
let ones=(m,n)=>attr(zeros(m,n).map(x=>1),m,n?n:m)
let onez=(m,n)=>attr(zeros(m,2*(n?n:m)).map((x,i)=>1-(1&i)),m,n?n:m,1)
let eye=n=>{let A=zeros(n,n);for(let i=0;i<n;i++)A[i+n*i]=1;return A}
let eyez=n=>imag(eye(n),zeros(n))
let iota=(m,n)=>attr(new Float64Array(m*(n?n:m)).map((x,i)=>i),m,n?n:m)
let rand=(m,n)=>attr(zeros(m,n).map(Math.random),m,n?n:m)
let randz=(m,n)=>imag(rand(m,n),rand(m,n))
let real=Z=>attr(Z.filter((x,i)=>!(i&1)),Z.m,Z.n)
let conj=Z=>{Z=copy(Z);if(!Z.z)return z;for(let i=1;i<Z.length;i+=2)Z[i]=-Z[i];return Z}
let imag=(A,B)=>{if(B){let R=zeros(A.m,2*A.n);for(let i=0;i<A.length;i++){R[2*i]=A[i];R[2*i+1]=B[i]};return attr(R,A.m,A.n,1)};return A.z?attr(A.filter((x,i)=>i&1),A.m,A.n):zeros(...size(A))}
let nearly=(A,B,eps)=>{eps=eps?eps:1e-12;return A.every((x,i)=>abs(x-B[i])<eps)}
let trans=A=>flip(A.z?conj(A):A)
//let flip=A=>{let B=copy(A);let k=0,n=A.n,m=A.m;for(let i=0;i<m;i++)if(A.z){for(let j=0;j<2*n;j+=2){B[k++]=A[i+m*j];B[k++]=A[i+m*j+1]}}else{for(let j=0;j<n;j++)B[k++]=A[i+m*j]};return attr(B,A.n,A.m,A.z)}
let flip=A=>{let B=copy(A);let k=0,n=A.m,m=A.n,z=A.z;for(let j=0;j<A.m;j++)for(let i=0;i<A.n;i++)B[j+n*i]=A[k++];return attr(B,m,n,z)}
let band=(A,h)=>{}
let bands=A=>{} //convert band to real sym band packed, see rsb
let tri=(A,b,c)=>{}
let unband=A=>{}
let ij=(A,f)=>{let B=copy(A),k=0,n=A.n,m=(A.z?2:1)*A.m;for(let j=0;j<n;j++){if(A.z){for(let i=0;i<m;i+=2){let r=f(A[i+n*2*j],A[1+i+n*2*j],i,j);B[k++]=r[0];B[k++]=r[1]}}else{for(let i=0;i<m;i++)B[k++]=f(A[j+i*n],i,j)}};return B}
let scale=(a,A)=>A.z&&Array.isArray(a)?ij(A,(x,y,i,j)=>{return[x*a[0]-y*a[1]*y,x*a[1]+y*a[0]]}):attr(A.map((x,i)=>x*a),A.m,A.n,A.z)
let add=(A,B)=>attr(A.map((x,i)=>x+B[i]),A.m,A.n,A.z)
let dot=(A,B)=>{[A,B]=A.z&&!B.z?[A,imag(B,zeros(...size(B)))]:B.z&&!A.z?[imag(A,zeros(...size(A))),B]:[A,B];if(A.n!=B.m)throw("inner: "+A.n+"!="+B.m);let C=A.z?zeroz(A.m,B.n):zeros(A.m,B.n),a,b,c;
 if(A.z)for(let i=0;i<A.m;i++)for(let j=0;j<B.n;j++)for(let k=0;k<A.n;k++){C[2*i+2*j*C.m]+=A[2*i+k*2*A.m]*B[2*k+j*2*B.m]-A[1+2*i+k*2*A.m]*B[1+2*k+j*2*B.m];C[1+2*i+2*j*C.m]+=A[1+2*i+k*2*A.m]*B[2*k+j*2*B.m]+A[2*i+k*2*A.m]*B[1+2*k+j*2*B.m]}
 else for(let i=0;i<A.m;i++)for(let j=0;j<B.n;j++)for(let k=0;k<A.n;k++)C[i+j*C.m]+=A[i+k*A.m]*B[k+j*B.m];return C}

let eig=(A,B)=>evp_(A,B,0)
let evp=(A,B)=>evp_(A,B,1)
let evp_=(A,v)=>B?rgg(A,B,v):A.z?(isherm(A)?ch(A,v):cg(A,v)):(A.m<A.n?rsb(A,v):issym(A)?rs(A,v):rg(A,v))

let factor=A=>((A.m<A.n?(A.z?zgbfa:dgbfa):A.m>A.n?(A.z?zqrdc:dqrdc):A.z?(isherm(A)?zhifa:zgefa):issym(A)?dsifa:dgefa)(A))

let cond=A=>((A.z?(isherm(A)?zhico:zgeco):issym(A)?dsico:dgeco)(A))

let solve=(A,b)=>(A=A.constructor==Float64Array?factor(A):A, ({dgbfa:dgbsl,zgbfa:zgbsl,dgefa:dgesl,zgefa:zgesl,dpbfa:dpbsl,zpbfa:zpbsl,dpofa:dposl,zpofa:zposl,dqrdc:dqrsl,zqrdc:zqrsl,dsidc:dsisl,zhidc:zhisl}[A.q])(A,b))

let det=A=>(A=A.contstructor==Float64Array?factor(A):A,({dgbfa:dgbdi,zgbfa:zgbdi,dgefa:dgedi,zgefa:zgedi,dpbfa:dpbdi,zpbfa:zpbdi,dpofa:dpodi,zpofa:zpodi,dqrdc:dqrdi,zqrdc:zqrdi,dsidc:dsidi,zhidc:zhidi}[A.q])(A))
let qr=A=>(A.z?zqrdc:dqrdc)(A)
let svd=(A,d)=>(A.z?zsvdc:dsvdc)(A,d)
let chol=A=>(A.z?zchdc:dchdc)(A)

let prec=4,form=A=>{
 if(Array.isArray(A))return"array("+A.length+"):\n"+A.map(form).join("\n")
 if(A.constructor!=Float64Array)return String(A);
 if(A.m*A.n==0)return A.m+"x"+A.n
 let m,c=Array(min(A.n,10)).fill(0).map(x=>[]),z=A.z,o="",f=x=>prec<0?String(x):x&&(abs(x)<1e-3||abs(x)>=10000)?x.toExponential(prec):x.toFixed(prec)
 for(let i=0;i<min(30,A.m);i++){for(let j=0;j<min(10,A.n);j++){let ij=(i+j*A.m)*(z?2:1);c[j].push(f(A[ij++])+(z?((A[ij]>=0?"+":"")+f(A[ij])+"i"):""))}}
 c.forEach((x,i)=>{m=max(...x.map(x=>x.length));c[i]=x.map(x=>x.padStart(1+m," "))})
 m=c[0].length;for(let i=0;i<m;i++){c.forEach(x=>o+=x[i]+" ");o+=A.n>10?"..\n":"\n"};return o+(A.n>30?".."+A.m+"x"+A.n:"")}
let show=(...A)=>{A.forEach(x=>typeof(_o)!="undefined"?_o.textContent+=form(x)+"\n":console.log(form(x)))}

let alloc=(x, g)=>($0+=x,((g=$0-$.memory.buffer.byteLength-$0)>0?($.memory.grow((65535+g)>>16),$I=new Int32Array($.memory.buffer),$F=new Float64Array($.memory.buffer)):0),$0-x)
let free=_=>$0=$.__heap_base
let int=(x, p)=>($I[(p=alloc(8))>>2]=x,p)
let float=(x, p)=>($F[(p=alloc(8))>>3]=x,p)
let array=(x, p)=>($F.set(x,(p=alloc(x.m*x.n*(x.z?16:8)))>>3),p)
let i$=x=>$I[x>>2]
let f$=x=>$F[x>>3]
let I$=(x,n)=>new Int32Array($.memory.buffer,x,n)
let $$=(x,m,n,z)=>attr(new Float64Array($.memory.buffer,x,m*n*(z?2:1)),m,n,z)
let check=(x,s)=>{if(x)throw new Error(s)}

let cg=(A,v)=>{let m=A.m,n=A.n,N=8*n,M=m*N,ar=array(real(A)),ai=array(imag(A)),wr=alloc(N),wi=alloc(N),zr=v?alloc(M):0,zi=v?alloc(M):0,fv1=alloc(N),fv2=alloc(N),fv3=alloc(N),e=int(0)
 free($.cg_(int(m),int(n),ar,ai,wr,wi,int(v),zr,zi,fv1,fv2,fv3,e));check(i$(e),"cg")
 let w=imag($$(wr,n,1),$$(wi,n,1));return v?[w,imag($$(zr,m,n),$$(zi,m,n))]:w}
let rg=(A,v)=>{let m=A.m,n=A.n,N=8*n,M=N*m,wr=alloc(N),wi=alloc(N),z=v?alloc(M):0,fv1=alloc(N),iv1=alloc(N),e=int(0)
 free($.rg_(int(m),int(n),array(A),wr,wi,int(v),z,iv1,fv1,e));check(i$(e),"rg")
 let w=imag($$(wr,n,1),$$(wi,n,1));return v?[w,$$(z,m,n)]:w}
let rgg=(A,B,v)=>{let m=A.m,n=A.n,N=8*n,M=N*m,ar=alloc(N),ai=alloc(N),b=alloc(N),z=v?alloc(M):0,e=int(0)
 free($.rgg_(int(m),int(n),array(A),array(B),ar,ai,b,int(v),z,e));check(i$(e),"rgg")
 let f=(ai,z, zi,r,i)=>{zi=zeros(m,n)
  for(let j=0;j<n;j++)if(ai[j]){ //unpack complex eigenvectors
   r=z.slice(m*j,m*j+n);i=z.slice(m*j+n,m*j+2*n)
   zi.set(i,m*j);zi.set(i.map(x=>-x),m*j+n);z.set(r,m*j+n);j++}
  return imag(z,zi)}
 b=$$(b,n,1);ar=attr($$(ar,n,1).map((x,i)=>x/b[i]),n,1);ai=attr($$(ai,n,1).map((x,i)=>x/b[i]),n,1);b=imag(ar,ai);return v?[b,f(ai,$$(z,m,n))]:b}
let rs=(A,v)=>{let m=A.m,n=A.n,N=8*n,M=N*m,w=alloc(N),z=v?alloc(M):0,fv1=alloc(N),fv2=alloc(N),e=int(0)
 free($.rs_(int(m),int(n),array(A),w,int(v),z,fv1,fv2,e));check(i$(e),"rs")
 w=$$(w,n,1);return v?[w,$$(z,m,n)]:w}
let rsb=(A,v)=>{let m=A.m,n=A.n,N=8*n,M=N*m,a=bands(A),w=alloc(N),z=v?alloc(M):0,fv1=alloc(N),fv2=alloc(N),e=int(0)
 free($.rsb_(int(m),int(n),a,w,int(v),z,fv1,fv2,e));check(i$(e),"rsb")
 w=$$(w,n,1);return v?[w,$$(z,m,n)]:w}
let rsg=(A,B,v)=>{let m=A.m,n=A.n,N=8*n,M=N*m,w=alloc(N),z=v?alloc(M):0,fv1=alloc(N),fv2=alloc(N),e=int(0)
 free($.rsg_(int(m),int(n),array(A),array(B),w,int(v),z,fv1,fv2,e));check(i$(e),"rsg")
 w=$$(w,n,1);return v?[w,$$(z,m,n)]:w}
let rsgab=(A,B,v)=>{let m=A.m,n=A.n,N=8*n,M=N*m,w=alloc(N),z=v?alloc(M):0,fv1=alloc(N),fv2=alloc(N),e=int(0)
 free($.rsgab_(int(m),int(n),array(A),array(B),w,int(v),z,fv1,fv2,e));check(i$(e),"rsgab")
 w=$$(w,n,1);return v?[w,$$(z,m,n)]:w}
let rsgba=(A,B,v)=>{let m=A.m,n=A.n,N=8*n,M=N*m,w=alloc(N),z=v?alloc(M):0,fv1=alloc(N),fv2=alloc(N),e=int(0)
 free($.rsgba_(int(m),int(n),array(A),array(B),w,int(v),z,fv1,fv2,e));check(i$(e),"rsgba")
 w=$$(w,n,1);return v?[w,$$(z,m,n)]:w}
  
let mark=(s,A)=>(A.q=s,A)
let dchdc=A=>{let m=A.m,a=array(A),p=alloc(8*m),e=int(0)
 free($.dchdc_(a,int(m),int(m),array(zeros(m,1)),p,int(1),e));check(i$(e)!=m,"dchdc")
 return[$$(a,m,m),I$(p,m)]}

let dgefa=A=>{let m=A.m,n=A.n,a=array(A),p=alloc(8*n),e=int(0)
 free($.dgefa_(a,int(m),int(n),p,e));check(i$(e),"dgefa")
 return mark("dgefa",$$(a,m,n))}

//todo..
