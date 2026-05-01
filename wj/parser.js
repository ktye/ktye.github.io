/*
let example=_=>`mem(1) //initial memory 64k
//mem(0,"abc")                       //initial data
//mem(4,1,2n,3)                      //4/8 byte data
//let gf,g=55;                       //globals
//const G=3n;                        //const
//const c1=1,c2=3;
//const sinf=Math.sin,cosf=Math.cos; //imports
//function a(x){x=b(1,x);return -x}
//function B(i,x,y){_b(16,-1);return 1n+Tab(x,y,i)}
//function sf(xf,yp){_f(8,xf);return sinf($f(b_(yp)))}
//function jf(xf){return f$(xf)}
//function _v(x){x}
//function R(X){let p=j$(X)-8;_i(p,i_(p)+1);return X}
//tab(0,a)
//function a(x){return x?1+x:-x}
//function b(x,y){return tab(x,y)}
//function b(x){if(x)x=1+x;else x=-x;return x;}
function f(x,y){_i(x,y);return 0.0}
//function g(x, y){y=0;while(y<x)y+=3;return y}
//function h(x, y){y=0;do{y+=2}while(y<x)return y}
//function wf(X){return sinf(3.14)}
//function alloc(n, x,t){t=x=bk(n);return i_(t)?_i(t,i_(x),x):x=alloc(2*x),free(x),x+n}
`
*/

let env={cos:Math.cos}

let runtime=`
let $M,$V,mem=x=>($V=new DataView(($M=new Uint8Array(x<<16)).buffer)),$=x=>BigInt.asIntN(64,x)
let memgrow=(x,r)=>{r=$M.length>>>16;x=new Uint8Array((r+x)<<16);x.set($M);$M=x;$V=new DataView($M.buffer);return r}
let _memfill=(d,c,n)=>$M.fill(c,d,d+n),_memcpy=(d,s,n)=>$M.copyWithin(d,s,s+n)
let b_=x=>$M[x],i_=x=>$V.getInt32(x,1),I_=x=>$V.getBigInt64(x,1),ff=x=>$V.getFloat64(x,1)
let _b=(x,y)=>$M[x]=y,_i=(x,y)=>$V.setInt32(x,y,1),_I=(x,y)=>$V.setBigInt64(x,y,1),_f=(x,y)=>$V.setFloat64(x,y,1)
let b$=x=>x<<24>>24,j$=x=>0|x,f$=x=>0|x,U$=x=>BigInt.asUintN(64,BigInt(x)),I$=x=>$(BigInt(x)),$f=x=>x
let lt=(x,y)=>(x>>>0)<(y>>>0),le=(x,y)=>(x>>>0)<=(y>>>0),gt=(x,y)=>(x>>>0)>(y>>>0),ge=(x,y)=>(x>>>0)>=(y>>>0)
let shr=(x,y)=>x>>>y,div=x=>(x>>>0)/y,rem=x=>(x>>>0)%y,clz=Math.clz32
let $T=0,exp=x=>0,test=(e,f,...a)=>{let r;++$T;if(e!=(r=f(...a))){throw new Error("test(js) expected "+e+" got "+r)}}
`

let parse=p=>{let i=0,Q=0,c=p[0],err=s=>{throw new Error("@"+i+" "+s)},n=()=>(c=p[++i],_()),N=(p,...x)=>(x,x.i=p,x)      //js parser
 let _=$=>{while(1){while(/\s/.test(p[i]))i++;if(c=='/'&&p[i+1]=='/'){i+=2;while(p[i]&&p[i]!='\n')i++;continue}break};c=p[i]||''}
 let sy=c=>/[A-Za-z_$]/.test(c),sY=c=>/[A-Za-z0-9_$.]/.test(c)
 let sw=x=>x==p.substr(i,x.length),__=s=>{i+=s.length;c=p[i]||'';_()}
 let qs=s=>{if(!sw(s))err('expected '+s);__(s)};
 let st=$=>{_();let r,e,t=(s,n)=>sw(s)&&/\W/.test(p[i+s.length]);if(r=t('let')?dec(0):t('const')?(i+=2,dec(1)):t('function')?fun():t('return')?ret():t('if')?iff():t('do')?dow():t('while')?whl():0)return r;
  if(c=='{')return blk();e=ex();_();if(c==';')n();return N(e.i,'drp',e)}
 let ex=$=>{let j=i,s=cnd(),e;_();if(c=='='){n();e=ex();return N(j,'asn',s,e)};return s}
 let prg=$=>{let b=[];while(i<p.length){_();if(!c)break;b.push(st())};return N(0,'prg',...b)}
 let blk=$=>{qs('{');let j=i,b=[];while(c&&c!='}'){b.push(st());_()};qs('}');return N(j,'blk',...b)}
 let dec=$=>{let r=[],s,e,k,j=i,q=Q;Q=1;__('let');do{s=sym(),e=0;_();if(c=='='){k=i,n(),s.push(ex())};r.push(s);_();if(c!=',')break;n()}while(1);Q=q;_();if(c==';')n();return N(j,$?'con':'var',...r)}
 let fun=$=>{let j=i,k,a=[],l=[],q=a,b,s;qs('function');_();s=sy(c)?sym():err("anonymous");k=i;qs('(');while(c!=')'&&c){if(p[i-1]==' ')q=l;q.push(sym());if(c!=",")break;n()}
  qs(')');_();return N(j,'fun',s,N(k,'var',...a),N(k,'loc',...l),(b=blk(),2==b.length?b[1]:b))}
 let ret=$=>{let j=i,e;qs('return');_();e=(c==';'||c=='}')?0:ex();if(c==';')n();return N(j,'ret',e)}
 let iff=$=>{let j=i,t,e=0,c,r;qs('if');_();qs('(');c=ex();qs(')');_();t=st();_();if(sw('else')){qs('else');_();e=st()};r=N(j,'iff',c,t);if(e)r.push(e);return r}
 let dow=$=>{let j=i,t,b;qs('do');_();b=st();_();qs('while');_();qs('(');t=ex();qs(')');_();return N(j,'dow',b,t)}
 let whl=$=>{let j=i,b,t;qs('while');_();qs('(');t=ex();qs(')');_();b=st();return N(j,'whl',t,b)}
 let cnd=$=>{let j,q=dya(0),t,e;_();if(c=='?'){j=i,n();t=ex();_();if(c!=':')err('tern : missing');n();e=ex();return N(j,'cnd',q,t,e)};return q}
 let P={',':1,'=':2,'+=':2,'-=':2,'*=':2,'&=':2,'^=':2,'|=':2,'|':3,'^':4,'&':5,'==':6,'!=':6,'<':7,'>':7,'<=':7,'>=':7,'<<':8,'>>':8,'+':9,'-':9,'*':10,'/':10,'%':10};
 let dya=m=>{let q,o,oo,r,j,l=mon();while(1){_();j=i;oo=p.substr(i,2);o=P[oo]?oo:P[c]?c:0;if((!o)||Q&&o==',')break;q=P[o]||0;if(q<m)break;__(o);r=dya(q+1);l=N(j,'dya',o,l,r);_()}return l}
 let mon=$=>{_();if(c=="-"&&/[0-9]/.test(p[1+i])){n();let r=num();r[1]="-"+r[1];return r};if("+-!~".includes(c)){let j=i,o=c;if(c==p[1+i]&&"+-".indexOf(c)>=0){o+=o;i++};n();return N(j,'mon',o,mon())};return sta()}
 let sta=$=>{_();if(c=='('){let q=Q;Q=0;n();let e=ex();qs(')');Q=q;return e};return(c=='"'||c=="'")?str():/[0-9]/.test(c)?num():sy(c)?scl():err('token unexpected '+c)}
 let str=$=>{let j=i,q=c,s='';n();while(c&&c!=q){if(c=='\\'){n();s+=p[i]||'';n()}else{s+=c;n()}}qs(q);return N(j,'str',s)}
 let num=$=>{let j=i,s='';while("0123456789xn.".includes(c))s+=c,c=p[++i];return N(j,'num',s)}
 let sym=$=>{let j=i,s='';if(!sy(c))err("expected identifier");while(sY(c))s+=c,c=p[++i];return N(j,'sym',s)}
 let scl=$=>{let j,q,f=sym(),a=[];_();if(c=='('){q=Q;Q=1;j=i;n();while(c!=')'&&c){a.push(ex());_();if(c!=",")break;n()};Q=q;qs(')');return N(j,'cal',f,...a)};return f}
 return prg()}

/*ast nodes: nested arrays. all nodes have also .i(src offset)
prg b..          program body[statements]
blk b..          block
drp e            drop expression
var l            variable declaration list l:[asn+]
con l            constants or imports
asn s e          assignment
fun s a b        function name(sym) args[sym] body(blk|statement)
cal f a..        call function [arguments]
sym s            symbol/identifier s(string)
ret e|0          return expression
iff c t [e]      if condition then else (statement)
cnd c t e        if condition then else (ternary expression)
whl c b          while condition body
dow b c          do-while body condition
dya o l r        dyadic operator left right
mon o r          monadic operator
str s            string literal
num s            numeric literal
*/

// loc: uppercase:i64 endwith"f":"f64" otherwise:i32    fun(return value) fname:startswith_(void)/upper/endswithf/otherwise

let pr=(a,sp)=>{if(!Array.isArray(a)){return sp+String(a)+"\n"};if(!a.length)return sp+"()\n"
 let s=sp+a[0]+"."+(a.T||'')+" @"+a.i+"\n";for(let i=1;i<a.length;i++)s+=pr(a[i],sp+" ");return s}

let op=a=>{   //replace builtin calls to dyadic/monadic operators ['cal' ['sym', 'shr'] .. ] => ['dya', 'shr', ..]
 const w="clz ctz cnt shr div rem grw lt gt le ge".split(" ")
 let F=x=>{if(!Array.isArray(x))return x;x.forEach(F);if(x[0]=='cal'&&w.includes(x[1][1])){x[0]=3==x.length?'mon':'dya';x[1]=x[1][1]}}
 return F(a),a}
 
let ty=a=>{  //typify ast(inplace) adds .T to each node with value "ijf" (void i32 i64 f64)
 let e=x=>{console.log(x);throw new Error(`@${x.i} unexpected node type: ${x[0]}`)}
 let t=s=>s[0]=="_"?"":/[A-Z]/.test(s[0])?"j":s.endsWith("f")?"f":"i"
 let C=(t,s)=>"< > == != lt gt le ge !".includes(s)?'i':t
 let c=x=>x.slice(1).map(f),c1=x=>x.T=(c(x),x[1].T),cl=x=>x.T=(c(x),x.length>1?x[x.length-1].T:""),cv=x=>x.T=(c(x),"")
 let f=x=>((({fun:c1, blk:cl, drp:cv, var:cv, loc:cv, con:cv, asn:c1, cal:c1, ret:cv, iff:cv, cnd:cl, whl:cv, dow:cv,   //a poor man's switch
              sym:x=>(x[2]?f(x[2]):0,x.T=t(x[1])),    dya:x=>x.T=(f(x[2]),C(f(x[3]),x[1])),   mon:x=>x.T=C(f(x[2]),x[1]),               //with default
	      imp:x=>x.T=t(x[1]),     str:x=>x.T="",
              num:x=>x.T=x[1].endsWith("n")?(x[1]=x[1].slice(0,-1),"j"):x[1].includes(".")?"f":"i"})[x[0]]||e(x))(x),x.T);c(a);return a}

let ng=a=>{   //replace -x with 0-x  and  ++/--x with x=1+x   and  ~x with -1^
 let T=(t,i,x)=>(x.T=t,x.i=i,x)
 let F=x=>{if(!Array.isArray(x))return x;x.forEach(F);
  if(x[0]=='mon'&&x[1]=='-'&&x.T!='f'){x[0]='dya',x.push(x[2]),x[2]=T(x.T,x.i,['num','0'])}
  if(x[0]=='mon'&&x[1].length==2){x[0]='dya';x[1]=x[0]=="+"?"+=":"-=";x[3]=T(x.T,x.i,['num','1'])}
  if(x[0]=='mon'&&x[1]=="~"){x[0]='dya',x[1]='^',x.push(x[2]),x[2]=T(x.T,x.i,['num','-1'])}
  }
 return F(a),a}

let bi=a=>{  //builtin function calls at top level   mem(1)  tab(10,a,b,c)   exp(a,b,c)  test()
 let f=x=>{let u=[],b;x.slice(2).forEach(x=>x[0]=="str"?u.push(...x[1].split("").map(x=>x.charCodeAt(x))):(b=new ArrayBuffer(x.T=='j'?8:4),v=new DataView(b),x.T=='j'?v.setBigInt64(0,BigInt(x[1]),1):v.setInt32(0,+x[1],1),u.push(...new Uint8Array(b))));x[2]=new Uint8Array(u);while(x.length>3)x.pop()}
 a.forEach(x=>{if(x[0]=="drp"){let a=x[1].slice(2);x[0]=x[1][1][1];x.splice(1,1);x.push(...a);if(x[0]=="mem"&&x.length>2)f(x)}});return a}

let im=a=>{  //replace imports, e.g. const atanf=Math.atan2 with ["imp","atanf","Math","atan2",["sym"],["sym"]] (arg types in sym.T from 1st call)
 let N=(t,i,x)=>(x.T=t,x.i=i,x),F=(x,s)=>Array.isArray(x)?x[0]=='cal'&&x[1][1]==s?x:x.reduce((r,x)=>r||F(x,s),0):0; //first call node
 let t=s=>s[0]=="_"?"":s[0].toUpperCase()==s[0]?"j":s.endsWith("f")?"f":"i"
 //let v=x=>{let y,s,xi;for(let i=x.length-1;i>0;i--)if(3==[i].length)(y=F(a,s=x[i][1]))?x[i]=N(t(s),x.i,["imp",s,x[i][2][1],...y.slice(2).map(x=>N(x.T,x.i,["sym"]))]):x.splice(i,1)}
 let v=x=>{x[0]='imp';for(let i=1;i<x.length;i++){x[i][2]=x[i][2][1];let y=F(a,x[i][1]);y=y?y.slice(2).map(x=>N(x.T,x.i,["sym"])):0;y?x[i].push(...y):x.splice(i,1)}}
 for(let i=0;i<a.length;i++)if(a[i][0]=="con"&&a[i][1].length==3&&a[i][1][2][0]=="sym")v(a[i]);return a}

let as=a=>{   //replace (modified)assignments, e.g. ['dya', '+=', ['sym','x'] ..] => ['asn', x, ['dya', '+', ['sym', 'x'], ..]]
 let N=(t,i,x)=>(x.T=t,x.i=i,x),ew=x=>('='==x[x.length-1]);
 let F=x=>{if(!Array.isArray(x))return;x.forEach(F);
  if(x[0]=='dya'&&ew(x[1])&&'=='!=x[1]){let s=x[1];x[0]='asn';x[1]=x[2];x[2]=1==s.length?x[3]:N(x.T,x.i,['dya',s.slice(0,-1),x[1],x[3]]);x.splice(3,1)}}
 return F(a),a}

let dr=a=>{   //convert comma to blk, remove drop for niladic functions, convert asn to set
 let F=x=>{if(!Array.isArray(x))return;x.forEach(F); //for(let i=x.length-1;i>=0;i--)F(x[i]);
  if(x[0]=='dya'&&x[1]==','){x[0]='com';x.splice(1,1)}             // [dya , x y] => [com x y]
  if(x[0]=='com'&&x[1][0]=='com')x.splice(1,1,...x[1].slice(1))}   // [com [com x y] z] => [com x y z]
 let G=x=>{if(!Array.isArray(x))return;x.forEach(G);               // [com x y z] => [blk [drp x] [drp y] z]
  if(x[0]=='com'){x[0]='blk';for(let i=1;i<x.length-1;i++){x[i]=['drp',x[i]];x[i].i=x[i][1].i}}}
 let H=x=>{if(!Array.isArray(x))return;x.forEach(H);
  if(x[0]=='drp'){x[1][0]=='cal'&&x[1].T==""?(x.splice(0,2,...x[1])):x[1][0]=='asn'?(x[1][0]='set',x.splice(0,2,...x[1])):0}}
 a.forEach(x=>{if(x[0]=='fun')F(x[4]),G(x[4]),H(x[4])});return a}

let wa=a=>{  //wasm text format
 let e=x=>{throw new Error(`@${x.i} unexpected node type: ${x[0]}`)}
 let s,h,fn=0,ta=0,o="(module\n",O=x=>o+=x+"\n"
 let c=x=>x.slice(1).map(f)
 let T=x=>""==x.T?"":["i32","i64","f64"]["ijf".indexOf(x.T)]
 let p=x=>x.slice(1).map(x=>`(param ${x[1]?"$"+x[1]+" ":""}${T(x)})`).join("")
 let A={},R={},L,D="add sub mul div_s rem_s and or xor lt_s gt_s shl shr_s eq ne le_s ge_s lt_u gt_u le_u gt_u".split(" "),M="neg clz ctz popcount".split(" "),_s=(t,s)=>t=="f"&&s[s.length-2]=='_'?s.slice(0,-2):s
 let l=x=>x.map(x=>`(local $${x[1]} ${T(x)})`).join(""),lo=(x,y)=>L=[...x.map(x=>x[1]),...y.map(x=>x[1])]
 let t=(T,...x)=>(x.T=T,x)
 let res=x=>T(x)?`(result ${T(x)})`:""
 let not=(t,i,s)=>{for(i=0;i<N1.length;i++){s=N1[i]+"\n";if(o.endsWith(s)){o=o.slice(0,-s.length)+N2[i]+"\n";return}};O(t+".eqz")},N1="le_s le_u lt_s lt_u eq gt_s gt_u ge_s ge_u ne".split(" "),N2="gt_s gt_u ge_s ge_u ne le_s le_u lt_s lt_u eq".split(" ")
 let set=(x,d)=>(f(x[2]),L.includes(x[1][1])?O(`local.${d?"set":"tee"} $${x[1][1]}`):(O(`global.set $${x[1][1]}`),d?0:O(`global.get $${x[1][1]}`)))
 let con=(x,m)=>O(`(global $${x[1]} ${m?"(mut "+T(x)+")":T(x)} ${x[2]?"("+T(x)+".const "+x[2][1]+")":''})`)
 let imp=x=>O(`(import ${x[2].split(".").map(x=>'"'+x+'"').join(' ')} (func $${x[1]} ${res(x)}${p(x.slice(2))})`)
 let tab=_=>ta?o=o.replace("(elem",`(table ${ta} funcref)\n(elem`):0
 let icl=x=>["_tab","tab","Tab","tabf"].includes(x[1][1])?O(`call_indirect ${x.slice(2,-1).map(x=>"(param "+T(x)+")").join("")+res(x)}`):0
 let sto=x=>["_b","_i","_I","_f"].includes(x[1][1])?O(T(x[3])+".store"+(x[1][1]=="_b"?"8":"")):0
 let lod=x=>["b_","i_","I_","ff"].includes(x[1][1])?O(T(x)+".load"+(x[1][1]=="b_"?"8":"")):0
 let cnv=(x,i)=>(i=["s$","i$","f$","U$","I$","$f"].indexOf(x[1][1]),i<0)?0:O(T(x)+"."+["extend8_s","wrap_i64","trunc_f64_s","extend_i32_u","extend_i32_s","convert_i32_s"][i])
 let cst=x=>["F$","$$f"].includes(x[1][1])?O(`${T(x)}.reinterpret_${T(x[2])}`):0
 let dat=x=>O(`(data (i32.const ${x[1][1]}) "${Array.from(x[2]).map(x=>"\\"+x.toString(16).padStart(2,'0')).join("")}")`)
 let mem=x=>(x=="memgrow"?O("memory.grow"):x=="_memfill"?O("memory.fill"):x=="_memcpy"?O("memory.copy"):0)
 let ex=a.filter(x=>x[0]=="exp").map(x=>x[1][1])
 let f=x=>((({
  prg:c, blk:c, asn:x=>set(x), set:x=>set(x,1), drp:x=>(f(x[1]),O("drop")), ret:x=>(c(x),O("return")), exp:x=>0, test:x=>0,
  mem:x=>x.length<3?O(`(memory (export "memory") ${x[1][1]})`):dat(x),
  tab:x=>{ta+=x.length-2+(+x[1][1]);O(`(elem (i32.const ${x[1][1]}) ${x.slice(2).map(x=>"$"+x[1]).join(" ")})`)},
  var:x=>x.slice(1).map(x=>con(x,1)), 
  con:x=>x.slice(1).map(x=>con(x,0)),
  imp:x=>x.slice(1).map(imp),
  sym:x=>(!L.includes(x[1]))?O(`global get $${x[1]}`):(x="$"+x[1],o.endsWith(`local.set ${x}\n`))?(o=o.slice(0,-(11+x.length)),O(`local.tee ${x}`)):O(`local.get ${x}`),
  mon:x=>(f(x[2]),x[1]=="!"?not(T(x)):O(T(x)+"."+M["-   clz ctz cnt".indexOf(x[1])/4])),
  dya:x=>(x.slice(2).map(f),O(T(x[2])+"."+D[("+  -  *  /  %  &  |  ^  <  >  << >> == != <= >= lt gt le ge".indexOf(x[1]))/3])),
  num:x=>O(`${T(x)}.const ${x[1]}`),
  cnd:x=>(f(x[1]),O(`if${res(x)}`),f(x[2]),O("else"),f(x[3]),O("end")),
  iff:x=>(f(x[1]),O("if"),f(x[2]),(x.length>3?(O("else"),f(x[3])):0),O("end")),
  whl:x=>(O("block\nloop"),f(x[1]),not("i32"),O("br_if 1"),f(x[2]),O("br 0\nend\nend")),
  dow:x=>(O("loop"),f(x[1]),f(x[2]),O("br_if 0\nend")),
  cal:x=>(x.slice(2).map(f),icl(x)?0:sto(x)?0:lod(x)?0:cnv(x)?0:mem(x[1][1])?0:O(`call $${x[1][1]}`)),
  fun:x=>(O(`(func $${x[1][1]} ${ex.includes(x[1][1])?'(export "'+x[1][1]+'")':""}${p(x[2])}${res(x)}${l(x[3].slice(1))}`),lo(x[2],x[3]),f(x[4]),(o.endsWith("return\n")?o=o.slice(0,-7):0),O(")")),
 })[x[0]]||e(x))(x));f(a);tab();return o+")\n"}


let wb=a=>{let o=[0,97,115,109,1,0,0,0],p=(...x)=>o.push(...x)  //1type 2import 3func 4table 5memory 6global 7export [8start] 9element 10code 11data
 let e=(x,y)=>{throw new Error(`@${x.i}: ${y}`)}
 let us=x=>new TextEncoder().encode(x),uf=x=>{let b=new ArrayBuffer(8),v=new DataView(b);v.setFloat64(0,Number(x),1);return new Uint8Array(b)},vals=x=>Object.values(x)
 let eu=(x,b,r)=>{r=[];do{b=x&127;r.push((x>>>=7)?b|=128:b)}while(x);return r}
 let en=(x,b)=>{let r=[];while(1){b=x&127n;x=x>>7n;if((!x)&&!(b&64n)||(x==-1n&&(b&64n))){r.push(Number(b));break};r.push(Number(b|128n))};return r}
 let ei=(x,b)=>{let r=[];while(1){b=x&127;x>>=7;if(x==0&&!(b&64)||(x==-1&&(b&64))){r.push(b);break};r.push(b|128)};return r}
 let ws=(x,y)=>(y=[...eu(y.length),...y.flat()],p(x,...eu(y.length),...y))
 let t=x=>[0,127,126,124][1+"ijf".indexOf(x)]
 let S=[],F={},G={},D=[],nf=0,ng=0,T=[],te=0,mm=0,E=[],sig=(x,i)=>(i=S.indexOf(x),i<0?S.push(x)-1:i),sfun=(x,s)=>(x.T?x.T:"_")+x[2].slice(1).map(x=>x.T).join(""),simp=x=>(x.T?x.T:"_")+x.slice(2).map(x=>x.T).join("")
 let Y="6a7ca06b7da16c7ea26d7fa36f81007183007284007385006e7f004853637082004a55647688007486007587004651614752624c57654e59664954004b56004d58004f5a00".match(/..?/g).map(x=>parseInt(x,16))
 let X="00009a0067790000687a0000697b0000".match(/..?/g).map(x=>parseInt(x,16))
 let N1="4648494c4d5153545758474e4f4a4b52595a5556".match(/..?/g).map(x=>parseInt(x,16))
 let N2="474e4f4a4b52595a55564648494c4d5153545758".match(/..?/g).map(x=>parseInt(x,16))
 let sg=x=>[96,x.length-1,...x.split("").slice(1).map(t),...(x[0]=="_"?[0]:[1,t(x[0])])]
 let cn=t=>[0x41,0x42,0x44]["ijf".indexOf(t)]
 let gl=(x,y)=>G[x[1]]={name:x[1],mut:y,t:x.T,e:x.length>2?x[2][1]:0,idx:ng++}
 let ns=x=>[...eu(x.length),...us(x)]
 let not=(t,O)=>{let z=o[o.length-1],i=N1.indexOf(z);i<0?O(t=="i"?69:80):o[o.length-1]=N2[i]}
 let icl=(x,O,i)=>["_tab","tab","Tab","tabf"].includes(x[1][1])?(i=S.indexOf((x.T?x.T:"_")+x.slice(2,-1).map(x=>x.T)),i<0?e(x,"unknown function signature"):O(17,0,eu(i))):0
 let sto=(x,O,i)=>(i=["_b","_i","_I","_f"].indexOf(x[1][1]),i<0?0:O([58,54,55,57][i],i==0?0:i==1?2:3,0))
 let lod=(x,O,i)=>(i=["b_","i_","I_","ff"].indexOf(x[1][1]),i<0?0:O([45,40,41,43][i],i==0?0:i==1?2:3,0))
 let cnv=(x,O,i)=>(i=["s$","i$","f$","U$","I$","$f"].indexOf(x[1][1]),i<0)?0:O([192,167,170,173,172,183][i]) //s$(i32.extend8_s) i$(i32.wrap_i64) f$(i32.trunc_f64_s) U$(i64.extend_i32_u) I$(i64.extend_i32_s) $f(f64.convert_i32_s)
 let mem=(x,O)=>(x=="memgrow"?O(64,0):x=="_memcpy"?O(252,10,0,0):x=="_memfill"?O(252,11,0):0)
 let lo=x=>{let o=[0],i,T;x[3].slice(1).forEach(x=>{T=t(x.T);o[o.length-1]==T?o[o.length-2]++:o.push(1,T)});o[0]=o.length>>1;return o}
 let co=(l,L,x)=>{let o=[],O=(...x)=>o.push(...x.flat()),f=x=>(({ret:x=>(f(x[1]),O(15)),blk:x=>x.slice(1).map(f), drp:x=>(f(x[1]),O(26)),
  dya:x=>(f(x[2]),f(x[3]),O(Y["+  -  *  /  %  &  |  ^  div<  rem>  shr<< >> == != <= >= lt gt le ge".indexOf(x[1])+"ijf".indexOf(x.T)])),
  mon:x=>(f(x[2]),x[1]=="!"?not(x.T,O):O(X["-   clz ctz cnt".indexOf(x[1])+"ijf".indexOf(x.T)])),
  num:x=>O(cn(x.T),x.T=="i"?ei(+x[1]):x.T=="j"?en(BigInt(x[1])):[...uf(+x[1])]),
  asn:x=>(f(x[2]),(x[1][1]in l)?O(34,l[x[1][1]]):O(36,eu(G[x[1][1]].idx),35,eu(G[x[1][1]].idx))),
  set:x=>(f(x[2]),(x[1][1]in l)?O(33,l[x[1][1]]):O(36,eu(G[x[1][1]].idx))),
  sym:x=>(x[1]in l)?(o[o.length-2]==33&&o[o.length-1]==l[x[1]]?o[o.length-2]++:O(32,l[x[1]])):(x[1] in G)?O(35,eu(G[x[1]].idx)):e(x,"unknown symbol"),
  cnd:x=>(f(x[1]),O(4,t(x.T)),f(x[2]),O(5),f(x[3]),O(11)),
  iff:x=>(f(x[1]),O(4,64),f(x[2]),(x.length>3?(O(5),f(x[3])):0),O(11)),
  whl:x=>(O(2,64,3,64),f(x[1]),not("i",O),O(13,1),f(x[2]),O(12,0,11,11)),
  dow:x=>(O(3,64),f(x[1]),f(x[2]),O(13,0,11)),
  cal:x=>(x.slice(2).map(f),icl(x,O)?0:sto(x,O)?0:lod(x,O)?0:cnv(x,O)?0:mem(x[1][1],O)?0:O(16,F[x[1][1]]?F[x[1][1]].idx:e(x,"unknown func"))),
  })[x[0]])(x);O(L);f(x);if(o[o.length-1]==15)o.pop();O(11);return o.flat()}
 let fn=x=>{let l={};[...x[2].slice(1).map(x=>x[1]),...x[3].slice(1).map(x=>x[1])].map((x,i)=>l[x]=i);F[x[1][1]].code=co(l,lo(x),x[4])}
 a.forEach(x=>x[0]=="imp"?x.slice(1).map(x=>F[x[1]]={name:x[1],sig:sig(simp(x)),imp:x[2].split("."),idx:nf++})
   :x[0]=="fun"?F[x[1][1]]={name:x[1][1],sig:sig(sfun(x)),imp:"",idx:nf++}
   :x[0]=="tab"?(T.push([+x[1][1],x.slice(2).map(x=>x[1])]),te=Math.max(te,(+x[1][1])+x.length-2)):x[0]=="mem"?(x.length==2?(mm=+x[1][1],E.push([...ns("memory"),2,0])):D.push([+x[1][1],x[2]]))
   :x[0]=="exp"?x.slice(1).map(x=>E.push([...ns(x[1]),0,...eu(F[x[1]].idx)])):x[0]=="var"?x.slice(1).map(x=>gl(x,1)):x[0]=="con"?x.slice(1).map(x=>gl(x,0)):0);
 a.forEach(x=>x[0]=="fun"?fn(x):0);
 ws(1,S.map(sg));ws(2,vals(F).filter(x=>x.imp).map(x=>{let y=x.imp;return[...ns(y[0]),...ns(y[1]),0,...eu(x.sig)]}))
 ws(3,vals(F).filter(x=>!x.imp).map(x=>eu(x.sig)));ws(4,[[112,0,...eu(te)]]);if(mm)ws(5,[[0,mm]])
 ws(6,vals(G).map(x=>[t(x.t),x.mut,...[cn(x.t),...(x.t=="f"?uf(x.e):ei(x.e)),11]]));
 E.length?ws(7,E):0;
 T.length?ws(9,T.map(x=>[0,0x41,...eu(x[0]),11,...x[1].map(x=>eu(F[x].idx)).flat()])):0
 ws(10,vals(F).filter(x=>x.code).map(x=>[...eu(x.code.length),...x.code]))
 D.length?ws(11,D.map(x=>[0,0x41,...eu(x[0]),11,...eu(x[1].length),...x[1]])):0;return new Uint8Array(o)}

