
let ic=x=>x.split("").map(x=>x.charCodeAt(0))
C=ic(C).map(x=>x-97);T=ic(T).map(x=>x-97)
let cut=(x,i)=>i.map((_,k)=>x.slice(i[k],i[1+k]))
let token=(x,s,i)=>(s=0,i=ic(x).map(x=>s=T[14*s+C[x]]).map((x,i)=>x>10?-1:i).filter(x=>x>=0),
 x=cut(x,i),s=i.map((_,j)=>((x[j]==" ")||((j==0||x[j-1]==" ")&&(x[j][0]=="/"&&x[j][1]!="'"))?0:1)),
 [where(x,s).map(x=>x=="\n"?";":x).toReversed(),where(i,s).toReversed()])
let where=(x,k)=>x.filter((_,i)=>k[i])
let left="([{",right="}])"
let op=":+-*%&|<>=~!,^#_$?@/\\",nm=".-0123456789"
let parse=x=>{let[tok,pos]=x
console.log("parse",tok)
 let ipos=0,typs="ijefIJEF"
 let l=x=>x[x.length-1]
 let perr=x=>{throw new Error("parse:"+ipos+" "+x)}
 let type=(x,t)=>x=="-"||op.includes(x[0])?0:(nm.includes(x[0])?(typs.includes(l(x))?l(x):x.includes(".")?"f":"i"):"i")
 let next=(r,t)=>(r=tok.pop(),r==undefined?0:(t=type(r),r=[r],r.t=t,r.p=pos.pop(),r))
 let peek=_=>tok[l(tok)]
 let term=(r,n)=>{
  r=next();if(!r)return r
console.log("r",r)
  if(left.includes(r)){let o=ipos;r=list();if(!right.includes(next()))perr("close "+o);return r}
  while(left.includes(peek())){ console.log("()")
   n=next()//..
  }
  return r}
 let mona=(x,y,i,m)=>((m="~iezi~jezj-ingi-jngj-enge-fngf|eabe|fabf_efle_fflf%esqe%fsqf"),(i=m.indexOf(x+y.t))<0?perr("monadic"):(y.push(m.slice(2+i,5+i)+" @"+x.p),y))
 let expr=x=>{if(!x)return x
  let y=term(),r,v=x=>!x.t
  if(!y)return x
  if(v(y)&&!(v(x))){ console.log("dyad")
   r=expr(term())
   if(!r)perr("1+")
   return dyad(x,y,r)
  }
  r=expr(y)
  if(!(v(x))) console.log("jux")
  return mona(x,r)
 }
 return expr(term())
}

/*



if    cnd{..}
while cnd{..}
switch   {..}
$        {..}
a[i]
f[x]

ez ~x eq x=y ne x~y lt x<y lu x<'y gt x>'y gu x>'y le x<=y ge x>=y cz ct cx 
ad x+y su x-y mu x*y di x%y du x%'y mo y\x rm y\'x an x&y or x|y xo x^y sl y\x sa y/x sr y/'x rl rr
ab |x ng -x ce ^x fl _x tr na sq %x mi x&y ma x|y cs 
0:"alpha"
f:i:ii:x+y
sum:i:jj:{r:0;r+:x.i+y.i;r}
max:i:jj:{r:x 0;r|:x.i;r}
*/
