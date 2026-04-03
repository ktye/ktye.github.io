let parse=p=>{let i=0,c=p[0],err=s=>{throw new Error("@"+i+" "+s)},n=()=>c=p[++i]||'',N=(...x)=>x           //js parser
 let _=$=>{while(1){while(/\s/.test(c))n();if(c=='/'&&p[i+1]=='/'){n();n();while(c&&c!='\n')n();continue}break}}
 let sy=c=>/[A-Za-z_$]/.test(c),sY=c=>/[A-Za-z0-9_$]/.test(c)
 let sw=x=>x==p.substr(i,x.length),__=s=>{i+=s.length;c=p[i]||'';_()}
 let qs=s=>{if(!sw(s))err('expected '+s);__(s)};
 let st=$=>{_();let r,e,t=(s,n)=>sw(s)&&/\W/.test(p[i+s.length]);if(r=t('let')?dec():t('function')?fun():t('return')?ret():t('if')?iff():t('while')?whl():0)return r;
  if(c=='{')return blk();e=ex();_();if(c==';')n();return N('est',e)}
 let ex=$=>{let s=cnd(),e;_();if(c=='='){n();_();e=ex();return N('asn',s,e)};return s}
 let prg=$=>{let b=[];while(i<p.length){_();if(!c)break;b.push(st())};return N('prg',...b)}
 let blk=$=>{qs('{');let b=[];while(c&&c!='}'){b.push(st());_()};qs('}');return N('blk',...b)}
 let dec=$=>{let r=[],s,e;__('let');do{s=sym(),e=0;_();if(c=='='){n();_();e=ex();_()};r.push(['asn',i,s,e]);if(c==','){n();_()}else break}while(1)
  if(c==';')n();return N('var',...r)}
 let fun=$=>{qs('function');_();let a=[],b,s=sy(c)?sym():err("anonymous func");_();qs('(');_();while(c!=')'&&c){a.push(sym());_();if(c==','){n();_()}else break};
  qs(')');_();return N('fun',s,N('var',...a),(b=blk(),2==b.length?b[1]:b))}
 let ret=$=>{qs('return');_();let e=(c==';'||c=='}')?0:ex();if(c==';')n();return N('ret',e)}
 let iff=$=>{qs('if');_();qs('(');let c=ex(),t,e=0;qs(')');_();t=st();_();if(sw('else')){qs('else');_();e=st()};return N('iff',c,t,e)}
 let whl=$=>{qs('while');_();qs('(');let b,t=ex();qs(')');_();b=st();return N('whl',t,b)}
 let cnd=$=>{let q=dya(0),t,e;_();if(c=='?'){n();_();t=ex();_();if(c!=':')err('tern : missing');n();_();e=ex();return N('cnd',q,t,e)};return q}
 let P={'||':1,'&&':2,'==':3,'!=':3,'<':4,'>':4,'+':5,'-':5,'*':6,'/':6};
 let dya=m=>{let q,o,oo,r,l=mon();_();while(1){oo=p.substr(i,2);o=P[oo]?oo:P[c]?c:0;if(!o)break;q=P[o]||0;if(q<m)break;__(o);r=dya(q+1);l=N('dya',o,l,r);_()}return l}
 let mon=$=>{_();if("+-!~".includes(c)){let o=c;n();_();return('mon',o,mon())};return sta()}
 let sta=$=>{_();if(c=='('){n();_();let e=ex();qs(')');return e};return(c=='"'||c=="'")?str():/[0-9]/.test(c)?num():sy(c)?scl():err('token unexpected '+c)}
 let str=$=>{let q=c,s='';n();while(c&&c!=q){if(c=='\\'){n();s+=p[i]||'';n()}else{s+=c;n()}}qs(q);return N('str',i,s)}
 let num=$=>{let s='';while("0123456789xn.".includes(c)){s+=c;n()}return N('num',i,s)}
 let sym=$=>{let s='';if(!sy(c))err("expected identifier");while(sY(c)){s+=c;n()};return N('sym',s)}
 let scl=$=>{let f=sym(),a=[];_();if(c=='('){n();_();while(c!=')'&&c){a.push(ex());_();if(c==','){n();_()}else break};qs(')');return N('cal',f,a)};return f}
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

let pr=(a,sp)=>{if(!Array.isArray(a))return sp+"("+typeof a+")"+String(a)+"\n";if(!a.length)return sp+"()\n"
 let s=sp+a[0]+"."+(a.T||'')+"\n";for(let i=1;i<a.length;i++)s+=pr(a[i],sp+" ");return s}

let ty=a=>{  //typify ast(inplace) adds .T to each node with value "vijf" (void i32 i64 f64)
 let Q=(p,x,y)=>{if(x.T!=y.T)err(`@${p.i}: type mismatch: ${x.T}~${y.T}`);return x.T},err=s=>{throw new Error(s)}
 let l=x=>x[x.length-1],v=""
 let t=s=>s[0]=="_"?"v":s[0].toUpperCase()==s[0]?"j":s.endsWith("f")?"f":"i"
 let c=x=>x.slice(1).map(f)                  //typify children
 let f=x=>( console.log("f",x[0]),
  ({fun:x=>x.T=(c(x),x[0].T),
    blk:x=>x.T=l(c(x)),
    est:x=>x.T=f(x[1]),
    var:x=>x.T=(c(x),v),
    asn:x=>x.T=(c(x),Q(x,x[1],x[2])),        //we check(may throw) on asn, cnd and dya, we could also uptype
    cal:x=>x.T=(c(x),t(x[1])),
    sym:x=>x.T=t(x[1]),
    ret:x=>x.T=x.length>1?f(x[1]):v,
    iff:x=>x.T=(c(x),v),
    cnd:x=>x.T=(c(x),Q(x[2],x[3])),
    whl:x=>x.T=(c(x),v),
    dya:x=>x.T=(f(x[2]),f(x[3]),Q(x,x[2],x[3])),
    mon:x=>x.T=f(x[2]),
    str:x=>err("unexpected node str"),
    num:x=>x.T=x[1].endsWith("n")?"j":x[1].includes(".")?"f":"i",
  })[x[0]](x),x.T)
 c(a);return a}
 

let wa=a=>{let $=[],O=s=>$.push(s),err=(x,s)=>{throw new Error("@"+i+" "+s)}
 let _=s=>s[0]=="_"?s.slice(1):s
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
todo N: set .i but as the start of the node
negative literals
let JS=JSON.stringify
*/
