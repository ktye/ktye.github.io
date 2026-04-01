let parse=p=>{let i=0,c=p[0],err=s=>{throw new Error("@"+i+" "+s)},n=()=>c=p[++i]||'';             //js parser
 let _=$=>{while(1){while(/\s/.test(c))n();if(c=='/'&&p[i+1]=='/'){n();n();while(c&&c!='\n')n();continue}break}}
 let sy=c=>/[A-Za-z_$]/.test(c),sY=c=>/[A-Za-z0-9_$]/.test(c)
 let sw=x=>x==p.substr(i,x.length),__=s=>{i+=s.length;c=p[i]||'';_()}
 let qs=s=>{if(!sw(s))err('expected '+s);__(s)};
 let st=$=>{_();let r,e,t=(s,n)=>sw(s)&&/\W/.test(p[i+s.length]);if(r=t('let')?dec():t('function')?fun():t('return')?ret():t('if')?iff():t('while')?whl():0)return r;
  if(c=='{')return blk();e=ex();_();if(c==';')n();return{t:'est',e}}
 let ex=$=>{let s=cnd(),e;_();if(c=='='){n();_();e=ex();return{t:'asn',s,e}};return s}
 let prg=$=>{let b=[];while(i<p.length){_();if(!c)break;b.push(st())};return{t:'prg',b}}
 let blk=$=>{qs('{');let b=[];while(c&&c!='}'){b.push(st());_()};qs('}');return{t:'blk',b}}
 let dec=$=>{let r=[],s,e;__('let');do{s=sym(),e=0;_();if(c=='='){n();_();e=ex();_()};r.push({t:'asn',s,e});if(c==','){n();_()}else break}while(1)
  if(c==';')n();return{t:'var',l:r}}
 let fun=$=>{qs('function');_();let a=[],s=sy(c)?sym():null;_();qs('(');_();while(c!=')'&&c){a.push(sym());_();if(c==','){n();_()}else break};
  qs(')');_();return{t:'fun',s,a,b:blk()}}
 let ret=$=>{qs('return');_();let e=(c==';'||c=='}')?0:ex();if(c==';')n();return {t:'ret',e}}
 let iff=$=>{qs('if');_();qs('(');let c=ex(),t,e=0;qs(')');_();t=st();_();if(sw('else')){qs('else');_();e=st()};return{t:'iff',c,t,e}}
 let whl=$=>{qs('while');_();qs('(');let b,t=ex();qs(')');_();b=st();return{t:'whl',t,b}}
 let cnd=$=>{let test=dya(0),then,els;_();if(c=='?'){n();_();then=ex();_();if(c!=':')err('tern : missing');n();_();els=ex();return{t:'cnd',test,then,els}};return test}
 let P={'||':1,'&&':2,'==':3,'!=':3,'<':4,'>':4,'+':5,'-':5,'*':6,'/':6};
 let dya=m=>{let q,o,oo,r,l=mon();_();while(1){oo=p.substr(i,2);o=P[oo]?oo:P[o]?o:0;if(!o)break;q=P[o]||0;if(q<m)break;__(o);r=dya(q+1);l={t:'dya',o,l,r};_()}return l}
 let mon=$=>{_();if("+-!~".includes(c)){let o=c;n();_();return{t:'mon',o,r:mon()}};return sta()}
 let sta=$=>{_();if(c=='('){n();_();let e=ex();qs(')');return e};return(c=='"'||c=="'")?str():/[0-9]/.test(c)?num():sy(c)?scl():err('token unexpected '+c)}
 let str=$=>{let q=c,s='';n();while(c&&c!=q){if(c=='\\'){n();s+=p[i]||'';n()}else{s+=c;n()}}qs(q);return{t:'str',s}}
 let num=$=>{let s='';while("0123456789xn.".includes(c)){s+=c;n()}return{t:'num',s}}
 let sym=$=>{let s='';if(!sy(c))err("expected identifier");while(sY(c)){s+=c;n()};return{t:'sym',s}}
 let scl=$=>{let f=sym(),a=[];_();if(c=='('){n();_();while(c!=')'&&c){a.push(ex());_();if(c==','){n();_()}else break};qs(')');return{t:'cal',f,a}};return f}
 return prg()}

/*ast nodes: nested objects
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

todo [] x++ ++x << >> x+=y
negative literals
*/
