let ab=(x,B)=>{
let C="aaaaaaaaaanaaaaaaaaaaaaaaaaaaaaaadhddddebcdddjgmggggggggggebdedddffffffffffffffffffffffffffblcddiffffkfffffffffffffffffffffbdcdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
let T="abcdefghijfdkbabcdefghijfdkbabcdefghidfddbabcdrfghijfddbabcdefghijfddbabcdemmhidmddbabcdennhidoddbppppppprpppqppabcdemghidmddbabcdefnhijfddblllllllllllllblllllllllllllbabcdemmhidmddbabcdennhidoddbabcdennhinnddbppppppprpppqppppppppppppppppabcdefghidfddb"

let ic=x=>x.split("").map(x=>x.charCodeAt(0))
C=ic(C).map(x=>x-97);T=ic(T).map(x=>x-97)
let cut=(x,i)=>i.map((_,k)=>x.slice(i[k],i[1+k]))
let token=(x,s,i,l)=>(s=0,i=ic(x).map(x=>s=T[14*s+C[x]]).map((x,i)=>x>10?-1:i).filter(x=>x>=0),
 x=cut(x,i),s=i.map((_,j)=>((x[j]==" ")||((j==0||x[j-1]==" "||x[j-1]=="\n")&&(x[j][0]=="/"&&x[j][1]!="'"))?0:1)),
 l=0,s.forEach((y,i)=>{if(y)l=(";"==x[i]||"\n"==x[i]?((s[i]=l?0:1),1):0)}),
 [where(x,s).map(x=>x=="\n"?";":x).toReversed(),where(i,s).toReversed()])
let where=(x,k)=>x.filter((_,i)=>k[i])
let left="([{",right="}])"
let op=":+*%&|<>=~!,^#_$?@/\\",nm=".-0123456789",az="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",vc="BGHSIEJFZ"
let parse=x=>{let[tok,pos]=x,locs,args,res,funs={},glob={},tabl={},data=[],lp=0
 let runt={
  "malloc":{r:"i",a:"i",c:["malloc i:i import env malloc"]},
  "fill.i":{r:"I",a:"ii",c:"fill.i j:ii\ni r\ni p\ni 2\nget 0\nsli\ncal malloc\nset r\nget 1\nif\nget r\nget 0\ni 2\nsli\nadi\nset p\nwhile\nget p\ni 4\nsui\ntee p\nget r\ngei\ndo\nget 1\nget p\nsti\nend\nend\nget r\njoi\nget 0\njoi\nj 32\nslj\norj\n"},
  "fill.j":{r:"J",a:"ij",c:"fill.j j:ij\ni r\ni p\ni 3\nget 0\nsli\ncal malloc\nset r\nget 1\nj 0\neqj\nezi\nif\nget r\nget 0\ni 3\nsli\nadi\nset p\nwhile\nget p\ni 8\nsui\ntee p\nget r\ngei\ndo\nget 1\nget p\nstj\nend\nend\nget r\njoi\nget 0\njoi\nj 32\nslj\norj\n"},
  "fill.e":{r:"E",a:"ie",c:"fill.e j:ie\ni r\ni p\ni 2\nget 0\nsli\ncal malloc\nset r\nget 1\ne 0\neqe\nezi\nif\nget r\nget 0\ni 2\nsli\nadi\nset p\nwhile\nget p\ni 4\nsui\ntee p\nget r\ngei\ndo\nget 1\nget p\nste\nend\nend\nget r\njoi\nget 0\njoi\nj 32\nslj\norj\n"},
  "fill.f":{r:"F",a:"if",c:"fill.f j:if\ni r\ni p\ni 3\nget 0\nsli\ncal malloc\nset r\nget 1\nf 0\neqf\nezi\nif\nget r\nget 0\ni 3\nsli\nadi\nset p\nwhile\nget p\ni 8\nsui\ntee p\nget r\ngei\ndo\nget 1\nget p\nstf\nend\nend\nget r\njoi\nget 0\njoi\nj 32\nslj\norj\n"},
  "fill.z":{r:"Z",a:"iz",c:"fill.z j:iz\ni r\ni p\ni 4\nget 0\nsli\ncal malloc\nset r\nget 1\nz 0\neqz\nezi\nif\nget r\nget 0\ni 4\nsli\nadi\nset p\nwhile\nget p\ni 16\nsui\ntee p\nget r\ngei\ndo\nget 1\nget p\nstz\nend\nend\nget r\njoi\nget 0\njoi\nj 32\nslj\norj\n"},
 }
 let mark=(...x)=>x.forEach(x=>(!(x in runt))?perr("no builtin: "+x):(x in funs)?0:funs[x]=runt[x])
 let ipos=0,typs="ijefzBGHSIJEFZ",it=t=>typs.indexOf(t)
 let l=x=>x[x.length-1],lop=x=>l(x).slice(0,3),vt=x=>vc.includes(x.t)
 let perr=(x,p)=>{p=p?p:ipos;if(ed){ed.selectionStart=ed.selectionEnd=p;ed.focus()};throw new Error("@"+p+": "+x)}
 let type=(x,t)=>x=="-"||op.includes(x[0])?0:(nm.includes(x[0])?(typs.includes(l(x))?l(x):x.includes("a")?"z":x.includes(".")?"f":"i"):"i")
 let tyck=(x,y,p)=>{if(x!=y)perr("type",p)}
 let avec=x=>(vt(x)?(lp=x.n,x.push("ioj","get "+temp("i","i"),...shift(x.t),"adi","ld"+x.t.toLowerCase()),x.t=x.t.toLowerCase(),x):x)
 let upty=(x,y)=>(x=avec(x),y=avec(y),x=xloc(x,y),x.t==y.t?[x,y]:it(x.t)<it(y.t)?(x.push(y.t+"o"+x.t),x.t=y.t):(y.push(x.t+"o"+y.t),y.t=x.t),[x,y])
 let loty=t=>t.charCodeAt(0)<97?"j":t
 let next=(r,t)=>(r=tok.pop(),r==undefined?0:(t=type(r),r=[r],r.t=t,r.p=(ipos=pos.pop()),r))
 let peek=_=>l(tok)
 let immm=(x,i)=>(x=x.slice(4),(i=x.indexOf(" @"),i)?x.slice(0,i):x)
 let addr=(x,i)=>(i=x.indexOf(" @"),i>0?x.slice(i):"")
 let loop=x=>lp?(drop(x),x=[...lp,"set n","i -1","set i","while","get i","i 1","adi","tee i","get n","lti","do",...x,"end"],x.t=0,lp=0,x):x
 let list=p=>{let e,r=[];r.t="l";while(1){if(right.includes(peek())){next();return r};r.push(e=loop(expr(term())));if(";"==peek())next();if(!e)perr("unclosed",p)}}
 let seql=(l,r)=>{if(!l.t=="l")return l;if(!l.length)return["nop"];r=[];l.forEach((x,i)=>{drop(x);r.push(...x)});r.t="";return r}
 let find=(x,y,a)=>{a=0;while((a=x.indexOf(y[0],1+a),a>=0));if(y.every((c,i)=>x[i+a]==c))return a;return x.length}
 let char=(x,s,i)=>{s=unqt(x[0].slice(1,-1));x.t="B";x.t="B";x.n=["i "+s.length];if(!s.length){x[0]="j 0";return x};i=find(data,s);if(i==data.length)data.push(...s);x[0]="j "+((BigInt(s.length)<<32n)|BigInt(i)).toString();return x}
 let argn=(s,i)=>(i=args.indexOf(s),i<0?s:i)
 let cndl=c=>{c=expr(term());if(c.t=="l"){if(c.length>1)perr("condition length");c=c[0]};if("{"!=peek())perr("expect-{");next();return[c,seql(list())]}
 let cond=(l,r)=>{if(l.length<3||1!=l.length%2)perr("cond length");r=[];r.t=l[l.length-1].t;l.forEach((x,i)=>(r.push(...x),(i==l.length-1)?r.push(...Array(l.length/2|0).fill("end")):r.push(i%2?(tyck(r.t,x.t,x.p),"else"):(tyck("i",x.t,x.p),"if "+r.t))));return r}
 let swtc=(l,r)=>{if(l.length<3)perr("switch length");r=[];r.t=l[l.length-1].t;l.forEach((x,i)=>(r.push(...x),tyck(x.t,r.t,x.p),r.push(i==0?"switch "+(l.length-1):i==l.length-1?"end":"endcase "+(i-1))));return r}
 let ical=(r,l,s)=>{r.pop();if(l.length<2)perr("icall length");s=r.t+":";if(!typs.includes(r.t))perr("icall return type");l.slice(1).forEach(x=>(s+=x.t,r.push(...x)));if(l[0].t!="i")perr("icall index type");r.push(...l[0],s);return r}
 let take=(x,y,p,s,v)=>(p=" @"+p,tyck(x.t,"i",x.p),vt(y)?(y.push("j 32","slj","j 32","srl"),x.push("joi"+p,"j 32","slj","orj"),y.push(...x),y):(x.push(...y,(mark("malloc","fill."+y.t),"cal fill."+y.t)),x.t=y.t.toUpperCase(),x))
 let drup=(x,y,p,s,v)=>(p=" @"+p,tyck(x.t,"i",x.p),vt(y)?1:perr("type",y.p),y.push(...x,"joi"+p,"tee "+(v=temp("j","n_x")), "j "+("BCHSIEJFZZ".indexOf(y.t)/2|0),"slj","adj","get "+v,"j 32","slj","suj"+p),y)
 let term=(r,n)=>{r=peek();if(r)if(";"==r[0]||"{"==r[0]||right.includes(r[0]))return 0
  r=next();if(!r)return r
  if("("==r[0]){n=ipos;r=expr(term());if(")"!=peek())perr("unclosed)",n);next();return r}
  if(left.includes(r[0]))return list()
  if('"'==r[0][0])return char(r)
  if(r.t&&nm.includes(n=r[0][0])){r[0]=r.t+" "+(typs.includes(l(r[0]))?r[0].slice(0,-1):r[0])+" @"+r.p;return r}
  if(r[0]=="if"){[r,n]=cndl();r.push("if",...n);"{"!=peek()?r.push("end"):(next(),r.push("else",...seql(list()),"end"));r.t="";return r}
  if(r[0]=="while"){[r,n]=cndl();r.unshift("while");r.push("do",...n,"end");r.t="";return r}
  if(az.includes(n)){n=r[0];[r[0],r.t]=(peek()=="?"?(next(),["cast",n]):n in locs?["get",locs[n]]:n in glob?["glo",glob[n]]:n in funs?[("cal"+(funs[n].gen?"?":"")),funs[n].r]:peek().endsWith(":")?["get","?"]:perr("lookup"));r[0]+=" "+argn(n);r[0]+=" @"+r.p;if(!r[0].startsWith("cal")){r.n=["get "+argn(n),"j 32","srl","ioj"];r.n.t="i"}}
  while("["==peek()){next();n=list();if(r[0].startsWith("cast ")&&n.length>1)return ical(r,n);if(1==r.length&&"$?".includes(r[0])){return("$"==r[0]?cond(n):swtc(n))};r=peek().endsWith(":")?amnd(r,(1!=n.length?perr("rank assign",n.p):n[0]),next(),expr(term())):cali(r,n)}
  return r}
 let mona=(x,y,i,m)=>x[0]=="#"?(vt(y)?(y.push("j 32","srl","ioj"),y.t="i",y):perr("rank")):x[0]==":"?(cast(y,res),y.push("ret"),y):(y=avec(y),(m="!iezi!jezj~inoi~jnoj-ingi-jngj-enge-fngf|eabe|fabf_efle_fflf%esqe%fsqf"),(i=m.indexOf(x[0]+y.t))<0?perr("monadic"):(y.push(m.slice(2+i,5+i)+" @"+x.p),y))
 let nega=(x,p)=>("ij".includes(x.t)?(x.unshift(x.t+" 0"),x.push("su"+x.t+" @"+p)):x.push("ng"+x.t+" @"+p),x)
 let dyad=(x,y,z,d,i,p)=>(d="+ad-ad*mu%dv%'dv\\sl/sr/'sr=eq~ne<ge>le<=gt>=lt<'gt>'lt",p=y.p,y=y[0],y=="#"?take(x,z,p):y=="_"?drup(x,z,p):([x,z]=upty(x,z),z=("-"==y?nega(z,z.p):z),[x,z]="%"==y[0]?[z,x]:[x,z],z.push(...x),i=d.indexOf(y),i>=0?z.push(d.slice(i+y.length,2+i+y.length)+(y[1]=="'"?("j"==z.t?"l":"u"):z.t)+" @"+p):(perr("dyadic"+y)),z.t="~<=>".includes(y[0])?"i":z.t,z))
 let cast=(x,t)=>t==x.t?x:(x.push(loty(t)+"o"+loty(x.t)),x.t=t,x)
 let temp=(t,q,s)=>(s=(q?q:"$"+t),s in locs?s:(locs[s]=t,s))
 let xloc=(x,y)=>x.t=="?"?(locs[immm(x[0])]=y.t,x.t=y.t,x):x
 let shift=(t,s)=>(s="bghsiejfz".indexOf(t.toLowerCase()),s=s?["i "+(s>>1),"sli"]:[])
 let mamd=(x,i,f,z)=>(x.push("ioj",...i,...shift(x.t),"tee "+temp("i","_i")),x.t=x.t.toLowerCase(),x.push("ld"+x.t),f[0]=f[0].slice(0,-1),x=dyad(x,f,z),x.push("set "+temp(x.t),"get _i","get "+temp(x.t),"st"+x.t,"get $"+x.t),x)
 let amnd=(x,i,f,z)=>(f[0]!=":"?mamd(x,i,f,z):(x.push("ioj",...i,...shift(x.t),"adi",...z,"tee "+temp(z.t),"st"+x.t.toLowerCase(),"get "+temp(z.t)),x.t=z.t,x))
 let indx=(x,y,t,s)=>((y.t!="i"||(t=x.t,!vt(x)))?perr("index type:"+t):t=t.toLowerCase(),x.push("ioj",...y,...shift(t),"adi","ld"+t ),x.t=t,x)
 let tsub=(x,tT)=>x.replaceAll("t",tT[0]).replaceAll("T",tT[1])
 let gent=(t,p,i)=>(t==t.toLowerCase()?t+t.toUpperCase():(i="BGHSIEJFZ".indexOf(t),i<0?perr("type",p):("iiiiijjfz"[i])+t))
 let genf=(f,t,n)=>{n=f.n+"."+t;if(!(n in funs)){
  let[Locs,Args,Tok,Res]=[locs,args,tok,res],tT=gent(t,f.p),F={n:n,p:f.p,tT:tT,l:{},r:tsub(f.r,tT),a:tsub(f.a,tT),tok:f.tok.slice(),pos:f.pos.slice(),gen:false};Object.keys(f.l).forEach(k=>F.l[k]=tsub(f.l[k],tT));
  [locs,args,tok,res]=[F.l,Object.keys(F.l).slice(0,f.a.length),F.tok,F.r];F.c="\n"+F.n+" "+loty(F.r)+":"+(F.a.split("").map(loty).join(""))+" export "+f.n+" @"+f.p+"\n"+code();funs[n]=F;[locs,args,tok,res]=[Locs,Args,Tok,Res]};return n}
 let gena=(x,y,f,a,i)=>(f=funs[immm(x.slice(1))],a=y.map(x=>x.t).join(""),(a.length!=f.a.length)?perr("arity"):0,i=f.a.indexOf("T"),(i=i>=0?i:f.a.indexOf("t")),"cal "+genf(f,a[i])+addr(x))
 let cali=(x,y,a)=>(y="l"!=y.t?[y]:y,x[0].startsWith("cal?")?x[0]=gena(x[0],y):0,x[0].startsWith("cal ")?(a=funs[immm(x[0])],a.a.length!=y.length?perr("arity"):(y=y.map((x,i)=>cast(x,a.a[i]))),y=y.flat(),y.push(x),y.t=a.r,y):(y.length!=1)?perr("index rank"):indx(x,y[0]))

/*
x :y  asin
x+:y  asin
X :Y  asin
x :Y  asin(x,avec(Y))
x+:Y  asin(x,avec(Y))

X :y  amnd(x,i,f,y)          lp=x.n
X+:y  amnd(x,i,f,y)
X+:Y  amnd(x,i,f,avec(Y))
*/

 let asxy=(x,a,y,v)=>(2==(v=vt(x)+vt(y))&&":"==a[0])||(!v)?asin(x,a,y):(y=vt(y)?avec(y):y,vt(x)?(lp=x.n,amnd(x,(v=["get i"],v.t="i",v),a,y)):asin(x,a,y))
 let asin=(x,a,y)=>(y=a[0]==":"?y:(a[0]=a[0][0],dyad(x,a,y)),x[0]=(x[0].startsWith("get")?"tee":"gst")+x[0].slice(3),x=xloc(x,y), 
  y.push(...x),x[0].startsWith("gst")?y.push("glo"+x[0].slice(3)):0,y)
 let drop=x=>{if(x.t&&typs.includes(x.t)&&"ret"!=lop(x)){"tee"==lop(x)?(x[x.length-1]="set"+x[x.length-1].slice(3)):"get"==lop(x)?x.pop():x.push("drp")}}
 let expr=x=>{if(!x)return x
  let y=term(),r,v=x=>!x.t
  if(!y)return x
  if(v(y)&&!(v(x))){
   r=expr(term())
   if(!r)perr("1+")
   return"@"==y[0]?cali(x,r):y[0].endsWith(":")?asxy(x,y,r):dyad(x,y,r)
  }
  r=expr(y)
  return(v(x))?mona(x,r):x[0].startsWith("cast ")?cast(r,x.t):cali(x,r)
 }
 let floc=(n,r)=>((!("i n r".includes(n)))?1:r.some(s=>s.split("\n").map(s=>s.split(" ")).some(x=>(x[0]=="get"||x[0]=="set"||x[0]=="tee")&&n==x[1])))
 let code=r=>(r=list(),(res&&!(l(r).t))?(r.push(["get r"]),l(r).t=res):0,r.forEach((x,i)=>{i==r.length-1?cast(x,res):drop(x);r[i]=x.join("\n")}),r.unshift(...Object.keys(locs).filter(x=>!args.includes(x)).filter(x=>floc(x,r)).map(x=>(vc.includes(locs[x])?"j":locs[x])+" "+x).sort()),r.join("\n"))
 let unqt=s=>{let r=[];for(let i=0;i<s.length;i++)r.push((s[i]=="\\"?(s[++i]=="n"?"\n":s[i]=="t"?"\t":s[i]):s[i]).charCodeAt(0));return r}
 let unhx=s=>s.match(/../g).map(x=>parseInt(x,16))
 let adda=(o,x)=>{if(o>data.length)data.push(...Array(o-data.length).fill(0));x.forEach((x,i)=>data[o+i]=x)}
 let ptop=_=>{while(";"==peek())next();let n=next(),a=next(),r;if(!n)return;if(a==0||a[0]!=":")perr("toplevel assignment")
  if(nm.includes(n[0][0])){a=Number(n[0]);n=next();if(n[0][0]=="["){while((n=next(),n&&n!="]"))az.includes(n[0][0])?tabl[a++]=[n[0],ipos]:perr("table syntax")}else adda(a,n[0][0]=='"'?unqt(n[0].slice(1,-1)):unhx(n[0]))}
  else{r=next();if(r&&nm.includes(r[0][0])){if(0!=Number(r[0]))perr("nonzero global");glob[n]=r.t;return}
   let f={n:n[0],p:n.p,r:r[0]};r=next();if(r[0]!=":")perr("signature");f.a=next()[0];r=next();if(r[0]!="{"){f.l={};funs[f.n]=f;return};if(peek()=="["){next();f.l={};f.a.split("").forEach((t,i,a,x)=>{x=next();if((!x)||(!az.includes(x[0][0])))perr("arg name:"+x[0][0]);f.l[x[0]]=t;x=next();if(x[0]!=(i<a.length-1?";":"]"))perr("arg length")})}
   if(!("l"in f)){f.l={};"xyzabcdefghijklmnopqrstuvw".slice(0,f.a.length).split("").forEach((x,i)=>f.l[x]=f.a[i])}
   f.l.i="i";f.l.n="i";if(f.r)f.l.r=f.r;
   f.tok=[],f.pos=[];f.gen=f.a.toLowerCase().includes("t");r=0;while(tok.length){n=tok.pop(),a=pos.pop();r+=n=="{"?1:n=="}"?-1:0;f.tok.unshift(n);f.pos.unshift(a);if(r<0)break};if(f.n in funs)perr("func "+f.n+" already defined",f.p);funs[f.n]=f;if(r>=0)perr("function unclosed: "+f.n,f.p)
 }}
 while(tok.length)ptop();for(let n in funs){let f=funs[n],imp=f.tok?0:1;locs=f.l;args=Object.keys(locs).slice(0,f.a.length);tok=f.tok,pos=f.pos;if(f.gen)continue;res=f.r;f.c=f.c?f.c:"\n"+f.n+" "+loty(f.r)+":"+(f.a.split("").map(loty).join(""))+(imp?" import env ":" export ")+f.n+" @"+f.p+(imp?"":"\n"+code())}
 let G=Object.keys(glob).map(x=>glob[x]+" "+x).join("\n");if(G.length)G+="\n"
 let I=Object.keys(funs).filter(x=>!funs[x].tok).map(x=>funs[x].c).join("\n")
 let F=Object.keys(funs).filter(x=> funs[x].tok).map(x=>funs[x].c).join("\n")
 let t="";for(o in tabl){t+="\ntab "+o+" "+tabl[o][0];if(!(tabl[o][0]in funs))perr("unknown func in table: "+tabl[o][0],tabl[o][1])}
 let n=(((7+data.length)>>3)<<3)
 let d="";{let o=0,x=data;while((((7+x.length)>>3)<<3)>x.length)x.push(0);if(x.length)x.push(...unqt("data end"));while(x.length){d+="0000000000000000"==(y=(x.length>8?x.slice(0,8):x).map(x=>x.toString(16).padStart(2,"0")).join(""))?"":"\ndat "+o+" "+y;o+=8;x=x.slice(8)}}
 if(B){B.f=funs,B.g=glob}
 return(G+I+F+t+d).trimStart()}
return parse(token(x))}
