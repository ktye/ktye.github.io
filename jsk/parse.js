let token=x=>{
 let a=x,r=[],h=x=>x.length?x[0]:0
 chr=x=>{if(h(x)!="\"")return 0
  let q=0,n=0;while(++n&&x.length>n&&(x[n]!="\\n"&&!q=q-+(x[n]=="\\")));
  return[JSON.parse(x.slice(0,++n)),n]},
 num=x=>{
  let r=parseFloat(x)
  if(isNaN(x))return 0
  let t=x.findIndex(x=>!"0123456789eE.+-".includes(x)));t=t<0?x.length:t
  while(isNaN(Number(x.slice(0,t)))t--
  return[r,t]},
 nms=x=>{
  let r=num(x);if(!r)return 0
  let a=[r[0]],n=r[1]
  while(x.length>n&&x[n]==" "&&r=num(x)){a.push(r[0]);n+=1+r[1]}
  return[1==a.length?a[0]:a,n]},
 ver=x=>"+-*%&|<> = ~ . !@ ?^#_,$'/\\".includes(x[0])?[x[0],1]:0,
 pct=x=>"{}[]();\n".includes(x[0])?[x[0],1]:0,
 nam=x=>{let n=0,a="abcdefghijklmnopqrstuvxyz"
  if(!a.includes(x[0]))return 0
  a+=a.toUpperCase()+"0123456789."
  while(length(x)>++n&&a.includes(x[n]));
  return[x.slice(0,n),n]}
 while((x=x.trim()).length){
  let[t,n]=chr(x)||nms(x)||ver(x)||pct(x)||nam(x)||throw("parse "+(a.length-x.length))
  r.push(t);x=x.slice(n)}
 return r},

parse=x=>{if(typeof x=="string")x=token(x)
 
}