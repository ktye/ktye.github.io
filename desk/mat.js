let sin=Math.sin,cos=Math.cos,atan2=Math.atan2,sqrt=Math.sqrt,abs=Math.abs,hypot=Math.hypot,log=Math.log,log10=Math.log10,log2=Math.log2,exp=Math.exp,sign=Math.sign,floor=Math.floor,ceil=Math.ceil,round=Math.round,min=Math.min,max=Math.max,random=Math.random;const pi=Math.PI,pi_=pi/180,_pi=180/pi
let zdiv=(xr,xi,yr,yi)=>{let r=0,d=0,e=0,f=0;if(abs(yr)>=abs(yi)){r=yi/yr;d=yr+r*yi;e=(xr+xi*r)/d;f=(xi-xr*r)/d}else{r=yr/yi;d=yi+r*yr;e=(xr*r+xi)/d;f=(xi*r-xr)/d};return[e,f]}
let zinv=(a,b)=>{let r,d;if(abs(a)>abs(b)){r=b/a;d=a+b*r;return[1/d,-r/d]}else{r=a/b;d=b+a*r;return[r/d,-1/d]}}
let errif=(x,e)=>{if(x)throw new Error(e)}

let copy=A=>{let r=A.slice();r.m=A.m;r.n=A.n;r.z=A.z;return r}
let zeros=(m,n)=>{n=n||1;let r=new Float64Array(  m*n);r.m=m;r.n=n;return r}
let zeroz=(m,n)=>{n=n||1;let r=new Float64Array(2*m*n);r.m=m;r.n=n;r.z=1;return r}
let rand=(m,n)=>{let r=zeros(m,n),i;for(i=0;i<r.length;i++)r[i]=random();return r}
let randz=(m,n)=>{let x=zeroz(m,n),N=x.length,i;for(let i=0;i<N;i+=2){let r=sqrt(min(1489,-2*log(random()))),p=random()*2*pi;x[i]=r*cos(p);x[1+i]=r*sin(p)};return x}
let randn=(m,n)=>{n=n||1;let x=randz(1,((m*n)>>1)+(1&(m*n)));x=x.subarray(0,m*n);x.m=m;x.n=n;x.z=0;return x}
let eye=n=>{let r=zeros(n,n),nn=n*n,n1=1+n;for(let i=0;i<nn;i+=n1)r[i]=1;return r}
let eyez=n=>{let r=zeroz(n,n),nn=2*n*n,n1=2+2*n;for(let i=0;i<nn;i+=n1)r[i]=1;return r}
let ones=(m,n)=>{let r=zeros(m,n);for(let i=0;i<r.length;i++)r[i]=1;return r}
let onez=(m,n)=>{let r=zeroz(m,n);for(let i=0;i<r.length;i+=2)r[i]=1;return r}
let diag=x=>{if(x.m==1||x.n==1){let m=max(x.m,x.n),m2=1+2*m,r=x.z?zeroz(m,m):zeros(m,m),i,j=0;if(x.z){for(i=0;i<x.length;j+=m2){r[j]=x[i++];r[++j]=x[i++]}}else for(i=0;i<x.length;++i,j+=1+m)r[j]=x[i];return r};let m=min(x.m,x.n),n1=1+x.n,n2=2+2*x.n,r=x.z?zeroz(m,1):zeros(m,1),i,j=0;if(x.z){for(i=0;i<2*m;++i,j+=n2){r[i]=x[j];r[++i]=x[1+j]}}else for(i=0;i<m;i++,j+=n1)r[i]=x[j];return r}
let iota=(m,n)=>{let r=zeros(m,n);for(let i=0;i<r.length;i++)r[i]=i;return r},til=iota
let grade=x=>Array.from(x.keys()).sort((a,b)=>x[a]-x[b])
let dims=A=>{let r=zeros(1,2);r[0]=A.m;r[1]=A.n;return r}
let real=(A,o)=>{if(!A.z)return A;o=o||0;let r=zeros(A.m,A.n),n=r.length;for(let i=0;i<n;i++)r[i]=A[2*i+o];return r},imag=A=>real(A,1);
let complex=(A,B)=>{B=B||0;if(A.z&&!B)return A;let f=r=>{let i,k=0;for(i=0;i<r.length;i+=2,k++){r[i]=A[k];r[i+1]=B[k]}return r},g=r=>{let i,k=0;for(i=0;i<r.length;i+=2,k++){r[i]=A[k];r[i+1]=B}return r},h=r=>{let i,k=0;for(i=0;i<r.length;i+=2,k++){r[i]=A;r[i+1]=B[k]}return r};return ismat(A)?(ismat(B)?f(zeroz(A.m,A.n)):g(zeroz(A.m,A.n))):h(zeroz(B.m,B.n))}
let conj=A=>{let r=zeroz(A.m,A.n);r.set(A);return conj_(r)},conj_=A=>{for(let i=1;i<A.length;i+=2)A[i]=-A[i];return A}
let herm=A=>conj_(tranz(A))


let scalar=(x,y,F,f,Z,z)=>ismat(x)?(y.z?Z(x,copy(y)):F(x,copy(y))):y.z?z(x,copy(y)):f(x,copy(y))
let add=(x,y)=>scalar(x,y,addF,addf,addZ,addz)
let addF=(x,y)=>{for(let i=0;i<y.length;i++)y[i]+=x[i];return y},addZ=addF
let addf=(x,y)=>{for(let i=0;i<y.length;i++)y[i]+=x;return y}
let addz=(x,y)=>{let[a,b]=x;for(let i=0;i<y.length;i+=2){y[i]+=a;y[1+i]+=b}return y}
let sub=(x,y)=>scalar(x,y,subF,subf,subZ,subz)
let subF=(x,y)=>{for(let i=0;i<y.length;i++)y[i]-=x[i];return y},subZ=subF
let subf=(x,y)=>{for(let i=0;i<y.length;i++)y[i]-=x;return y}
let subz=(x,y)=>{let[a,b]=x;for(let i=0;i<y.length;i+=2){y[i]-=a;y[1+i]-=b}return y}
let mul=(x,y)=>scalar(x,y,mulF,mulf,mulZ,mulz)
let mulF=(x,y)=>{for(let i=0;i<y.length;i++)y[i]*=x[i];return y}
let mulf=(x,y)=>{for(let i=0;i<y.length;i++)y[i]*=x;return y}
let mulZ=(x,y)=>{for(let i=0;i<y.length;i++){let a=x[i],b=x[1+i],c=y[i],d=y[1+i];y[i]=a*c-b*d;y[1+i]=a*d+b*c}return y}
let mulz=(x,y)=>{let[a,b]=x;for(let i=0;i<y.length;i++){let c=y[i],d=y[1+i];y[i]=a*c-b*d;y[1+i]=a*d+b*c}return y}
let div=(x,y)=>scalar(x,y,divF,(x,y)=>mulf(1/x,y),divZ,(x,y)=>mulz(zinv(x[0],x[1]),y))
let divF=(x,y)=>{for(let i=0;i<y.length;i++)y[i]/=x[i];return y}
let divZ=(x,y)=>{for(let i=0;i<y.length;i++)[y[i],y[1+i]]=zdiv(x[i],x[1+i],y[i],y[1+i]);return y}

let Abs=x=>{let r=zeros(x.m,x.n),i,j=0;if(x.z)for(i=0;i<x.length;i+=2)r[j++]=hypot(x[i],x[1+i]);else for(i=0;i<x.length;i++)r[i]=abs(x[i]);return r}
let Max=x=>Math.max(...x),RowMax=x=>{let m=x.m,r=zeros(m,1),i;for(i=0;i<m;i++)r[i]=Math.max(...x.subarray(i*n,(1+i*n)));return r},ColMax=x=>{let m=x.m,n=x.n,r=zeros(1,n),i,j,k=0;r.set(x.subarray(0,n));for(i=0;i<m;i++)for(j=0;j<n;j++)r[j]=Math.max(r[j],x[k++]);return r}
let Min=x=>Math.min(...x),RowMin=x=>{let m=x.m,r=zeros(m,1),i;for(i=0;i<m;i++)r[i]=Math.min(...x.subarray(i*n,(1+i*n)));return r},ColMin=x=>{let m=x.m,n=x.n,r=zeros(1,n),i,j,k=0;r.set(x.subarray(0,n));for(i=0;i<m;i++)for(j=0;j<n;j++)r[j]=Math.min(r[j],x[k++]);return r}
let sum=x=>{let r=0,s=0,i;if(x.z){for(i=0;i<x.length;i+=2){r+=x[i];s+=x[1+i]};return[r,s]}for(i=0;i<x.length;i++)r+=x[i];return r},Sum=sum
let RowSum=x=>{let m=x.m,n=x.n,m2=2*m,i,j,k=0,r=x.z?zeroz(m,1):zeros(m,1);if(x.z){for(i=0;i<m2;i+=2)for(j=0;j<n;j++){r[i]+=x[k++];r[1+i]+=x[k++]}}else for(i=0;i<m;i++)for(j=0;j<n;j++)r[i]+=x[k++];return r}
let ColSum=x=>{let m=x.m,n=x.n,r=x.z?zeroz(1,n):zeros(1,n),n2=r.length,i,j,k=0;for(i=0;i<m;i++)for(j=0;j<n2;j++)r[j]+=x[k++];return r}

let trans=A=>{if(A.z)return tranz(A);const m=A.m,n=A.n,S=64,d=zeros(n,m);if(m*n<256){for(let r=0,i=0;r<m;++r){for(let c=0;c<n;++c,++i)d[c*m+r]=A[i]}return d}for(let R=0;R<m;R+=S){const rr=Math.min(R+S,m);for(let C=0;C<n;C+=S){const cc=Math.min(C+S,n);for(let r=R;r<rr;++r){const r0=r*n;let i=C*m+r;for(let c=C;c<cc;++c){d[i]=A[r0+c];i+=m}}}}return d}
let tranz=x=>{let r=zeroz(x.n,x.m),i,j,m=x.n,n=x.m,n2=2*n,k=0;for(j=0;j<n2;j+=2)for(i=0;i<m;i++){r[i*n2+j]=x[k++];r[i*n2+j+1]=x[k++]}return r}
let dot=(A,B)=>{if(A.z&&!B.z)B=complex(B);else if(B.z&&!A.z)A=complex(A);return 1==A.m&&1==A.n?dotvv(A,B):1==A.n?dotmv(A,B):dotmm(A,B)}
let dotvv=(A,B)=>{errif(A.n!=B.m||A.length!=B.length,"conform");if(A.z)return dotvvz(A,B);let n=A.length,s=0;for(let i=0;i<n;i++)s+=A[i]*B[i];return s}
let dotvvz=(A,B)=>{errif(A.n!=B.m||A.length!=B.length,"conform");let n=A.length,x=0,y=0;for(let i=0;i<n;i+=2){x+=A[i]*B[i]-A[1+i]*B[1+i];y+=A[i]*B[1+i]+A[1+i]*B[i]};return[x,y]}
let dotmm=(A,B)=>{errif(A.n!=B.m,"conform");if(A.z)return dotmmz(A,B);let m=A.m,k=A.n,n=B.n,C=zeros(m,n);const S=64;for(let i0=0;i0<m;i0+=S){const ii=Math.min(i0+S,m);for(let j0=0;j0<n;j0+=S){const jj=Math.min(j0+S,n);for(let p0=0;p0<k;p0+=S){const pp=Math.min(p0+S,k);for(let i=i0;i<ii;++i){const aa=i*k,cc=i*n;for(let p=p0;p<pp;++p){const a=A[aa+p],bb=p*n;for(let j=j0;j<jj;++j)C[cc+j]+=a*B[bb+j]}}}}}return C}
let dotmv=(A,x)=>{errif(A.m!=x.length,"conform");if(A.z)return dotmvz(A,x);const m=A.m,n=A.n,y=zeros(m,1),S=64;for(let p0=0;p0<n;p0+=S){const pp=Math.min(p0+S,n);for (let i=0;i<m;++i){const a0=i*n;let s=0;for(let p=p0;p<pp;++p)s+=A[a0+p]*x[p];y[i]+=s}};return y}
let dotmmz=(A,B)=>{const m=A.m,k=A.n,n=B.n,C=zeroz(m,n),S=64;for(let i0=0;i0<m;i0+=S){const ii=Math.min(i0+S,m);for(let p0=0;p0<k;p0+=S){const pp=Math.min(p0+S,k);for(let j0=0;j0<n;j0+=S){const jj=Math.min(j0+S,n);
 for(let i=i0;i<ii;++i){const a0=(i*k)<<1,c0=(i*n)<<1;for(let p=p0;p<pp;++p){const ia=a0+(p<<1),ax=A[ia],ay=A[ia+1],b0=(p*n)<<1;for(let j=j0;j<jj;++j){const ib=b0+(j<<1),bx=B[ib],by=B[ib+1],ic=c0+(j<<1),x=ax*bx-ay*by,y=ax*by+ay*bx;C[ic]+=x;C[ic+1]+=y}}}}}}return C}
let dotmvz=(A,x)=>{const m=A.m,n=A.n,y=zeroz(m,1),S=64;for(let p0=0; p0<n;p0+=S){const pp=Math.min(p0+BS,n);for(let i=0;i<m;++i){const a0=(i*n)<<1;let sx=0,sy=0;for(let p=p0;p<pp;++p){const ia=a0+(p<<1),ax=A[ia],ay=A[ia+1],ix=p<<1,re=x[ix],im=x[ix+1];sx+=ax*re-ay*im;sy+=ax*im+ay*re};const iy=i<<1;y[iy]+=sx;y[iy+1]+=sy}};return y}

let norm2=z=>{let s=0,r=0,t;for(let i=0;i<z.length;i++){let x=z[i];if(x){x=abs(x);if(s<x){t=s/x;r=1+r*t*t;s=x}else{t=x/s;r+=t*t}}};return s*s*r}

let time=(f,n)=>{let t0=performance.now();if(n)while(n--)f();else f();return performance.now()-t0}

let ismat=x=>x.constructor==Float64Array&&("m"in x)&&("n"in x)
let mats=s=>{/*1.2 1a30 1+2i*/s=s.trim();let m=1,a=0,j=0;for(let i=0;i<s.length;i++){m+=s[i]=='\n';a+=s[i]=='a';j+=s[i]=='i'};if(j)s=s.replace("i", "").replace(/(?<=\d)([+-])/," $1");let r=new Float64Array(s.split(/[a\s]+/).map(s=>+s)),n=floor(r.length/m);errif(n*m!=r.length,"rectangular");if(a==r.length/2){n=a;r.z=1;for(let i=0;i<r.length;i+=2)[r[i],r[1+i]]=[r[i]*cos(r[1+i]*pi_),r[i]*sin(r[1+i]*pi_)]}else if(j==r.length/2){n=j;r.z=1}r.m=m;r.n=n;return r}
let snum=x=>{let a=abs(x)>1000||abs(x)<0.0001?x.toPrecision(6):x.toFixed(6),b=String(x);return b.length<a.length?b:a}
let znum=(x,y)=>{let r=hypot(x,y),a=atan2(y,x)/pi*180;if(a<0)a+=360;return snum(r)+"a"+a.toFixed(0).padStart(3,"0")}
let ser=x=>{if(ismat(x)){let s="",i,j,k=0;if(x.z){for(i=0;i<x.m;i++){for(j=0;j<2*x.n;j+=2)s+=(j?" ":"")+String(x[k++])+(x[k]<0?"":"+")+String(x[k++])+"i";s+="\n"}}else{for(i=0;i<x.m;i++){for(j=0;j<x.n;j++)s+=(j?" ":"")+String(x[k++]);s+="\n"}};return s};return "string"==typeof(x)?x:JSON.stringify(x)}
let smat=x=>{let M=100,N=100;if((!x)||x.constructor!=Float64Array)return String(x);let colpad=(x,j)=>{let l=max(...x.map(x=>x[j].length));x.forEach(x=>x[j]=x[j].padStart(l," "));return x}
 if(x.m&&x.n){let m=min(M,x.m),n=min(N,x.n),z=x.z||0,r=[],i,j;for(i=0;i<m;i++){r[i]=[];for(j=0;j<n;j++)r[i][j]=z?znum(x[i*2*x.n+2*j],x[i*2*x.n+2*j+1]):snum(x[i*x.n+j])};for(j=0;j<n;j++)colpad(r,j);r=r.map(x=>x.join(" "));for(i=0;i<m;i++)r[i]+=x.n>N?"..\n":"\n";return r.join("")+(x.m>M?"..\n":"")}
 else return Array.from(x.subarray(0,min(x.length,M))).map(snum).join(" ")+(x.length>M?"..":"")}

let fft=(x,ini)=>{ //fft([1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0]) or reuse: f=fft(8);fft([1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0],f)
 let init=N=>{let l=log2(N),P=Array(8).fill(0),n=1,S=new Float64Array(N),C=new Float64Array(N);for(let p=0;p<l;p++){for(let i=0;i<n;i++){P[i]<<=1;P[i+n]=1+P[i]};n<<=1};for(let i=0;i<N;i++){const p=-2*pi*i/N;C[i]=cos(p);S[i]=sin(p)};return[l,P,C,S,N]}
 let perm=(x,P)=>{P.forEach((p,i)=>{if(i<p){const a=2*i,b=1+a,c=2*p,d=1+c,A=x[a],B=x[b];x[a]=x[c];x[b]=x[d];x[c]=A;x[d]=B}})}
 if("number"==typeof x)return init(x);let[l,P,C,S,N]=ini?ini:init(x.length/2);perm(x,P);let n=1,s=N
 for(let p=1;p<=l;p++){s>>=1;for(let b=0;b<s;b++){const o=2*b*n;for(let k=0;k<n;k++){const i=(k+o)<<1,j=i+(n<<1),ks=k*s,kn=s*(k+n);let xi0=x[i],xi1=x[1+i],xj0=x[j];x[i]+=C[ks]*x[j]-S[ks]*x[1+j];x[1+i]+=C[ks]*x[1+j]+S[ks]*x[j];x[j]=xi0+C[kn]*x[j]-S[kn]*x[1+j];x[1+j]=xi1+C[kn]*x[1+j]+S[kn]*xj0}};n<<=1}
 return x}

let rfft2=(r,z,f)=>{let i,k,j=0,n=z.length;z=fft(z,f);for(i=0;i<n;j+=2,i++){k=i?2*n-j:0;r[i]=0.5*hypot(z[j]+z[k],z[1+j]-z[1+k]);r[i+n]=0.5*hypot(z[j]-z[k],z[1+j]+z[1+k])}}
let afft=(x,n)=>{let z=zeroz(n),r=zeros(2*n),y=zeros(n),n2=2*n;N=x.length,m=floor(N/(2*n)),s=1/m,i,j,f=fft(n);for(i=0;i<m;i++){for(j=0;j<n;j++){z[2*j]=x[i];z[2*j+1]=x[i+n]};rfft2(r,z,f);for(j=0;j<n;j++)y[j]+=r[j]+r[j+n]}return mulf(1/m,y)}



/*
let hanning=n=>ones(n) //todo
let spcgrm=(x,n,o,fs,fmi,fma)=>{
 let f=fft(n),l=x.length,m=ceil((l-n)/(n-o))&~1,n1=n-o,z=zeroz(n),r=zeros(m,n),h=hanning(n);
 let k,j=0,ii=0;for(i=0;i<m;i+=2,j+=2*n1){
  for(k=0;k<n;k++){z[2*k]=x[k];z[2*k+1]=x[k+n1]}z=fft(z,n);
//  for(k=0;k<n;k+=2){r[ii]=0.5*hypot(z[
 }
}
*/

/*
let qrz=A=>{A=copy(A);const n=A.length,m2=A[0].length
 let d=new Float64Array(2*n)
 for(let j=0;j<n;j++){let j2=2*j,j3=1+j2,Aj=A[j]
  let s=norm(Aj.subarray(j2)),h=s/hypot(Aj[j2],Aj[j3]);d[j2]=-h*Aj[j2];d[j3]=-h*Aj[j3];let f=sqrt(s*(s+hypot(Aj[j2],Aj[j3])));Aj[j2]-=d[j2];Aj[j3]-=d[j3]
  //better(Aii maybe 0): let s=norm(Aj.subarray(j2)),p=atan2(Aj[j3],Aj[j2]);d[j2]=-s*cos(p);d[j3]=-s*sin(p);let f=sqrt(s*(s+hypot(Aj[j2],Aj[j3])));Aj[j2]-=d[j2];Aj[j3]-=d[j3];
  for(let k=j2;k<m2;k++)Aj[k]/=f
  for(let i=1+j;i<n;i++){let a=0,b=0,Ai=A[i]
   for(let k2=j2;k2<m2;k2+=2){const k3=1+k2;a+=Aj[k2]*Ai[k2]+Aj[k3]*Ai[k3];b+=Aj[k2]*Ai[k3]-Aj[k3]*Ai[k2]}
   for(let k2=j2;k2<m2;k2+=2){const k3=1+k2;Ai[k2]-=Aj[k2]*a-Aj[k3]*b;Ai[k3]-=Aj[k2]*b+Aj[k3]*a}}}
 return[A,d]}
let qrzsolve=(Ad,x)=>{let[A,d]=Ad,m2=A[0].length
 for(let j=0;j<A.length;j++){let Aj=A[j],a=0,b=0
  for(let k2=2*j;k2<m2;k2+=2){const k3=1+k2;a+=Aj[k2]*x[k2]+Aj[k3]*x[k3];b+=Aj[k2]*x[k3]-Aj[k3]*x[k2]}
  for(let k2=2*j;k2<m2;k2+=2){const k3=1+k2;x[k2]-=Aj[k2]*a-Aj[k3]*b;x[k3]-=Aj[k2]*b+Aj[k3]*a}}
 for(let i=A.length-1;i>=0;i--){const i2=2*i,i3=1+i2
  for(let j=1+i;j<A.length;j++){const j2=2*j,j3=1+j2;x[i2]-=A[j][i2]*x[j2]-A[j][i3]*x[j3];x[i3]-=A[j][i2]*x[j3]+A[j][i3]*x[j2]}
  let[a,b]=zdiv(x[i2],x[i3],d[i2],d[i3]);x[i2]=a;x[i3]=b}
 return x.subarray(0,2*A.length)}
*/

let solve=(A,B)=>qrsolve_(A.qr?A:qr(trans(A)),trans(complex(B)))
let qr=A=>{errif(!A.z,"qr: A must be complex");errif(A.m>A.n,"A must be slender column major");
 let n=A.m,m2=2*A.n,i,j,k,d=zeroz(n)
 for(j=0;j<n;j++){let j2=2*j,j3=1+j2,Aj=A.subarray(j*m2,(1+j)*m2),s=sqrt(norm2(Aj)),r=hypot(Aj[j2],Aj[j3]),h=s/r;d[j2]=-h*Aj[j2];d[j3]=-h*Aj[j3];
  let f=sqrt(s*(s+r));Aj[j2]-=d[j2];Aj[j3]-=d[j3];
  for(k=j2;k<m2;k++)Aj[k]/=f;
  for(i=1+j;i<n;i++){let a=0,b=0,Ai=A.subarray(i*m2,(1+i)*m2);
   for(let k2=j2;k2<m2;k2+=2){const k3=1+k2;a+=Aj[k2]*Ai[k2]+Aj[k3]*Ai[k3];b+=Aj[k2]*Ai[k3]-Aj[k3]*Ai[k2]}
   for(let k2=j2;k2<m2;k2+=2){const k3=1+k2;Ai[k2]-=Aj[k2]*a-Aj[k3]*b;Ai[k3]-=Aj[k2]*b+Aj[k3]*a}}}return{qr:1,A:A,d:d}}
let qrsolve_=(Q,B)=>{let A=Q.A,d=Q.d,m=A.n,m2=2*m,n2=2*A.m,rhs=B.m,i,j,k,r,y=zeroz(A.m,rhs);errif(A.n!=B.n,"qrsolve: conform");
 for(r=0;r<rhs;r++){let x=B.subarray(r*m2,(1+r)*m2);
  for(j=0;j<m;j++){let Aj=A.subarray(j*m2,(1+j)*m2),a=0,b=0;
   for(let k2=2*j;k2<m2;k2+=2){const k3=1+k2;a+=Aj[k2]*x[k2]+Aj[k3]*x[k3];b+=Aj[k2]*x[k3]-Aj[k3]*x[k2]}
   for(let k2=2*j;k2<m2;k2+=2){const k3=1+k2;x[k2]-=Aj[k2]*a-Aj[k3]*b;x[k3]-=Aj[k2]*b+Aj[k3]*a}}
  for(i=m-1;i>=0;i--){const i2=2*i,i3=1+i2
   for(j=1+i;j<m;j++){const j2=2*j,j3=1+j2;x[i2]-=A[j][i2]*x[j2]-A[j][i3]*x[j3];x[i3]-=A[j][i2]*x[j3]+A[j][i3]*x[j2]}
   let[a,b]=zdiv(x[i2],x[i3],d[i2],d[i3]);x[i2]=a;x[i3]=b}
  for(i=0;i<n2;i++)y[i*rhs+r]=x[i]}return y}


// svd A:m n   U*S*VH  U:m m  S:m n  V:n n
let cond=A=>{let s=svd(A,1);return s.at(-1)/s[0]}
let svd=(A,s)=>svd_(copy(A),s),svdt=(A,s)=>svdt_(copy(A),s),svd_=(A,s)=>{errif(!A.z,"svd input must be complex");if(s)return svdt_(tranz(A),1);let[U,S,V]=svdt_(tranz(A),s);return[tranz(U),S,V]}
let svdt_=(A,s)=>{errif(A.m>A.n,"svd:matrix must be slender");let n=A.m,m=A.n,V=eyez(n),row=(A,i)=>A.subarray(i*2*A.n,(i+1)*2*A.n);
 let d=(x,y)=>{let a=0,b=0;for(let r=0;r<x.length;r+=2){const i=1+r;a+=x[r]*y[r]+x[i]*y[i];b+=x[r]*y[i]-x[i]*y[r]};return[a,b]}
 let J=(x,y,zr,zi)=>{let a=hypot(zr,zi),q=(norm2(y)-norm2(x))/(2*a),t=sign(q)/(abs(q)+sqrt(1+q*q)),c=1/sqrt(1+t*t);return[c,t*c*zr/a,t*c*zi/a]}
 let R=(c,sr,si,x,y)=>{for(let r=0;r<x.length;r+=2){const i=1+r;let xr=x[r],xi=x[i],yr=y[r],yi=y[i];x[r]=xr*c-yr*sr-yi*si;x[i]=xi*c+yr*si-yi*sr;y[r]=xr*sr-xi*si+yr*c;y[i]=xr*si+xi*sr+yi*c}}
 let F=A=>{for(let j=0;j<100;j++){for(let i=0;i<n-1;i++){for(let k=1+i;k<n;k++){let Ai=row(A,i),Ak=row(A,k),Vi=row(V,i),Vk=row(V,k);
  let[zr,zi]=d(Ai,Ak);if(1e-14>hypot(zr,zi))return;let[c,sr,si]=J(Ai,Ak,zr,zi);R(c,sr,si,Vi,Vk);R(c,sr,si,Ai,Ak)}}}};F(A)
 let S=zeros(n);for(let i=0;i<n;i++){let Ai=row(A,i);S[i]=sqrt(norm2(Ai));if(!s)mulf(1/S[i],Ai)}
 let g=grade(S);g.reverse();S=S.map((_,i)=>S[g[i]]);S.n=1;S.m=n;if(s)return S;
 let U=zeroz(n,m),W=zeroz(n,n);g.forEach((gi,i)=>{row(U,i).set(row(A,gi));row(W,i).set(row(V,gi))});return[U,S,conj_(W)]}
let svdtest=A=>{[U,S,V]=svd(A),AA=dot(dot(U,diag(S)),V);return Max(Abs(sub(A,AA)))}

//deno repl --eval-file=mat.js
