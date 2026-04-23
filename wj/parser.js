let example=_=>`mem(1) //initial memory 64k
mem(0,"abc")                       //initial data
mem(4,1,2n,3)                      //4/8 byte data
let gf,g=55;                       //globals
const G=3n;                        //const
const c1=1,c2=3;
//const sinf=Math.sin,cosf=Math.cos; //imports
//function a(x){x=b(1,x);return -x}
//function B(i,x,y){_b(16,-1);return 1n+Tab(x,y,i)}
//function sf(xf,yp){_f(8,xf);return sinf($f(b_(yp)))}
//function jf(xf){return f$(xf)}
//function _v(x){x}
//function R(X){let p=j$(X)-8;_i(p,i_(p)+1);return X}
//tab(10,a,b)
//function a(x){return x?1+x:-x}
//function b(x){if(x)return 1+x;else return -x}
//function f(x,y){_i(x,y);return 0}
//function g(x, y){y=0;while(y<x)y+=3;return y}
//function h(x, y){y=0;do{y+=2}while(y<x)return y}
function w(X){return ++X}
//function alloc(n, x,t){t=x=bk(n);return i_(t)?_i(t,i_(x),x):x=alloc(2*x),free(x),x+n}
`

let runtime=`
let $M,$V,mem=x=>($V=($M=new Uint8Array(x<<10)).buffer),$=x=>BigInt.asIntN(64,x)
let b_=x=>$M[x],i_=x=>$V.getInt32(x,1),I_=x=>$V.getBigInt64(x,1),ff=x=>$V.getFloat64(x,1)
let _b=(x,y)=>$M[x]=y,_i=(x,y)=>$V.setInt32(x,y,1),_I=(x,y)=>$V.setBigInt64(x,y,1),_f=(x,y)=>$V.setFloat64(x,y,1)
let b$=x=>x<<24>>24,j$=x=>0|x,f$=x=>0|x,U$=x=>BigInt.asUintN(64,BigInt(x)),I$=x=>BigInt(x),$f=x=>x
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
 let dec=$=>{let r=[],s,e,k,j=i,q=Q;Q=1;__('let');do{s=sym(),e=0;_();r.push(c=="="?(k=i,n(),N(k,'drp',N(k,'asn',s,ex()))):s);_();if(c!=',')break;n()}while(1);Q=q;_();if(c==';')n();return N(j,$?'con':'var',...r)}
 let fun=$=>{let j=i,k,a=[],l=[],q=a,b,s;qs('function');_();s=sy(c)?sym():err("anonymous");k=i;qs('(');while(c!=')'&&c){if(p[i-1]==' ')q=l;q.push(sym());if(c!=",")break;n()}
  qs(')');_();return N(j,'fun',s,N(k,'var',...a),N(k,'loc',...l),(b=blk(),2==b.length?b[1]:b))}
 let ret=$=>{let j=i,e;qs('return');_();e=(c==';'||c=='}')?0:ex();if(c==';')n();return N(j,'ret',e)}
 let iff=$=>{let j=i,t,e=0,c,r;qs('if');_();qs('(');c=ex();qs(')');_();t=st();_();if(sw('else')){qs('else');_();e=st()};r=N(j,'iff',c,t);if(e)r.push(e);return r}
 let dow=$=>{let j=i,t,b;qs('do');_();b=st();_();qs('while');_();qs('(');t=ex();qs(')');_();return N(j,'dow',b,t)}
 let whl=$=>{let j=i,b,t;qs('while');_();qs('(');t=ex();qs(')');_();b=st();return N(j,'whl',t,b)}
 let cnd=$=>{let j,q=dya(0),t,e;_();if(c=='?'){j=i,n();t=ex();_();if(c!=':')err('tern : missing');n();e=ex();return N(j,'cnd',q,t,e)};return q}
 let P={',':1,'=':2,'+=':2,'-=':2,'*=':2,'&=':2,'^=':2,'|=':2,/*'||':3,'&&':4,*/'==':5,'!=':5,'<':6,'>':6,'<<':7,'>>':7,'+':8,'-':8,'*':9,'/':9,'%':9};
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
 const w="clz ctz cnt shr div rem lt gt le ge".split(" ")
 let F=x=>{if(!Array.isArray(x))return x;x.forEach(F);
  if(x[0]=='cal'&&w.includes(x[1][1])){x[0]=3==x.length?'mon':'dya';x[1]=x[1][1]}}
 return F(a),a}
 
let ty=a=>{  //typify ast(inplace) adds .T to each node with value "ijf" (void i32 i64 f64)
 let e=x=>{console.log(x);throw new Error(`@${x.i} unexpected node type: ${x[0]}`)}
 let t=s=>s[0]=="_"?"":s[0].toUpperCase()==s[0]?"j":s.endsWith("f")?"f":"i"
 let C=(t,s)=>"< > == != lt gt le ge !".includes(s)?'i':t
 let c=x=>x.slice(1).map(f),c1=x=>x.T=(c(x),x[1].T),cl=x=>x.T=(c(x),x.length>1?x[x.length-1].T:""),cv=x=>x.T=(c(x),"")
 let f=x=>((({fun:c1, blk:cl, drp:cv, var:cv, loc:cv, con:cv, asn:c1, cal:c1, ret:cv, iff:cv, cnd:cl, whl:cv, dow:cv,   //a poor man's switch
              sym:x=>x.T=t(x[1]),     dya:x=>x.T=(f(x[2]),C(f(x[3]),x[1])),   mon:x=>x.T=C(f(x[2]),x[1]),               //with default
	      imp:x=>x.T=t(x[1]),     str:x=>x.T="",
              num:x=>x.T=x[1].endsWith("n")?"j":x[1].includes(".")?"f":"i"})[x[0]]||e(x))(x),x.T);c(a);return a}

let ng=a=>{   //replace -x with 0-x  and  ++/--x with x=1+x   and  ~x with -1^
 T=(t,i,x)=>(x.T=t,x.i=i,x)
 let F=x=>{if(!Array.isArray(x))return x;x.forEach(F);
  if(x[0]=='mon'&&x[1]=='-'&&x.T!='f'){x[0]='dya',x.push(x[2]),x[2]=T(x.T,x.i,['num','0'])}
  if(x[0]=='mon'&&x[1].length==2){x[0]='dya';x[1]=x[0]=="+"?"+=":"-=";x[3]=T(x.T,x.i,['num','1'])}
  if(x[0]=='mon'&&x[1]=="~"){x[0]='dya',x[1]='^',x.push(x[2]),x[2]=T(x.T,x.i,['num','-1'])}
  }
 return F(a),a}

let bi=a=>{  //builtin function calls at top level   mem(1)  tab(10,a,b,c)   exp(a,b,c)
 a.forEach(x=>{if(x[0]=="drp"){let a=x[1].slice(2);x[0]=x[1][1][1];x.splice(1,1);x.push(...a)}});return a}

let im=a=>{  //replace imports, e.g. const atanf=Math.atan2 with ["imp","atanf","Math","atan2",["sym"],["sym"]] (arg types in sym.T from 1st call)
 let N=(t,i,x)=>(x.T=t,x.i=i,x),F=(x,s)=>Array.isArray(x)?x[0]=='cal'&&x[1][1]==s?x:x.reduce((r,x)=>r||F(x,s),0):0; //first call node
 let t=s=>s[0]=="_"?"":s[0].toUpperCase()==s[0]?"j":s.endsWith("f")?"f":"i"
 let v=x=>{let y,s,xi;for(let i=x.length-1;i>0;i--)if("asn"==(xi=x[i])[0]&&"sym"==xi[2][0])(y=F(a,s=xi[1][1]))?x[i]=N(t(s),x.i,["imp",s,xi[2][1],...y.slice(2).map(x=>N(x.T,x.i,["sym"]))]):x.splice(i,1)}
 for(let i=0;i<a.length;i++)if(a[i][0]=="con")v(a[i]);return a}

let as=a=>{   //replace (modified)assignments, e.g. ['dya', '+=', ['sym','x'] ..] => ['asn', x, ['dya', '+', ['sym', 'x'], ..]]
 let N=(t,i,x)=>(x.T=t,x.i=i,x),ew=x=>('='==x[x.length-1]);
 let F=x=>{if(!Array.isArray(x))return;x.forEach(F);
  if(x[0]=='dya'&&ew(x[1])&&'=='!=x[1]){let s=x[1];x[0]='asn';x[1]=x[2];x[2]=1==s.length?x[3]:N(x.T,x.i,['dya',s.slice(0,-1),x[1],x[3]]);x.splice(3,1)}}
 return F(a),a}

let wa=a=>{  //wasm text format
 let e=x=>{throw new Error(`@${x.i} unexpected node type: ${x[0]}`)}
 let s,h,fn=0,ta=0,o="(module\n",O=x=>o+=x+"\n"
 let c=x=>x.slice(1).map(f)
 let T=x=>""==x.T?"":["i32","i64","f64"]["ijf".indexOf(x.T)]
 let p=x=>x.slice(1).map(x=>`(param ${x[1]?"$"+x[1]+" ":""}${T(x)})`).join("")
 let A={},R={},D="add sub mul div_s rem_s and or xor lt_s gt_s shl shr_s eq ne le_s ge_s lt_u gt_u le_u gt_u".split(" "),M="neg eqz clz ctz popcount".split(" "),_s=(t,s)=>t=="f"&&s[s.length-2]=='_'?s.slice(0,-2):s
 let L=x=>x.map(x=>`(local $${x[1]} ${T(x)})`).join("") //fn
 let t=(T,...x)=>(x.T=T,x)
 let res=x=>T(x)?`(result ${T(x)})`:""
 let set=(x,d)=>(f(x[2]),O(`local.${d?"set":"tee"} $${x[1][1]}`))
 let con=(x,y,m)=>O(`(global $${x[1]} ${m?"(mut "+T(x)+")":T(x)} ${y?"("+T(y)+".const "+y[1]+")":''})`)
 let imp=x=>O(`(import ${x[2].split(".").map(x=>'"'+x+'"').join(' ')} (func $${x[1]} ${res(x)}${p(x.slice(2))})`)
 let tab=_=>ta?o=o.replace("(elem",`(table ${ta} funcref)\n(elem`):0
 let icl=x=>["_tab","tab","Tab","tabf"].includes(x[1][1])?O(`call_indirect ${x.slice(2,-1).map(x=>"(param "+T(x)+")").join("")+res(x)}`):0
 let sto=x=>["_b","_i","_I","_I","_f"].includes(x[1][1])?O(T(x[3])+".store"+(x[1][1]=="_b"?"8":"")):0
 let lod=x=>["b_","i_","I_","ff"].includes(x[1][1])?O(T(x)+".load"+(x[1][1]=="b_"?"8":"")):0
 let cnv=(x,i)=>(i=["b$","j$","f$","U$","I$","f$"].indexOf(x[1][1]),i<0)?0:O(T(x)+"."+["extend8_s","wrap_i64","trunc_f64_s","extend_i32_u","extend_i32_s","convert_i32_s"][i])
 let cst=x=>["F$","$$f"].includes(x[1][1])?O(`${T(x)}.reinterpret_${T(x[2])}`):0
 let drp=x=>x[0]=='asn'?set(x,1):(f(x),x[0]=='cal'&&x.T==""?0:O("drop"))
 //let dat=x= //https://webassembly.github.io/spec/core/text/values.html#text-string
 let f=x=>((({
  prg:c, blk:c, asn:x=>set(x), drp:x=>drp(x[1]), ret:x=>(c(x),O("return")),
  mem:x=>3<x.length?O(`(memory (export "memory") ${x[1][1]})`):dat(x.slice(1)),
  tab:x=>{ta+=x.length-2+(+x[1][1]);O(`(elem (i32.const ${x[1][1]}) ${x.slice(2).map(x=>"$"+x[1]).join(" ")})`)},
  var:x=>x.slice(1).map(x=>(x[0]=="sym"?con(x,0,1):con(x[1][1],x[1][2],1))), 
  con:x=>x.slice(1).map(x=>x[0]=="imp"?imp(x):x[0]=="drp"?con(x[1][1],x[1][2]):con(x,0)),
  sym:x=>(x="$"+x[1],o.endsWith(`local.set ${x}\n`))?(o=o.slice(0,-(11+x.length)),O(`local.tee ${x}`)):O(`local.get ${x}`),
  mon:x=>(f(x[2]),O(T(x)+"."+M["-   !   clz ctz cnt".indexOf(x[1])/4])),
  dya:x=>(x[1]==","?(drp(x[2]),f(x[3])):(x.slice(2).map(f),O(T(x[2])+"."+D[("+  -  *  /  %  &  |  ^  <  >  << >> == != <= >= lt gt le ge".indexOf(x[1]))/3]))),
  num:x=>O(`${T(x)}.const ${x.T=="j"&&x[1][x[1].length-1]=="n"?x[1].slice(0,-1):x[1]}`),
  cnd:x=>(f(x[1]),O(`if${res(x)}`),f(x[2]),O("else"),f(x[3]),O("end")),
  iff:x=>(f(x[1]),O("if"),f(x[2]),(x.length>3?(O("else"),f(x[3])):0),O("end")),
  whl:x=>(O("block\nloop"),f(x[1]),O("br_if 1"),f(x[2]),O("br 0\nend\nend")),
  dow:x=>(O("loop"),f(x[1]),f(x[2]),O("br_if 0\nend")),
  cal:x=>(x.slice(2).map(f),icl(x)?0:sto(x)?0:lod(x)?0:cnv(x)?0:O(`call ${x[1][1]}`)),
  fun:x=>( O(`(func $${x[1][1]} ${p(x[2])} ${res(x)} ${L(x[3].slice(1))}`), f(x[4]),(o.endsWith("return\n")?o=o.slice(0,-7):0),O(")")),
 })[x[0]]||e(x))(x));f(a);tab();return o+")\n"}
/*
load from memory (byte position x)
 b_(x) //load byte as i32 0-255
 i_(x) //load i32
 I_(x) //load i64
 ff(x) //load f64
store
 _b(x,y) //store byte
 _i(x,y) //store i32
 _I(x,y)
 _f(x,y)
convert
 b$ i32.extend8_s  j$ i32.wrap_i64   f$ i32.trunc_f64_s  U$ i64.extend_i32_u I$ i64.extend_i32_s  $f f64.convert_i32_s
*/


