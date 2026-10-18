const pi=Math.PI,cos=Math.cos,sin=Math.sin,abs=Math.abs,hypot=Math.hypot,imul=Math.imul,zeros=n=>new Float64Array(n)
const fft=a=>{let n=a.length>>1,s=a,d=zeros(2*n),r=n>>1,l=1;while(r){let p=-pi/l,u=cos(p),v=sin(p),x=1,y=0;
 for(let j=0;j<l;j++){let m=j*r,m2=2*m;for(let k=m2;k<r+m2;k++,m++){
  let ar=s[2*k],ai=s[2*k+1],br=s[2*(k+r)],bi=s[2*(k+r)+1],tr=x*br-y*bi,ti=x*bi+y*br,mm=2*m;d[mm]=ar+tr;d[1+mm]=ai+ti;d[mm+n]=ar-tr;d[1+mm+n]=ai-ti;}
 let t=x*u-y*v;y=x*v+y*u;x=t;}[s,d]=[d,s];r>>=1;l<<=1;}return s}
const rfft=x=>{let n=x.length,m=n>>1,k,r=zeros(n),a,b=zeros(n);b.set(x);a=fft(b);r[0]=a[0]+a[1];
 for(k=1;k<m;k++){let q=m-k,k2=2*k,c=a[k2],d=a[k2+1],e=a[2*q],f=-a[2*q+1],g=c-e,h=d-f,p=-2*pi*k/n,t=cos(p),u=sin(p),v=t*g-u*h,w=t*h+u*g;r[k2]=0.5*(c+e+w);
  r[k2+1]=0.5*(d+f-v);}return r}

let n=+Deno.args[0],s=n
const q=1/32768,rng=()=>(s=(imul(1103515245,s)+12345)>>>0,s>>>16)
let x=zeros(n);for(let i=0;i<n;i++)x[i]=q*rng()-1;
let z=rfft(x),m=(n>>1)-1,_n=2/n,a=zeros(m);for(let i=0;i<m;i++)a[i]=_n*(i?hypot(z[2*i],z[2*i+1]):abs(z[0]));

let grade=x=>Array.from(x.keys()).sort((a,b)=>x[b]-x[a])
let k=grade(a).slice(0,10)
console.log(k.map(k=>k.toFixed(1)+"\t"+a[k].toFixed(9)).join("\n"))

//deno fft.js 8388608
