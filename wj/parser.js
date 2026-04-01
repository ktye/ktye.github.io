let parse=p=>{let i=0,c=p[0],err=s=>{throw new Error("@"+i+" "+s)},n=()=>c=p[++i]||'';             //js parser
 let _=$=>{while(1){while(/\s/.test(c))n();if(c=='/'&&p[i+1]=='/'){n();n();while(c&&c!='\n')n();continue}break}}
 let sy=c=>/[A-Za-z_$]/.test(c),sY=c=>/[A-Za-z0-9_$]/.test(c)
 let sw=x=>x==p.substr(i,x.length),__=s=>{i+=s.length;c=p[i]||'';_()}
 let qs=s=>{if(!sw(s))err('expected '+s);__(s)};
 let st=$=>{_();let r,e,t=(s,n)=>sw(s)&&/\W/.test(p[i+s.length]);if(r=t('let')?dec():t('function')?fun():t('return')?ret():t('if')?iff():t('while')?whl():0)return r;
  if(c=='{')return blk();e=ex();_();if(c==';')n();return{t:'est',i,e}}
 let ex=$=>{let s=cnd(),e;_();if(c=='='){n();_();e=ex();return{t:'asn',i,s,e}};return s}
 let prg=$=>{let b=[];while(i<p.length){_();if(!c)break;b.push(st())};return{t:'prg',i,b}}
 let blk=$=>{qs('{');let b=[];while(c&&c!='}'){b.push(st());_()};qs('}');return{t:'blk',i,b}}
 let dec=$=>{let r=[],s,e;__('let');do{s=sym(),e=0;_();if(c=='='){n();_();e=ex();_()};r.push({t:'asn',i,s,e});if(c==','){n();_()}else break}while(1)
  if(c==';')n();return{t:'var',i,l:r}}
 let fun=$=>{qs('function');_();let a=[],s=sy(c)?sym():err("anonymous func");_();qs('(');_();while(c!=')'&&c){a.push(sym());_();if(c==','){n();_()}else break};
  qs(')');_();return{t:'fun',i,s,a,b:blk()}}
 let ret=$=>{qs('return');_();let e=(c==';'||c=='}')?0:ex();if(c==';')n();return {t:'ret',i,e}}
 let iff=$=>{qs('if');_();qs('(');let c=ex(),t,e=0;qs(')');_();t=st();_();if(sw('else')){qs('else');_();e=st()};return{t:'iff',i,c,t,e}}
 let whl=$=>{qs('while');_();qs('(');let b,t=ex();qs(')');_();b=st();return{t:'whl',i,t,b}}
 let cnd=$=>{let q=dya(0),t,e;_();if(c=='?'){n();_();t=ex();_();if(c!=':')err('tern : missing');n();_();e=ex();return{t:'cnd',i,c:q,t,e}};return q}
 let P={'||':1,'&&':2,'==':3,'!=':3,'<':4,'>':4,'+':5,'-':5,'*':6,'/':6};
 let dya=m=>{let q,o,oo,r,l=mon();_();while(1){oo=p.substr(i,2);o=P[oo]?oo:P[c]?c:0;if(!o)break;q=P[o]||0;if(q<m)break;__(o);r=dya(q+1);l={t:'dya',i,o,l,r};_()}return l}
 let mon=$=>{_();if("+-!~".includes(c)){let o=c;n();_();return{t:'mon',i,o,r:mon()}};return sta()}
 let sta=$=>{_();if(c=='('){n();_();let e=ex();qs(')');return e};return(c=='"'||c=="'")?str():/[0-9]/.test(c)?num():sy(c)?scl():err('token unexpected '+c)}
 let str=$=>{let q=c,s='';n();while(c&&c!=q){if(c=='\\'){n();s+=p[i]||'';n()}else{s+=c;n()}}qs(q);return{t:'str',i,s}}
 let num=$=>{let s='';while("0123456789xn.".includes(c)){s+=c;n()}return{t:'num',i,s}}
 let sym=$=>{let s='';if(!sy(c))err("expected identifier");while(sY(c)){s+=c;n()};return{t:'sym',i,s}}
 let scl=$=>{let f=sym(),a=[];_();if(c=='('){n();_();while(c!=')'&&c){a.push(ex());_();if(c==','){n();_()}else break};qs(')');return{t:'cal',i,f,a}};return f}
 return prg()}

/*ast nodes: nested objects. all nodes have also .i(src offset)
prg b            program body[statements]
blk b            block
est e            expression statement
var l            variable declaration list l:[asn+]
asn s e          assignment
fun s a b        function name(sym) args[sym] body(blk)
cal f a          call function [arguments]
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

let ty=a=>{  //typify ast(inplace) (add .T to each node with value "ijf" or !x.T
 let Q=(x,y,i)=>(x.T!=y.T?err("@"+i+": type mismatch")),err=s=>{throw new Error(s)}
 let t=s=>s[0]=="_"?"":s[0].toUpperCase()==s[0]?"j":s.endwWith("f")?"f":"i"
 let f=x=>{
  {fun:x=>x.T=t(x.s.s),
   blk:x=>x.forEach(x=>x.map(f)),
   est:x=>x.T=f(x.e),
   var:x=>x.l.forEach(f),
   asn:x=>(x.s.T=t(x.s.s),f(x.e)),
   cal:x=>(x.T=t(x.f.s),a.forEach(f)),
   sym:x=>x.T=t(x.s),
   ret:x=>x.T=x.e?f(x.e):"",
   iff:x=>(f(x.c),f(x.t),x.e?f(x.e)),
   cnd:x=>(f(x.c),f(x.t),x.T=x.e),
   whl:x=>(f(x.c),b.forEach(f)),
   dya:x=>(f(x.l),f(x.l),f(x.r),Q(x.l,x.r,x.i),x.T=x.l.T),
   mon:x=>(x.T=f(x.r)),
   str:x=>err("unexpected node str"),
   num:x=>x.T=x.s.endsWith("n")?"j":x.s.includes(".")?"f":"i",
  }[x.t](x);return x.T}
 a.b.filter(x=>x.t=="fun").forEach(f);return a}
 

let wa=a=>{let $=[],O=s=>$.push(s),err=(x,s)=>{throw new Error("@"+i+" "+s)}
 let _=s=>_s[0]=="_"?s.slice(1):s
 let t=x=>["","i32","i64","f64"]["ijf".indexOf(x.T||"?")]
 let fun=x=>{let s=x.s.s,r=t(x);if(r)r=`(result ${r})`
  let a=x=>`(param $${x.s} ${t(x)})`
  O(`(fun $${_(s)} ${x.a.map(a).join("")} ${r}`);/*todo loc*/ blk(x.b) ;O(")")}
 let blk=x=>x.b.forEach(x=>out(x))
 let sym=x=>O(`local.get $${x.s}`)
 let out=x=>x.t=="ret"?(out(x.e),O("return")):x.t=="sym"?sym(x):x.t=="dya"?dya(x):(console.log(x),err(x,x.t))
 let dya=x=>(out(x.l),out(x.r),O(x.o)/*todo*/)
 O("(module");a.b.forEach(x=>x.t=="fun"?fun(x):err(x,"type: fun expected"))
 return $.join("\n")+")\n"}

/*
todo [] x++ ++x << >> x+=y
negative literals
let JS=JSON.stringify
*/
