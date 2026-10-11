let istab=x=>x&&"object"==typeof x&&Object.getPrototypeOf(x)==Object.prototype
let keys=Object.keys,vals=Object.vals

let stab=t=>{let M=100,N=20,k=keys(t),n=min(N,k.length),dots=0,r=[];if(n==0)return"empty table"
 let sn=(s,n)=>{let a=(n>>1)-1,b=n-a-2;return s.length>n?s.slice(0,a)+".."+s.slice(-(1+b),-1):s}
 let sz=(x,m)=>{let r=[];for(let i=0;i<m;i++)r[i]=znum(x[2*i],x[1+2*i]);return r}
 for(let i=0;i<n;i++){let v=t[k[i]],m=min(v.length,M);dots=v.length>(v.z?2*m:m);r[i]=ismat(v)&&v.z?sz(v,m):ismat(v)?Array.from(v.slice(0,m)).map(snum):v.slice(0,m).map(x=>sn(String(x),max(10,ceil(70/n))))}
 for(let i=0;i<n;i++){let ns=max(...r[i].map(x=>x.length)),ki=k[i],nh=ki.length;ns=max(min(nh,10),ns);r[i].splice(0,0,sn(ki,ns),"-".repeat(ns));r[i]=r[i].map(x=>x.length<ns?x+" ".repeat(ns-x.length):x)}
 let m=r[0].length,R=[];for(let i=0;i<m;i++){R[i]="";for(let j=0;j<n;j++)R[i]+=(j?" ":"")+r[j][i]};if(n<k.length)R[1]=R[1].slice(0,-1)+">";return R.join("\n")}
 
let t={alpha:rand(5),beta:randz(5),gamma:"this is a overlonginonelinestring col".split(" "),ints:[0,1,1,1,0],mask:[false,false,true,true,true]}
//let T={alpha:rand(50),beta:randz(50)}

//select is too long
let select=(T,...c)=>{for(let i=0;i<c.length;i++)errif(!T[c[i]],"no column: "+c[i]);if(!c.length)return T;let d={};for(let i=0;i<c.length;i++)d[c[i]]=T[c[i]];return d}
