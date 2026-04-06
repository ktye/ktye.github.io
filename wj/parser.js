let example=_=>`memory(1)
function a(x){return b(1,x)}
function b(x,y){return -x+y}
//runtime
"ignore from here on.."`

let parse=p=>{let i=0,c=p[0],err=s=>{throw new Error("@"+i+" "+s)},n=()=>(c=p[++i],_()),N=(p,...x)=>(x,x.i=p,x)      //js parser
 let _=$=>{while(1){while(/\s/.test(p[i]))i++;if(c=='/'&&p[i+1]=='/'){i+=2;if(sw("runtim"))i=p.length;while(p[i]&&p[i]!='\n')i++;continue}break};c=p[i]||''}
 let sy=c=>/[A-Za-z_$]/.test(c),sY=c=>/[A-Za-z0-9_$]/.test(c)
 let sw=x=>x==p.substr(i,x.length),__=s=>{i+=s.length;c=p[i]||'';_()}
 let qs=s=>{if(!sw(s))err('expected '+s);__(s)};
 let st=$=>{_();let r,e,t=(s,n)=>sw(s)&&/\W/.test(p[i+s.length]);if(r=t('let')?dec():t('function')?fun():t('return')?ret():t('if')?iff():t('while')?whl():0)return r;
  if(c=='{')return blk();e=ex();_();if(c==';')n();return N(e.i,'est',e)}
 let ex=$=>{let j=i,s=cnd(),e;_();if(c=='='){n();e=ex();return N(j,'asn',s,e)};return s}
 let prg=$=>{let b=[];while(i<p.length){_();if(!c)break;b.push(st())};return N(0,'prg',...b)}
 let blk=$=>{qs('{');let j=i,b=[];while(c&&c!='}'){b.push(st());_()};qs('}');return N(j,'blk',...b)}
 let dec=$=>{let r=[],s,e,k,j=i;__('let');do{s=sym(),e=0;_();r.push(c=="="?(k=i,n(),N(k,'asn',s,ex())):s);_();if(c!=',')break;n()}while(1);if(c==';')n();return N(j,'var',...r)}
 let fun=$=>{let j=i,k,a=[],b,s;qs('function');_();s=sy(c)?sym():err("anonymous");_();k=i;qs('(');_();while(c!=')'&&c){a.push(sym());_();if(c!=",")break;n()}
  qs(')');_();return N(j,'fun',s,N(k,'var',...a),(b=blk(),2==b.length?b[1]:b))}
 let ret=$=>{let j=i,e;qs('return');_();e=(c==';'||c=='}')?0:ex();if(c==';')n();return N(j,'ret',e)}
 let iff=$=>{let j=i,t,e=0,c;qs('if');_();qs('(');c=ex();qs(')');_();t=st();_();if(sw('else')){qs('else');_();e=st()};return N(j,'iff',c,t,e)}
 let whl=$=>{let j=i,b,t;qs('while');_();qs('(');t=ex();qs(')');_();b=st();return N(j,'whl',t,b)}
 let cnd=$=>{let j,q=dya(0),t,e;_();if(c=='?'){j=i,n();t=ex();_();if(c!=':')err('tern : missing');n();e=ex();return N(j,'cnd',q,t,e)};return q}
 let P={'||':1,'&&':2,'==':3,'!=':3,'<':4,'>':4,'+':5,'-':5,'*':6,'/':6};
 let dya=m=>{let q,o,oo,r,j,l=mon();while(1){j=i;oo=p.substr(i,2);o=P[oo]?oo:P[c]?c:0;if(!o)break;q=P[o]||0;if(q<m)break;__(o);r=dya(q+1);l=N(j,'dya',o,l,r);_()}return l}
 let mon=$=>{_();if("+-!~".includes(c)){let j=i,o=c;if(c==p[1+i]&&"+-".indexOf(c)>=0){o+=o;i++};n();return N(j,'mon',o,mon())};return sta()}
 let sta=$=>{_();if(c=='('){n();let e=ex();qs(')');return e};return(c=='"'||c=="'")?str():/[0-9]/.test(c)?num():sy(c)?scl():err('token unexpected '+c)}
 let str=$=>{let j=i,q=c,s='';n();while(c&&c!=q){if(c=='\\'){n();s+=p[i]||'';n()}else{s+=c;n()}}qs(q);return N(j,'str',s)}
 let num=$=>{let j=i,s='';while("0123456789xn.".includes(c))s+=c,c=p[++i];return N(j,'num',s)}
 let sym=$=>{let j=i,s='';if(!sy(c))err("expected identifier");while(sY(c))s+=c,c=p[++i];return N(j,'sym',s)}
 let scl=$=>{let j,f=sym(),a=[];_();if(c=='('){j=i;n();while(c!=')'&&c){a.push(ex());_();if(c!=",")break;n()};qs(')');return N(j,'cal',f,...a)};return f}
 return prg()}

/*ast nodes: nested arrays. all nodes have also .i(src offset)
prg b..          program body[statements]
blk b..          block
est e            expression statement
var l            variable declaration list l:[asn+]
asn s e          assignment
fun s a b        function name(sym) args[sym] body(blk|statement)
cal f a..        call function [arguments]
sym s            symbol/identifier s(string)
ret e|0          return expression
iff c t e|0      if condition then else (statement)
cnd c t e        if condition then else (ternary expression)
whl c b          while condition body
dya o l r        dyadic operator left right
mon o r          monadic operator
str s            string literal
num s            numeric literal
*/

// loc: uppercase:i64 endwith"f":"f64" otherwise:i32    fun(return value) fname:startswith_(void)/upper/endswithf/otherwise

let pr=(a,sp)=>{if(!Array.isArray(a)){return sp+String(a)+"\n"};if(!a.length)return sp+"()\n"
 let s=sp+a[0]+"."+(a.T||'')+" @"+a.i+"\n";for(let i=1;i<a.length;i++)s+=pr(a[i],sp+" ");return s}

let ty=a=>{  //typify ast(inplace) adds .T to each node with value "ijf" (void i32 i64 f64)
 let e=x=>{throw new Error(`@${x.i} unexpected node type: ${x[0]}`)}
 let t=s=>s[0]=="_"?"":s[0].toUpperCase()==s[0]?"j":s.endsWith("f")?"f":"i"
 let c=x=>x.slice(1).map(f),c1=x=>x.T=(c(x),x[1].T),cl=x=>x.T=(c(x),x.length>1?x[x.length-1].T:""),cv=x=>x.T=(c(x),"")
 let f=x=>((({fun:c1, blk:cl, est:cl, var:cv, asn:c1, cal:c1, ret:cl, iff:cv, cnd:cl, whl:cv,    //a poor man's switch
              sym:x=>x.T=t(x[1]),     dya:x=>x.T=(f(x[2]),f(x[3])),   mon:x=>x.T=f(x[2]),        //with default
              num:x=>x.T=x[1].endsWith("n")?"j":x[1].includes(".")?"f":"i"})[x[0]]||e(x))(x),x.T);c(a);return a}


let wa=a=>{  //wasm text format
 let e=x=>{throw new Error(`@${x.i} unexpected node type: ${x[0]}`)}
 let s,h,o="(module\n",O=x=>o+=x+"\n"
 let c=x=>x.slice(1).map(f)
 let T=x=>["","i32","i64","f64"][1+"ijf".indexOf(x.T)]
 let p=x=>x.slice(1).map(x=>`(param $${x[1][0]} ${T(x)})`).join("")
 let A={},R={},V=[],D="add sub mul".split(" ")
 let L=x=>(x=V,V=[],x.map(x=>`(local $${x[1]} ${T(x)})`).join(""))
 let t=(T,...x)=>(x.T=T,x)
 //let m=a=>{let b=a,r="";do{r+="."+b[0];b=b[1]}while("string"!=typeof b[1]);console.log("M",r);return a}
 let m=x=>{let f=(r,x)=>"string"==typeof x?r+"."+x:f(r+"."+x[0],x[1]);if(".est.cal.sym.memory"==f("",x[1])){O(`(memory (export "memory") ${x[1][1][2][1]})`);x.splice(1,1)};return x}
 let f=x=>((({
  prg:c, blk:c,
  var:x=>x.slice(1).map(x=>(x=x[0]=="asn"?(f(x),x[1]):x,V.push(x))),
  asn:x=>(f(x[2]),O(`local.tee $${x[1][1]}`)),
  sym:x=>O(`local.get $${x[1]}`),
  mon:x=>x.T=="f"?(f(x[2]),O("f64.neg")):(O(T(x)+".const 0"),f(x[2]),O(T(x)+".sub")),
  dya:x=>(x.slice(2).map(f),O(T(x)+"."+D["+-*".indexOf(x[1])])),
  ret:x=>(c(x),O("return")),
  num:x=>O(`${T(x)}.const ${x[1]}`),
  cal:x=>(x.slice(2).map(f),O(`call ${x[0][1]}`)),
  fun:x=>(O("^"),f(x[3]),O(")"),o=o.replace("^",`(func $${x[1][1]} ${p(x[2])} ${T(x)?"(result "+T(x)+")":""} ${L()}`)),
 })[x[0]]||e(x))(x));f(m(a));return o+")\n"}

/*
todo [] x++ ++x << >> x+=y
todo N: set .i but as the start of the node
negative literals
let JS=JSON.stringify
*/
