
let ic=x=>x.split("").map(x=>x.charCodeAt(0))
C=ic(C).map(x=>x-97);T=ic(T).map(x=>x-97)
let cut=(x,i)=>i.map((_,k)=>x.slice(i[k],i[1+k]))
let token=(x,s,i)=>(s=0,i=ic(x).map(x=>s=T[14*s+C[x]]).map((x,i)=>x>10?-1:i).filter(x=>x>=0),
 x=cut(x,i),s=i.map((_,j)=>((x[j]==" ")||((j==0||x[j-1]==" ")&&(x[j][0]=="/"&&x[j][1]!="'"))?0:1)),
 [where(x,s).map(x=>x=="\n"?";":x).toReversed(),where(i,s).toReversed()])
let where=(x,k)=>x.filter((_,i)=>k[i])
let left="([{",right="}])"
let op=":+-*%&|<>=~!,^#_$?@/\\"
let parse=x=>{let[tok,pos]=x
 let ipos=0
 let perr=x=>{throw new Error("parse:"+ipos+" "+x)}
 let next=_=>(ipos=pos.pop(),tok.pos())
 let peek=_=>tok[len(tok)-1]
 let term=(r,n)=>{
  r=next();if(r==undefined)return r
  if(left.includes(r)){let o=ipos;r=list();if(!right.includes(next()))perr("close "+o);return r}
  while(left.includes(peek())){
   n=next()//..
  }
  return r}
 let verb=x=>op.includes(x[0])&&(1==x.length||"='".includes(x[1]))
 let expr=x=>{     if(x==undefined)return x
  let y=term(),r,v;if(y==undefined)return x
  if(verb(y)&&!(v=verb(x)){
   r=expr(term())
   if(r==undefined)perr("1+")
   return dyad(x,y,r)
  }
 //r=expr(y)
 //if(v)
 //else
 }
 console.log(x,i)
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
