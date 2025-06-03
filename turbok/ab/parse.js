
let ic=x=>x.split("").map(x=>x.charCodeAt(0))
C=ic(C).map(x=>x-97);T=ic(T).map(x=>x-97)
let cut=(x,i)=>i.map((_,k)=>x.slice(i[k],i[1+k]))
let token=(x,s,i,l)=>(s=0,i=ic(x).map(x=>s=T[14*s+C[x]]).map((x,i)=>x>10?-1:i).filter(x=>x>=0),
 x=cut(x,i),s=i.map((_,j)=>((x[j]==" ")||((j==0||x[j-1]==" "||x[j-1]=="\n")&&(x[j][0]=="/"&&x[j][1]!="'"))?0:1)),
 l=0,s.forEach((y,i)=>{if(y)l=(";"==x[i]||"\n"==x[i]?((s[i]=l?0:1),1):0)}),
 [where(x,s).map(x=>x=="\n"?";":x).toReversed(),where(i,s).toReversed()])
let where=(x,k)=>x.filter((_,i)=>k[i])
let left="([{",right="}])"
let op=":+-*%&|<>=~!,^#_$?@/\\",nm=".-0123456789",az="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",vc="BGHSIEJFZ"
let parse=x=>{let[tok,pos]=x,locs,args,res,funs={},glob={},tabl={},lp=0
console.log("parse",tok)
 let ipos=0,typs="ijefzIJEFZ",it=t=>typs.indexOf(t)
 let l=x=>x[x.length-1],lop=x=>l(x).slice(0,3)
 let perr=x=>{throw new Error("parse:"+ipos+" "+x)}
 let type=(x,t)=>x=="-"||op.includes(x[0])?0:(nm.includes(x[0])?(typs.includes(l(x))?l(x):x.includes(".")?"f":"i"):"i")
 let avec=x=>vc.includes(x.t)?(lp=x.n,x.push("get i",...shift(x.t),"adi"),x.t=x.t.toLowerCase(),x):x
 let upty=(x,y)=>(x=avec(x),y=avec(y),x.t==y.t?[x,y]:it(x.t)<it(y.t)?(x.push(y.t+"o"+x.t),x.t=y.t):(y.push(x.t+"o"+y.t),y.t=x.t),[x,y])
 let next=(r,t)=>(r=tok.pop(),r==undefined?0:(t=type(r),r=[r],r.t=t,r.p=(ipos=pos.pop()),r))
 let peek=_=>l(tok)
 let loop=x=>lp?(temp("i","i"),temp("i","n"),drop(x),x=["i 0","set i",...lp,"set n","while","get i","get n","lti","do",...x,"end"],lp=0,x):x
 let list=p=>{let e,r=[];r.t="l";while(1){if(right.includes(peek())){next();return r};r.push(e=loop(expr(term())));if(";"==peek())next();if(!e){ipos=p;perr("unclosed")}}}
 let seql=(l,r)=>{if(!l.t=="l")return l;if(!l.length)return["nop"];r=[];l.forEach((x,i)=>{drop(x);r.push(...x)});r.t="";return r}
 let argn=(s,i)=>(i=args.indexOf(s),i<0?s:i)
 let cndl=c=>{c=expr(term());if(c.t=="l"){if(c.length>1)perr("condition length");c=c[0]};if("{"!=peek())perr("expect-{");next();return[c,seql(list())]}
 let term=(r,n)=>{r=peek();if(r)if(";"==r[0]||"{"==r[0]||right.includes(r[0]))return 0
  r=next();if(!r)return r
  if(left.includes(r[0]))return list()
  if(r.t&&nm.includes(n=r[0][0])){r[0]=r.t+" "+(typs.includes(l(r[0]))?r[0].slice(0,-1):r[0]);return r}
  if(r[0]=="if"){[r,n]=cndl();r.push("if",...n,"end");r.t="";return r}
  if(r[0]=="while"){[r,n]=cndl();r.unshift("while");r.push("do",...n,"end");r.t="";return r}
  if(az.includes(n)){n=r[0];[r[0],r.t]=(n in locs?["get",locs[n]]:n in glob?["glo",glob[n]]:n in funs?["cal",funs[n].r]:":"==peek()?["get","?"]:perr("lookup"));r[0]+=" "+argn(n);if(!r[0].startsWith("cal")){r.n=["get "+n,"i 32","sru","ioj"];r.n.t="i"}}
  while("["==peek()){next();n=list();r=peek().endsWith(":")?amnd(r,(1!=n.length?(ipos=n.p,perr("rank assign")):n[0]),next(),expr(term())):cali(r,n)}
 console.log("r",r)
  return r}
 let mona=(x,y,i,m)=>x[0]=="#"?(vc.includes(y.t)?(y.push("i 32","sru"),y.t="i",y):perr("rank")):x[0]==":"?(cast(y,res),y.push("ret"),y):(y=avec(y),(m="~iezi~jezj-ingi-jngj-enge-fngf|eabe|fabf_efle_fflf%esqe%fsqf"),(i=m.indexOf(x[0]+y.t))<0?perr("monadic"):(y.push(m.slice(2+i,5+i)+" @"+x.p),y))
 let nega=(x,p)=>("ij".includes(x.t)?(x.unshift(x.t+" 0"),x.push("su"+x.t+" @"+p)):x.push("ng"+x.t+" @"+p),x)
 let dyad=(x,y,z,d,i,p)=>(d="+ad-ad*mu%di%'di\\sl/sr/'sr=eq~ne<ge>le<=gt>=lt<'gt>'lt",p=y.p,y=y[0],[x,z]=upty(x,z),z=("-"==y?nega(z,z.p):z),[x,z]="%"==y[0]?[z,x]:[x,z],z.push(...x),i=d.indexOf(y),i>=0?z.push(d.slice(i+y.length,2+i+y.length)+(y[1]=="'"?("j"==z.t?"l":"u"):z.t)+" @"+p):(perr("dyadic"+y)),z.t="~<=>".includes(y[0])?"i":z.t,z)
 let cast=(x,t)=>t==x.t?x:(x.push(t+"o"+x.t),x.t=t,x)
 let temp=(t,q,s)=>(s=(q?q:"$"+t),s in locs?s:(locs[s]=t,s))
 let shift=(t,s)=>(s="bghsiejfz".indexOf(t.toLowerCase()),s=s?["i "+(s>>1),"shl"]:[])
 let mamd=(x,i,f,z)=>(x.push(...i,...shift(x.t),"tee "+temp("i","_i")),x.t=x.t.toLowerCase(),x.push("ld"+x.t),f[0]=f[0].slice(0,-1),x=dyad(x,f,z),x.push("set "+temp(x.t),"get _i","get "+temp(x.t),"st"+x.t,"get $"+x.t),x)
 let amnd=(x,i,f,z)=>f[0]!=":"?mamd(x,i,f,z): (x.push(...i,...shift(x.t),"adi",...z,"tee "+temp(z.t),"st"+x.t.toLowerCase(),"get "+temp(z.t)),x)
 let indx=(x,y,t,s)=>((y.t!="i"||(!vc.includes(t=x.t)))?perr("index type"+t):t=t.toLowerCase(),x.push(...y,...shift(t),"adi","ld"+t ),x.t=t,x)
 let cali=(x,y,a)=>(console.log("cali",x,y,a),y="l"!=y.t?[y]:y,x[0].startsWith("cal ")?(a=funs[x[0].slice(4)],a.a.length!=y.length?perr("arity"):(y=y.map((x,i)=>cast(x,a.a[i]))),y=y.flat(),y.push(x),y.t=a.r,y):(y.length!=1)?perr("index rank"):indx(x,y[0]))
 let asin=(x,a,y)=>(y=a[0]==":"?y:(a[0]=a[0][0],dyad(x,a,y)),x[0]=(x[0].startsWith("get")?"tee":"gst")+x[0].slice(3), x.t=="?"?(locs[x[0].slice(4)]=y.t):0, 
  x=avec(x),y=avec(y),
  y.push(...x),x[0].startsWith("gst")?y.push("glo"+x[0].slice(3)):0,y)
 let drop=x=>{if(x.t&&"ijefz".includes(x.t)&&"ret"!=lop(x)){"tee"==lop(x)?(x[x.length-1]="set"+x[x.length-1].slice(3)):"get"==lop(x)?x.pop():x.push("drp")}}
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
 let code=(r,l)=>(r=list(),r.forEach((x,i)=>{i==r.length-1?cast(x,res):drop(x);r[i]=x.join("\n")}),r.unshift(...Object.keys(locs).filter(x=>!args.includes(x)).map(x=>(vc.includes(locs[x])?"j":locs[x])+" "+x).sort()),r.join("\n"))

 let ptop=_=>{while(";"==peek())next();let n=next(),a=next(),r;if(!n)return;if(a==0||a[0]!=":")perr("toplevel assignment")
  if(nm.includes(n[0][0]))perr("todo data/table")
  else{r=next();if(r&&nm.includes(r[0][0])){if(0!=Number(r[0]))perr("nonzero global");glob[n]=r.t;return}
   let f={n:n[0],p:n.p,r:r[0]};r=next();if(r[0]!=":")perr("signature");f.a=next()[0];r=next();if(r[0]!="{")perr("function body");if(peek()=="[")perr("todo custom arg names")
   if(!("l"in f)){f.l={};"xyzabcdefghijklmnopqrstuvw".slice(0,f.a.length).split("").forEach((x,i)=>f.l[x]=f.a[i])}
   f.tok=[],f.pos=[];r=0;while(tok.length){n=tok.pop(),a=pos.pop();r+=n=="{"?1:n=="}"?-1:0;f.tok.unshift(n);f.pos.unshift(a);if(r<0)break};funs[f.n]=f;if(r>=0)perr("function unclosed: "+f.n)
  }
 }
 while(tok.length)ptop();for(let n in funs){let f=funs[n];locs=f.l;args=Object.keys(locs);tok=f.tok,pos=f.pos;res=f.r;f.c="\n"+f.n+" "+f.r+":"+f.a+" @"+f.p+"\n"+code()}
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
