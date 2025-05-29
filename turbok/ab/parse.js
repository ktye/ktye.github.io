
let ic=x=>x.split("").map(x=>x.charCodeAt(0))
C=ic(C).map(x=>x-97);T=ic(T).map(x=>x-97)
let cut=(x,i)=>i.map((_,k)=>x.slice(i[k],i[1+k]))
let token=(x,s,i)=>(s=0,i=ic(x).map(x=>s=T[14*s+C[x]]).map((x,i)=>x>10?-1:i).filter(x=>x>=0),
 x=cut(x,i),s=i.map((_,j)=>((x[j]==" ")||((j==0||x[j-1]==" "||x[j-1]=="\n")&&(x[j][0]=="/"&&x[j][1]!="'"))?0:1)),
 [where(x,s).map(x=>x=="\n"?";":x).toReversed(),where(i,s).toReversed()])
let where=(x,k)=>x.filter((_,i)=>k[i])
let left="([{",right="}])"
let op=":+-*%&|<>=~!,^#_$?@/\\",nm=".-0123456789",az="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
let parse=x=>{let[tok,pos]=x,locs,funs={},glob={},tabl={}
console.log("parse",tok)
 let ipos=0,typs="ijefIJEF",it=t=>typs.indexOf(t)
 let l=x=>x[x.length-1]
 let perr=x=>{throw new Error("parse:"+ipos+" "+x)}
 let type=(x,t)=>x=="-"||op.includes(x[0])?0:(nm.includes(x[0])?(typs.includes(l(x))?l(x):x.includes(".")?"f":"i"):"i")
 let upty=(x,y)=>(x.t==y.t?[x,y]:it(x.t)<it(y.t)?(x.push([y.t+"o"+x.t]),x.t=y.t):(y.push([x.t+"o"+y.t]),y.t=x.t),[x,y])
 let next=(r,t)=>(r=tok.pop(),r==undefined?0:(t=type(r),r=[r],r.t=t,r.p=(ipos=pos.pop()),r))
 let peek=_=>l(tok)
 let list=p=>{let e,r=[];r.t="l";while(1){if(right.includes(peek())){next();return r};r.push(e=expr(term()));if(";"==peek())next();if(!e){ipos=p;perr("unclosed")}}}
 let term=(r,n)=>{r=peek();if(r)if(";"==r[0]||right.includes(r[0]))return 0
  r=next();if(!r)return r
console.log("r",r)
  if(left.includes(r[0]))return list()
  //console.log("r[0]",r[0],"lr0",l(r[0]))
  if(r.t&&nm.includes(n=r[0][0])){r[0]=r.t+" "+(typs.includes(l(r[0]))?r[0].slice(0,-1):r[0]);return r}
  if(az.includes(n)){n=r[0];[r[0],r.t]=(n in locs?["get",locs[n]]:n in glob?["glo",glob[n]]:n in funs?["cal",funs[n].r]:perr("lookup"));r[0]+=" "+n}
  return r}
 let mona=(x,y,i,m)=>((m="~iezi~jezj-ingi-jngj-enge-fngf|eabe|fabf_efle_fflf%esqe%fsqf"),(i=m.indexOf(x[0]+y.t))<0?perr("monadic"):(y.push(m.slice(2+i,5+i)+" @"+x.p),y))
 let nega=(x,p)=>(console.log("nega",x),"ij".includes(x.t)?(x.unshift(x.t+" 0"),x.push("su"+x.t+" @"+p)):x.push("ng"+x.t+" @"+p),x)
 let dyad=(x,y,z,d,i,p)=>(console.log("Dyad",x,y,z),d="+ad-ad*mu%di%'di\\sl/sr/'sr=eq~ne<ge>le<=gt>=lt<'gt>'lt",p=y.p,y=y[0],console.log("dyad y",y),[x,z]=upty(x,z),z=("-"==y?nega(z,z.p):z),[x,z]="%"==y[0]?[z,x]:[x,z],z.push(...x),i=d.indexOf(y),i>=0?z.push(d.slice(i+y.length,2+i+y.length)+(y[1]=="'"?("j"==z.t?"l":"u"):z.t)+" @"+p):(perr("dyadic"+y)),z.t="~<=>".includes(y[0])?"i":z.t,z)
 let cast=(x,t)=>t==x.t?x:(x.push(t+"o"+x.t),x)
 let indx=(x,y,t,s)=>((y.t!="i"||(!"BGHSIEJFZ".includes(t=x.t)))?perr("index type"+t):t=t.toLowerCase(),s="bghsiejfz".indexOf(t),s=s?["i "+(s>>1),"shl"]:[],x.push(...y,...s,"adi","ld"+t ),x.t=t,x)
 let cali=(x,y,a)=>(y="l"!=y.t?[y]:y,x[0].startsWith("cal ")?(a=funs[x[0].slice(4)],a.a.length!=y.length?perr("arity"):(y=y.map((x,i)=>cast(x,a.a[i]))),y=y.flat(),y.push(x),y.t=a.r,y):(y.length!=1)?perr("index rank"):indx(x,y[0]))
 let asin=(x,a,y)=>(y=a[0]==":"?y:(a[0]=a[0][0],dyad(x,a,y)),x[0]=(x[0].startsWith("get")?"tee":"gst")+x[0].slice(3),y.push(x),x[0].startsWith("gst")?y.push("glo"+x[0].slice(3)):0,y)
 let expr=x=>{if(!x)return x
  let y=term(),r,v=x=>!x.t
  if(!y)return x
  if(v(y)&&!(v(x))){
   r=expr(term())
   if(!r)perr("1+")
   return"@"==y[0]?cali(x,r):y[0].endsWith(":")?asin(x,y,r):dyad(x,y,r)
  }
  r=expr(y)
  return(v(x))?mona(x,r):cali(x,r)
 }
 let code=_=>expr(term()).join("\n")

 let ptop=_=>{while(";"==peek())next();let n=next(),a=next(),r;if(!n)return;if(a==0||a[0]!=":")perr("toplevel assignment")
  if(nm.includes(n[0][0]))perr("todo data/table")
  else{r=next();if(r&&nm.includes(r[0][0])){if(0!=Number(r[0]))perr("nonzero global");glob[n]=r.t;return}
   let f={n:n[0],p:n.p,r:r[0]};r=next();if(r[0]!=":")perr("signature");f.a=next()[0];r=next();if(r[0]!="{")perr("function body");if(peek()=="[")perr("todo custom arg names")
   if(!("l"in f)){f.l={};"xyzabcdefghijklmnopqrstuvw".slice(0,f.a.length).split("").forEach((x,i)=>f.l[x]=f.a[i])}
   f.tok=[],f.pos=[];r=0;while(tok.length){n=tok.pop(),a=pos.pop();r+=n=="{"?1:n=="}"?-1:0;if(r<0)break;f.tok.unshift(n);f.pos.unshift(a)};funs[f.n]=f;if(r>=0)perr("function unclosed: "+f.n)
   console.log("func",f)
  }
 }
 while(tok.length)ptop();for(let n in funs){let f=funs[n];locs=f.l;tok=f.tok,pos=f.pos;f.c="\n"+f.n+" "+f.r+":"+f.a+" @"+f.p+"\n"+code()}
 return Object.keys(funs).map(x=>funs[x].c).join("\n")
}

/*
if    cnd{..}
while cnd{..}
switch   {..}
$        {..}
a[i]
f[x]

ez ~x eq x=y ne x~y lt x<y lu x<'y gt x>'y gu x>'y le x<=y ge x>=y cz ct cx 
ad x+y su x-y mu x*y di x%y du x%'y mo y!x rm y!'x an x&y or x|y xo x^y sl y\x sa y/x sr y/'x rl rr
ab |x ng -x ce ^x fl _x tr na sq %x mi x&y ma x|y cs 
g:0              /global
0:"alpha"        /data
10:fefefe        /data
f:i:ii{x+y}      /func
g:i:ii{[a;b]a+b} /explicit arg names
h:i:ii           /import
0:(f;g;h)        /call table
*/
