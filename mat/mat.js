let sin=Math.sin,cos=Math.cos,atan2=Math.atan2,sqrt=Math.sqrt,abs=Math.abs,hypot=Math.hypot,log=Math.log,log10=Math.log10,log2=Math.log2,exp=Math.exp,sign=Math.sign,floor=Math.floor,ceil=Math.ceil,round=Math.round,min=Math.min,max=Math.max,random=Math.random;const pi=Math.PI,pi_=pi/180,_pi=180/pi
let map=(a,f,z)=>{errif(a.z&&!z,"map not defined for complex: "+f);let i,r=a.z?zeroz(a.m,a.n):zeros(a.m,a.n);if(a.z){for(i=0;i<a.length;i+=2)[r[i],r[1+i]]=z(a[i],a[1+i])}else{for(i=0;i<a.length;i++)r[i]=f(a[i])}return r}
let Sin=x=>map(x,sin),Cos=x=>map(x,cos),Sqrt=x=>map(x,sqrt),Log=x=>map(x,log),Log10=x=>map(x,log10),Log2=x=>map(x,log2),Exp=x=>map(x,exp),Sign=x=>map(x,sign),Floor=x=>map(x,floor),Ceil=x=>map(x,ceil),Round=x=>map(x,round),Sqr=x=>map(x,x=>x*x,(x,y)=>[x*x-y*y,2*x*y]),neg=x=>map(x,x=>-x)
let zdiv=(xr,xi,yr,yi)=>{let r=0,d=0,e=0,f=0;if(abs(yr)>=abs(yi)){r=yi/yr;d=yr+r*yi;e=(xr+xi*r)/d;f=(xi-xr*r)/d}else{r=yr/yi;d=yi+r*yr;e=(xr*r+xi)/d;f=(xi*r-xr)/d};return[e,f]}
let zinv=(a,b)=>{let r,d;if(abs(a)>abs(b)){r=b/a;d=a+b*r;return[1/d,-r/d]}else{r=a/b;d=b+a*r;return[r/d,-1/d]}}
let errif=(x,e)=>{if(x)throw new Error(e)},conform=(x,y)=>errif(x.m!=y.m||x.n!=y.n,"conform")

let copy=A=>{if(istab(A)){let d={};keys(A).forEach(k=>d[k]=copy(A[k]));return d};let r=A.slice();r.m=A.m;r.n=A.n;r.z=A.z;return r}
let zeros=(m,n)=>{n=n||1;let r=new Float64Array(  m*n);r.m=m;r.n=n;return r}
let zeroz=(m,n)=>{n=n||1;let r=new Float64Array(2*m*n);r.m=m;r.n=n;r.z=1;return r}
let mat=(m,n,a)=>{if(Array.isArray(m)&&n==undefined)return(mat(m.length,m[0].length,m.flat()));let r=a.length&&a.length==2*m*n?zeroz(m,n):zeros(m,n);isnum(a)?r.fill(a):r.set(a);return r}
let rowmat=a=>mat(1,a.length,a),colmat=a=>mat(a.length,1,a)
let ravel=A=>ravel_(copy(A)),ravel_=A=>(A.n*=A.m,A.m=1,A)
let vcat=(...A)=>{let a=A.length;if(!a)return zeros(0,0);if(istab(A[0]))return vcatt(...A);let z=A[0].z,m=A[0].m,n=A[0].n,i;for(i=1;i<a;i++){errif(z!=A[i].z||n!=A[i].n,"conform");m+=A[i].m};let r=z?zeroz(m,n):zeros(m,n),k=0;for(i=0;i<a;i++){r.set(A[i],k);k+=A[i].length}return r}
let hcat=(...A)=>{let a=A.length;if(!a)return zeros(0,0);if(istab(A[0]))return hcatt(...A);let z=A[0].z,m=A[0].m,n=A[0].n,i;for(i=1;i<a;i++){errif(z!=A[i].z||m!=A[i].m,"conform");n+=A[i].n};let r=z?zeroz(m,n):zeros(m,n),j,k=0,s=z?2:1;for(i=0;i<m;i++)for(j=0;j<a;j++){let n2=s*A[j].n;r.set(A[j].subarray(i*n2,n2+i*n2),k);k+=n2};return r}
let reshape=(A,m,n)=>reshape_(copy(A),m,n),reshape_=(A,m,n)=>{let mn=A.m*A.n;if(n==undefined)m<0?(m=mn/-m,n=mn/m):n=mn/m;m=floor(m);n=floor(n);errif(A.m*A.n!=m*n,"reshape");A.m=m;A.n=n;return A}
let rand=(m,n)=>{let r=zeros(m,n),i;for(i=0;i<r.length;i++)r[i]=random();return r}
let randz=(m,n)=>{let x=zeroz(m,n),N=x.length,i;for(let i=0;i<N;i+=2){let r=sqrt(min(1489,-2*log(random()))),p=random()*2*pi;x[i]=r*cos(p);x[1+i]=r*sin(p)};return x}
let randn=(m,n)=>{n=n||1;let x=randz(1,((m*n)>>1)+(1&(m*n)));x=x.subarray(0,m*n);x.m=m;x.n=n;x.z=0;return x}
let eye=n=>{let r=zeros(n,n),nn=n*n,n1=1+n;for(let i=0;i<nn;i+=n1)r[i]=1;return r}
let eyez=n=>{let r=zeroz(n,n),nn=2*n*n,n1=2+2*n;for(let i=0;i<nn;i+=n1)r[i]=1;return r}
let ones=(m,n)=>{let r=zeros(m,n);for(let i=0;i<r.length;i++)r[i]=1;return r}
let onez=(m,n)=>{let r=zeroz(m,n);for(let i=0;i<r.length;i+=2)r[i]=1;return r}
let diag=x=>{if(x.m==1||x.n==1){let m=max(x.m,x.n),m2=1+2*m,r=x.z?zeroz(m,m):zeros(m,m),i,j=0;if(x.z){for(i=0;i<x.length;j+=m2){r[j]=x[i++];r[++j]=x[i++]}}else for(i=0;i<x.length;++i,j+=1+m)r[j]=x[i];return r};let m=min(x.m,x.n),n1=1+x.n,n2=2+2*x.n,r=x.z?zeroz(m,1):zeros(m,1),i,j=0;if(x.z){for(i=0;i<2*m;++i,j+=n2){r[i]=x[j];r[++i]=x[1+j]}}else for(i=0;i<m;i++,j+=n1)r[i]=x[j];return r}
let tri=(A,u)=>{let z=A.z,t=min(A.m,A.n),t2=z?2*t:t,n=A.n,n2=z?2*n:n,T=z?zeroz(t,t):zeros(t,t),i,j;if(u){for(i=0;i<t;i++)for(j=(z?2*i:i);j<t2;j++)T[i*t2+j]=A[i*n2+j]}else{for(i=0;i<t;i++)for(j=0;j<=(z?2*i+1:i);j++)T[i*t2+j]=A[i*n2+j]}return T}
let til=(m,n)=>{let r=zeros(m,n);for(let i=0;i<r.length;i++)r[i]=i;return r},range=(x,y)=>{let r=til(y-x),i;for(i=0;i<r.length;i++)r[i]+=x;return r}
let grade=x=>Array.from(x.keys()).sort((a,b)=>x[a]<x[b]?-1:x[a]>x[b]?1:x[a]-x[b]) //strings or numbers
let dims=A=>{let r=zeros(1,2);if(istab(A)){r[0]=keys(A).length,r[1]=tabcount(A)}else{r[0]=A.m;r[1]=A.n};return r}
let len=x=>istab(x)?tabcount(x):x.length
let real=(A,o)=>{if(!A.z)return A;o=o||0;let r=zeros(A.m,A.n),n=r.length;for(let i=0;i<n;i++)r[i]=A[2*i+o];return r},imag=A=>real(A,1);
let complex=(A,B)=>{B=B||0;if(!ismat(A))return[A,B];if(A.z&&!B)return A;let f=r=>{let i,k=0;for(i=0;i<r.length;i+=2,k++){r[i]=A[k];r[i+1]=B[k]}return r},g=r=>{let i,k=0;for(i=0;i<r.length;i+=2,k++){r[i]=A[k];r[i+1]=B}return r},h=r=>{let i,k=0;for(i=0;i<r.length;i+=2,k++){r[i]=A;r[i+1]=B[k]}return r};return ismat(A)?(ismat(B)?f(zeroz(A.m,A.n)):g(zeroz(A.m,A.n))):h(zeroz(B.m,B.n))}
let conj=A=>{let r=zeroz(A.m,A.n);r.set(A);return conj_(r)},conj_=A=>{for(let i=1;i<A.length;i+=2)A[i]=-A[i];return A}
let herm=A=>conj_(tranz(A))
let phase=A=>{if(!ismat(A))return isnum(A)?0:atan2(A[1],A[0]);if(!A.z)return zeros(A.m,A.n);let r=zeros(A.m,A.n),i,k=0;for(i=0;i<A.length;i+=2,k++)r[k]=atan2(A[1+i],A[i]);return r}
let angle=A=>{if(!ismat(A)){let r=_pi*phase(A);return r<0?360+r:r};let r=phase(A);for(let i=0;i<r.length;i++)r[i]=r[i]<0?360+r[i]*_pi:r[i]*_pi;return r}

let index=(A,i,j)=>{if(j==undefined){return isnum(i)?(i<0?til(A.n*A.m):mat([[i]])):i};i=isnum(i)?(i<0?til(A.m):[i]):i;j=isnum(j)?(j<0?til(A.n):[j]):j;let N=A.n,m=i.length,n=j.length,r=zeros(m,n),a,b,k=0;for(a=0;a<m;a++)for(b=0;b<n;b++)r[k++]=i[a]*N+j[b];return r}
let where=(A,f)=>{if(istab(A))return tabwhere(A,f);let r=[],m=A.m,n=A.n,i,k=0;if(A.z){n>>=1;for(i=0;i<m;i++)for(j=0;j<n;j++,k+=2)if(f([A[k],A[k]],i,j))r.push(k>>1)}else{for(i=0;i<m;i++)for(j=0;j<n;j++)if(f(A[k++],i,j))r.push(k-1)}return mat([r])}
let at=(A,i,j)=>{if(istab(A))return att(A,i,j);let x=index(A,i,j),r=A.z?zeroz(x.m,x.n):zeros(x.m,x.n),k;if(A.z){for(k=0;k<r.length;k++){j=2*x[k];r[2*k]=A[j];r[2*k+1]=A[1+j]}return r};for(k=0;k<r.length;k++)r[k]=A[x[k]];return r}
let set=(A,i,j,y)=>{if(y==undefined){[y,j]=[j,y]}let x=index(A,i,j),ii,k=0;if(ismat(y)){errif(y.length!=(A.z?2:1)*x.length,"conform");x.forEach(A.z?(i,k)=>{A[2*i]=y[2*k];A[2*i+1]=y[2*k+1]}:(i,k)=>A[i]=y[k]);return A}x.forEach(A.z?i=>{A[2*i]=y[0];A[2*i+1]=y[1]}:i=>A[i]=y);return A}
let row=(A,i)=>at(A,i,-1),col=(A,i)=>at(A,-1,i),setrow=(A,i,y)=>set(A,i,-1,y),setcol=(A,i,y)=>set(A,-1,i,y)

let scalar=(x,y,F,f,Z,z,a,b)=>ismat(x)?(conform(x,y),y.z?(Z(x,copy(y))):F(x,copy(y))):ismat(y)?y.z?z(x,copy(y)):f(x,copy(y)):
 isnum(x)?a(x,y):b(x,y)
let add=(x,y)=>scalar(x,y,addF,addf,addZ,addz,(x,y)=>x+y,(x,y)=>[x[0]+y[0],x[1]+y[1]])
let addF=(x,y)=>{for(let i=0;i<y.length;i++)y[i]+=x[i];return y},addZ=addF
let addf=(x,y)=>{for(let i=0;i<y.length;i++)y[i]+=x;return y}
let addz=(x,y)=>{let[a,b]=x;for(let i=0;i<y.length;i+=2){y[i]+=a;y[1+i]+=b}return y}
let sub=(x,y)=>scalar(x,y,subF,subf,subZ,subz,(x,y)=>x-y,(x,y)=>[x[0]-y[0],x[1]-y[1]])
let subF=(x,y)=>{for(let i=0;i<y.length;i++)y[i]-=x[i];return y},subZ=subF
let subf=(x,y)=>{for(let i=0;i<y.length;i++)y[i]-=x;return y}
let subz=(x,y)=>{let[a,b]=x;for(let i=0;i<y.length;i+=2){y[i]-=a;y[1+i]-=b}return y}
let mul=(x,y)=>scalar(x,y,mulF,mulf,mulZ,mulz,(x,y)=>x*y,(x,y)=>[x[0]*y[0]-x[1]*y[1],x[0]*y[1]+x[1]*y[0]])
let mulF=(x,y)=>{for(let i=0;i<y.length;i++)y[i]*=x[i];return y}
let mulf=(x,y)=>{for(let i=0;i<y.length;i++)y[i]*=x;return y}
let mulZ=(x,y)=>{for(let i=0;i<y.length;i+=2){let a=x[i],b=x[1+i],c=y[i],d=y[1+i];y[i]=a*c-b*d;y[1+i]=a*d+b*c}return y}
let mulz=(x,y)=>{let[a,b]=x;for(let i=0;i<y.length;i+=2){let c=y[i],d=y[1+i];y[i]=a*c-b*d;y[1+i]=a*d+b*c}return y}
let div=(x,y)=>scalar(x,y,divF,(x,y)=>mulf(1/x,y),divZ,(x,y)=>mulz(zinv(x[0],x[1]),y),(x,y)=>x/y,zdiv)
let divF=(x,y)=>{for(let i=0;i<y.length;i++)y[i]/=x[i];return y}
let divZ=(x,y)=>{for(let i=0;i<y.length;i+=2)[y[i],y[1+i]]=zdiv(x[i],x[1+i],y[i],y[1+i]);return y}

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

let ismat=x=>x&&x.constructor==Float64Array&&("m"in x)&&("n"in x),isnum=x=>"number"==typeof x,isint=Number.isInteger,isstr=x=>"string"==typeof x
let istab=x=>x&&"object"==typeof x&&Object.getPrototypeOf(x)==Object.prototype
let mats=s=>{/*1.2 1a30 1+2i*/s=s.trim();let m=1,a=0,j=0;for(let i=0;i<s.length;i++){m+=s[i]=='\n';a+=s[i]=='a';j+=s[i]=='i'};if(j)s=s.replace("i", "").replace(/(?<=\d)([+-])/," $1");let r=new Float64Array(s.split(/[a\s]+/).map(s=>+s)),n=floor(r.length/m);errif(n*m!=r.length,"rectangular");errif(a&&a!=r.length/2,"a-separator");errif(j&&j!=r.length/2,"j-separator");if(a==r.length/2){n>>=1;r.z=1;for(let i=0;i<r.length;i+=2)[r[i],r[1+i]]=[r[i]*cos(r[1+i]*pi_),r[i]*sin(r[1+i]*pi_)]}else if(j==r.length/2){n>>=1;r.z=1}r.m=m;r.n=n;return r}
let _360=s=>s.startsWith("360")?s.slice(2):s,snme3_=a=>{let e=floor(log10(a)),r=(e%3+3)%3,E=e-(r>=0?r:r+3),A=abs(E),m=a/10**E,s=E>=0?'+':'',p=6-abs(r)-(A>99?2:A>9?1:0);return m.toFixed(p)+"e"+s+E} //
let snum0=x=>{if(x<0)return"-"+snum0(-x);let f=n=>x.toFixed(n),e=()=>snme3_(x)/*x.toExponential(4)*/;return isNaN(x)?"nan":!isFinite(x)?"inf":x>=1e4?e():x&&x<=1e-2?e():f(5)}
let znum0=(x,y)=>{let r=hypot(x,y),a=atan2(y,x)/pi*180;if(a<0)a+=360;return snum(r)+"°"+_360(a.toFixed(0)).padStart(3,"0")}
let znuma=(n)=>(x,y)=>{let r=hypot(x,y),a=atan2(y,x)/pi*180;if(a<0)a+=360;return snum(r)+"°"+_360(a.toFixed(n))}
let znumi=(x,y)=>snum(x)+(y<0?"":"+")+snum(y)+"i",znumz=(x,y)=>snum(x)+" "+snum(y),snum=snum0,znum=znum0
let ser=x=>{if(ismat(x)){let s="",i,j,k=0;if(x.z&&znum==znumz){for(i=0;i<x.m;i++){for(j=0;j<2*x.n;j+=2)s+=(j?" ":"")+String(x[k++])+" "+String(x[k++]);s+="\n"}}else if(x.z){for(i=0;i<x.m;i++){for(j=0;j<2*x.n;j+=2)s+=(j?" ":"")+String(x[k++])+(x[k]<0?"":"+")+String(x[k++])+"i";s+="\n"}}else{for(i=0;i<x.m;i++){for(j=0;j<x.n;j++)s+=(j?" ":"")+String(x[k++]);s+="\n"}};return s};return isstr(x)?x:JSON.stringify(x)}
let format=s=>{//-1(max) 0(default) 0.3(fixed) 3(prec) 1a(1.23@90.1) "i"(1.234+5.678i) "z"(1.234 5.678)
 if(isnum(s)){s<0?(snum=String):s==0?(snum=snum0,znum=znum0):s<1?(snum=isint(10*s)?x=>x.toFixed(10*s):x=>x.toFixed(100*s)):snum=x=>x.toPrecision(s);return}
 if(isstr(s)){s=="i"?znum=znumi:s=="z"?znum=znumz:errif(1,"format");return};if(2==s.length&&isint(s[0]))znum=znuma(s[0]);errif(1,"format")}
let scol_=(r,x,s,mi)=>{let z=x.z,m=r.length,i,a=Array(m).fill("");if((!z)&&snum==snum0&&x.every(x=>isint(x)&&abs(x)<1e6))a=Array.from(x).map(String);else for(i=0;i<m;i++)a[i]=z?znum(x[2*i],x[1+2*i]):snum(x[i]);let n=max(mi||0,max(...a.map(x=>x.length)));for(i=0;i<m;i++)r[i]+=s+(" ".repeat(n-a[i].length))+a[i];return r}
let smat=(x,L,C)=>{if(!ismat(x))return"(no mat)";if(!(x.m*x.n))return"(empty "+x.m+"x"+x.n+")";C=C||80;L=L||20;let ld="";L=x.m>L?(ld="\n.. ("+x.m+"x"+x.n+")",L-1):x.m;
 let r=Array(L).fill(""),i,rd=0;for(i=0;i<x.n;i++){if(r[0].length>=C){rd=1;break};scol_(r,at(x,til(L),i),i?" ":"")};
 r=r.map(x=>rd||x.length>C?x.slice(0,C-1)+"·":x);return r.join("\n")+ld}
 
let table=(k,v)=>{let d={};k.forEach((k,i)=>d[k]=copy(v[i]));return d},keys=Object.keys,vals=Object.values
let tabcount=t=>{let k=keys(t);if(!k.length)return 0;let v=t[k[0]];return ismat(v)&&v.z?v.length>>1:v.length}
let stab=(t,L,C)=>{if(!istab(t))return"(no table)";let k=keys(t),tc=tabcount(t);if(!k.length)return"(empty table)";C=C||80;L=L||20;L-=2;let ld="";L=tc>L?(ld="\n.."+tc+"rows "+k.length+"cols",L-1):tc;
 let sn=(s,n)=>{let a=(n>>1)-1,b=n-a-2;return s.length>n?s.slice(0,a)+".."+s.slice(-(1+b),-1):s},pe=(n,x)=>x.padEnd(n," "),l=til(L),r=Array(L).fill(""),c=0,n=0,nc=[];
 for(i=0;i<k.length;i++,n++){let ln,v=t[k[i]],nk=min(k[i].length,10);if(r[0].length>=C){rd=1;break};scol_(r,tc<L?(ismat(v)?at(v,l,0):v.slice(0,L)):v,i?"│":"",nk);nc.push(i?r[0].length-nl-1:r[0].length);nl=r[0].length}
 r.splice(0,0,nc.map(x=>"─".repeat(x)).join("┼"));r.splice(0,0,nc.map((n,i)=>k[i].length<n-1?pe(n," "+k[i]):pe(n,sn(k[i],n))).join("│"));return r.join("\n")+ld}
let hcatt=(...T)=>{let tc=tabcount(T[0]),d={};errif(!T.every(x=>istab(x||tabcount(x)!=tc),"hcat table"));let ren=s=>{console.log("ren",s,!d[s]);if(!d[s])return s;let i=0;while(i<1e4&&d[s+"_"+i])i++;return s+"_"+i};T.forEach(t=>{let k=keys(t);k.forEach(k=>d[ren(k)]=copy(t[k]))});return d}
let vcatt=(...T)=>{let t0=T[0],i,k=keys(t0),sk=k.join(","),d={};errif(!T.every(x=>istab(x)&&keys(x).join(",")==sk),"vcat table");k.forEach(k=>{let v;T.forEach((t,i)=>v=i?(ismat(v)?vcat(v,t[k]):v=[...v,...t[k]]):copy(t0[k]));d[k]=v});return d}
let tabwhere=(t,f)=>{let tc=tabcount(t),k=keys(t);if(isstr(f))f=new Function(...["i",...k,"return "+f]);let z=k.map(k=>ismat(t[k])&&t[k].z),r=[],i;for(i=0;i<tc;i++)if(f(i,...k.map((k,j)=>z[j]?[t[k][2*i],t[k][2*i+1]]:t[k][i])))r.push(i);return(mat(r.length,1,r))}
let att=(t,i,j)=>{if(j==undefined||j==-1)j=keys(t);if(isstr(j))j=[j];let d={};
 if(i==-1){j.forEach(j=>d[j]=copy(t[j]));}
 else if(isnum(i)){i|=0;errif(i<0||i>n,"rowindex");keys(t).forEach(k=>{let v=t[k];d[k]=ismat(v)&&v.z?[v[2*i],v[2*i+1]]:v[i]})}
 else{j.forEach(j=>d[j]=at(t[j],i))};return d
}
let select=(t,...c)=>{let d={};c.forEach(k=>d[k]=copy(t[k]));return d}

//stockham
let fft=z=>fft_(copy(z)),fft_=a=>{let n=a.length>>1,s=a,d=zeroz(a.m,a.n),r=n>>1,l=1;while(r){let p=-pi/l,u=cos(p),v=sin(p),x=1,y=0;for(let j=0;j<l;j++){let m=j*r,m2=2*m;for(let k=m2;k<r+m2;k++,m++){let ar=s[2*k],ai=s[2*k+1],br=s[2*(k+r)],bi=s[2*(k+r)+1],tr=x*br-y*bi,ti=x*bi+y*br,mm=2*m;d[mm]=ar+tr;d[1+mm]=ai+ti;d[mm+n]=ar-tr;d[1+mm+n]=ai-ti;}let t=x*u-y*v;y=x*v+y*u;x=t;}[s,d]=[d,s];r>>=1;l<<=1;}return s}
let rfft=x=>{let n=x.length,m=n>>1,k,r=zeroz(m,1),a,b=zeroz(m,1);b.set(x);a=fft_(b);r[0]=a[0]+a[1];for(k=1;k<m;k++){let q=m-k,k2=2*k,c=a[k2],d=a[k2+1],e=a[2*q],f=-a[2*q+1],g=c-e,h=d-f,p=-2*pi*k/n,t=cos(p),u=sin(p),v=t*g-u*h,w=t*h+u*g;r[k2]=0.5*(c+e+w);r[k2+1]=0.5*(d+f-v);}return r}
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


let solve=(A,B)=>qrsolve_(A.qr?A:qr(A),trans(complex(B)))
let qr=A=>qrt(trans(A)),qrt=A=>{errif(!A.z,"qr: A must be complex");errif(A.m>A.n,"A must be slender column major");let n=A.m,m2=2*A.n,i,j,k,d=zeroz(n);
 for(j=0;j<n;j++){let j2=2*j,j3=1+j2,Aj=A.subarray(j*m2,(1+j)*m2),s=sqrt(norm2(Aj.subarray(j2))),r=hypot(Aj[j2],Aj[j3]);if(r>1e-15){let h=s/r;d[j2]=-h*Aj[j2];d[j3]=-h*Aj[j3]}else{d[j2]=-1};let f=sqrt(s*(s+r));Aj[j2]-=d[j2];Aj[j3]-=d[j3];for(k=j2;k<m2;k++)Aj[k]/=f;
  for(i=1+j;i<n;i++){let a=0,b=0,Ai=A.subarray(i*m2,(1+i)*m2);
   for(let k2=j2;k2<m2;k2+=2){const k3=1+k2;a+=Aj[k2]*Ai[k2]+Aj[k3]*Ai[k3];b+=Aj[k2]*Ai[k3]-Aj[k3]*Ai[k2]}
   for(let k2=j2;k2<m2;k2+=2){const k3=1+k2;Ai[k2]-=Aj[k2]*a-Aj[k3]*b;Ai[k3]-=Aj[k2]*b+Aj[k3]*a}}}return{qr:1,A:A,d:d}}
let rqr=q=>{let A=q.A,d=q.d,R=tri(A,0),n=A.m,n2=2*n,i,k=0;for(i=0;i<n;i++,k+=n2){R[k++]=d[2*i];R[k++]=d[2*i+1]};return R}  //rqr(R from qr), qrqmul(rt=Q*BT) for svd not qrsolve (apply hhvectors in reverse order)
let qrqmul=(q,B)=>{let A=q.A,m=A.n,m2=2*m,n=A.m,mB2=2*B.n,rhs=B.m,x=zeroz(m,1),y=zeroz(rhs,m),r,j,k2;for(r=0;r<rhs;r++){x.fill(0);x.set(B.subarray(r*mB2,(1+r)*mB2));for(j=n-1;j>=0;j--){let Aj=A.subarray(j*m2,(1+j)*m2),a=0,b=0;for(let k2=2*j;k2<m2;k2+=2){const k3=1+k2;a+=Aj[k2]*x[k2]+Aj[k3]*x[k3];b+=Aj[k2]*x[k3]-Aj[k3]*x[k2]};for(let k2=2*j;k2<m2;k2+=2){const k3=1+k2;x[k2]-=Aj[k2]*a-Aj[k3]*b;x[k3]-=Aj[k2]*b+Aj[k3]*a}}y.subarray(r*m2,(1+r)*m2).set(x)};return y}
let qrsolve_=(Q,B)=>{let A=Q.A,d=Q.d,m=A.n,m2=2*m,n=A.m,n2=2*A.m,rhs=B.m,i,j,k,r,y=zeroz(A.m,rhs);errif(A.n!=B.n,"qrsolve: conform");
 for(r=0;r<rhs;r++){let x=B.subarray(r*m2,(1+r)*m2);for(j=0;j<n;j++){let Aj=A.subarray(j*m2,(1+j)*m2),a=0,b=0;for(let k2=2*j;k2<m2;k2+=2){const k3=1+k2;a+=Aj[k2]*x[k2]+Aj[k3]*x[k3];b+=Aj[k2]*x[k3]-Aj[k3]*x[k2]};for(let k2=2*j;k2<m2;k2+=2){const k3=1+k2;x[k2]-=Aj[k2]*a-Aj[k3]*b;x[k3]-=Aj[k2]*b+Aj[k3]*a}}
  for(i=n-1;i>=0;i--){const i2=2*i,i3=1+i2;for(j=1+i;j<n;j++){const j2=2*j,j3=1+j2,ji=j*m2+i2;x[i2]-=A[ji]*x[j2]-A[ji+1]*x[j3];x[i3]-=A[ji]*x[j3]+A[ji+1]*x[j2]};let[a,b]=zdiv(x[i2],x[i3],d[i2],d[i3]);x[i2]=a;x[i3]=b};for(i=0;i<n2;i+=2){y[i*rhs+2*r]=x[i];y[i*rhs+2*r+1]=x[1+i]}}return y}
let qrtest=_=>{A=randz(10,4),X=randz(4,2),B=dot(A,X);return Max(sub(X,solve(A,B)))}

// svd A:m n   U*S*VH  U:m m  S:m n  V:n n
let cond=A=>{let s=svd(A,1);return s.at(-1)/s[0]}
let svd=(A,s)=>svd_(copy(A),s),svd_=(A,s)=>{errif(!A.z,"svd input must be complex");errif(!A.m,"empty svd");if(A.m<A.n){A=conj(A);if(s)return svdt_(A,1);let[U,S,V]=svdt_(A);return[V,S,tranz(U)]};if(s)return svdt_(tranz(A),1);let[U,S,V]=svdt_(tranz(A));return[tranz(U),S,V]}
let svdqr=(A,s)=>{let q=qrt(A),R=rqr(q);if(s)return svdt_(R,s);let[U1,S,V]=svdt_(R);return[qrqmul(q,U1),S,V]}
let svdt_=(A,s)=>{errif(A.m>A.n,"svd:matrix must be slender");let n=A.m,m=A.n,V=eyez(n),row=(A,i)=>A.subarray(i*2*A.n,(i+1)*2*A.n);   //A(column major), returns UT,diag(S),V(not VH)
 if(A.n>A.m)return svdqr(A,s);
 let d=(x,y)=>{let a=0,b=0;for(let r=0;r<x.length;r+=2){const i=1+r;a+=x[r]*y[r]+x[i]*y[i];b+=x[r]*y[i]-x[i]*y[r]};return[a,b]}
 let J=(x,y,zr,zi)=>{let a=hypot(zr,zi),q=(norm2(y)-norm2(x))/(2*a),t=sign(q)/(abs(q)+sqrt(1+q*q)),c=1/sqrt(1+t*t);return[c,t*c*zr/a,t*c*zi/a]}
 let R=(c,sr,si,x,y)=>{for(let r=0;r<x.length;r+=2){const i=1+r;let xr=x[r],xi=x[i],yr=y[r],yi=y[i];x[r]=xr*c-yr*sr-yi*si;x[i]=xi*c+yr*si-yi*sr;y[r]=xr*sr-xi*si+yr*c;y[i]=xr*si+xi*sr+yi*c}}
 let F=A=>{for(let j=0;j<100;j++){for(let i=0;i<n-1;i++){for(let k=1+i;k<n;k++){let Ai=row(A,i),Ak=row(A,k),Vi=row(V,i),Vk=row(V,k);
  let[zr,zi]=d(Ai,Ak);if(1e-14>hypot(zr,zi))return;let[c,sr,si]=J(Ai,Ak,zr,zi);R(c,sr,si,Vi,Vk);R(c,sr,si,Ai,Ak)}}}};F(A)
 let S=zeros(n);for(let i=0;i<n;i++){let Ai=row(A,i);S[i]=sqrt(norm2(Ai));if(!s)mulf(1/S[i],Ai)}
 let g=grade(S);g.reverse();S=S.map((_,i)=>S[g[i]]);S.n=1;S.m=n;if(s)return S;
 let U=zeroz(n,m),W=zeroz(n,n);g.forEach((gi,i)=>{row(U,i).set(row(A,gi));row(W,i).set(row(V,gi))});return[U,S,tranz(W)]}
let svdtest=()=>{let A=randz(5,3),[U,S,V]=svd(A),AA=dot(dot(U,diag(S)),herm(V));return Max(Abs(sub(A,AA)))}

/*
let A=complex(mat([[1,-2,2],[1,4,-4],[1,-3,3]]))
let[U,S,V]=svd(A)
let r=mulf(1/S[0],S).filter(x=>x>0.01).length
let V1=col(V,til(r))
Sqr(Abs(V1))
console.log("V1",V1)
*/


let time=(f,n)=>{n=n||1;let t0=performance.now();while(n-->0)f();return performance.now()-t0}


let testmat=()=>{let r="";[qrtest,svdtest].forEach(f=>{console.log(f.name);let e=f();errif(e>1e-14,f.name);r+=`${f.name}: ${e}\n`});return r}
//deno repl --eval-file=mat.js



