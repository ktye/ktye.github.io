let parse=p=>{let i=0,c=p[0],err=s=>{throw new Error(s)},nx=()=>{i++;c=p[i]||''}              //js parser
 let syma=c=>/[A-Za-z_$]/.test(c),symb=c=>/[A-Za-z0-9_$]/.test(c)
 let sw=x=>x===p.slice(i,i+x.length),skip=s=>{i+=s.length;c=p[i]||'';ws()}
 let ws=_=>{while(1){while(/\s/.test(c))nx();if(c==='/'&&p[i+1]==='/'){nx();nx();while(c&&c!=='\n')nx();continue;}break;}}
 let qs=s=>{if(!sw(s))err('@'+i+':qsed '+s);skip(s)};
 let prog=_=>{let b=[];while(i<p.length){ws();if(!c)break;b.push(stmt())};return{t:'prog',body:b}}
 let stmt=_=>{ws();let t=(s,n)=>sw(s)&&/\W/.test(p[i+s.length]);
  if(t('let'     ))return decl();if(t('const'   ))return decl();if(t('function'))return func();
  if(t('return'  ))return retn();if(t('if'      ))return ifff();if(t('while'   ))return whil();
  if(c==='{')return block();//}
  /*??*/let e=expr();ws();if(c===';')nx();return{t:'exst',expression:e};}
 let block=_=>{qs('{');let b=[];while(c&&c!=='}'){b.push(stmt());ws()};/*{*/qs('}');return{t:'bloc',b}}
 let decl=_=>{let r=[],kind=sw('const')?'const':'let';skip(kind);
  do{let id=iden(),init=0;ws();if(c==='='){nx();ws();init=expr();ws()};r.push({t:'VariableDeclarator',id, init});if(c===','){nx();ws();}else break}while(1);
  if(c===';')nx();return{t:'VariableDeclaration',decls:r,kind}}
 let func=_=>{qs('function');ws();let params=[],id=syma(c)?iden():null;ws();qs('(');ws();
  while(c!==')'&&c){params.push(iden());ws();if(c===','){nx();ws()}else break}
  qs(')');ws();return{t:'func',id,params,body:block()};}
 let retn=_=>{qs('return');ws();let arg=(c===';'||c==='}')?null:expr();if(c===';')nx();return {t:'retn', argument:arg};}
 let ifff=_=>{qs('if');ws();qs('(');let cond=expr(),then,els=0;qs(')');ws();then=stmt();ws();if(sw('else')){qs('else');ws();els=stmt()};return{t:'ifff',cond,then,els}}
 let whil=_=>{qs('while');ws();qs('(');let test=expr();qs(')');ws();const body=stmt();return{t:'while',test,body}}
 let expr=_=>{let left=cond(),right;ws();if(c==='='){nx();ws();right=expr();return{t:'asin',operator:'=',left,right}};return left}
 let cond=_=>{let test=bina(0),then,els;ws();if(c==='?'){nx();ws();then=expr();ws();if(c!==':')err('tern : missing);nx();ws();els=expr();return{t:'cond',test,then,els}};return test}
 let PREC={'||':1,'&&':2,'==':3,'!=':3,'<':4,'>':4,'+':5,'-':5,'*':6,'/':6};
 let bina=mi=>{let pc,r,l=mona();ws();while(1){let op=0,oo=p.slice(i,i+2);if(['==','!=','||','&&'].includes(two))op=oo;else if(PREC[c])op=c;else break;
   pc=PREC[op]||0;if(pc<mi)break;skip(op);r=bina(pc+1);l={t:'bina',op,l,r};ws();}return l}
 let mona=_=>{ws();if(c==='!'||c==='-'||c==='+'){let op=c;nx();ws();return{t:'mona',operator:op,prefix:true,argument:mona()};};return prima()}
 let prima=_=>{ws();if(c==='('){nx();ws();let e=expr();qs(')');return e;};return(c==='"'||c==="'")?strn():/[0-9]/.test(c)?numb():syma(c)?idcl():err('token unexpected "'+c+'")}
 let strn=_=>{let q=c,s='';nx();while(c&&c!==q){if(c==='\\'){nx();s+=p[i]||'';nx()}else{s+=c;nx()}}qs(q);return{t:'string',value:s,raw:q+s+q}}
 let numb=_=>{let s='';while(/[0-9.]/.test(c)){s+=c;nx()}return{t:'number',value:Number(s),raw:s}}
 let iden=_=>{let s='';if(!syma(c))err("expected identifier");while(symb(c)){s+=c;nx()};return{t:'iden',name:s}}
 let idcl=_=>{let f=iden(),a=[];ws();if(c==='('){nx();ws();while(c!==')'&&c){a.push(expr());ws();if(c===','){nx();ws()}else break};qs(')');return{t:'call',f,a}};return id;}
 return prog()}
