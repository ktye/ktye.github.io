let token=x=>{let C,c,ci=x=>String.fromCharCode(...x),ic=x=>x.split("").map(x=>x.charCodeAt()),
 S=" \t",                    //space
 L="({[;\n",                 //left
 R=")}]",                    //right
 A="'/\\",                   //adverb
 V="+-*%&|<>=^!~,#_$?@.",    //verb
 T=[" ;)+'a0q`-:e\/n",       //state transition table
    ";;)+'a0q`-+a'/;",
    ");)+'a0q`++a'';",
    "+;)+'a0q`-+a'';",
    "';)+'a0q`-:a'';",
    "a;)+'bbq`++b'';",
    "0;)+'11q`+:e'';",
    "qrrrrrrtrrrrsrr",
    "`;)+'b0q`++b'';",
    "-;)+'a1q`-+a'';",
    "/ccccccccccccc;",
    "cccccccccccccc;",
    ":;)+'a0q`-+a'';",
    "b;)+'bbq`++b'';",
    "1;)+'11q`++e'';",
    "e;)+'11q`1+1'';",
    "rrrrrrrtrrrrsrr",
    "srrrrrrrrrrrrrr",
    "t;)+'a0q`++a'';"];T=drop(T,1);let t0=ic(join(each(first)(T),""));T=each(x=>find(ic(x).slice(1),t0))(T)
  C=[ic(S+L),ic(R),ic(V),ic(A),cat(add(65,til(26)),add(97,til(26))),ic("0123456789."),...each(list)(ic("\"`-:e\\/\n"))];
  C=C.reduce((a,x,i)=>amend(i,0,x,a),add(-1,where(256)))
  return cut(x,where(more(scan((x,y)=>T[y][x],0)(at(ic(x),C)),10)))},
  
 

parse=s=>{s=((s.constructor===String)?token(s):s).filter(x=>!((1<x.length&&s[x]=="/")||(!x.trim().length))) //remove comments,space
 let i=scan((x,y)=>x+x*y)(s.map(x=>+!isNaN(parseFloat(x)))),ax=x=>x.constructor===Array                     //join numeric vectors
 s=s.reduce((a,x,j)=>{a.push(1==i[j]?[x]:1<i[j]?[...a.pop(),x]:x);return a},[]).map(x=>(ax(x)&&1==x.length)?x[0]:ax(x)?("["+x.join(",")+"]"):x)
 s=s.map(x=>new String(x))                                        //we use String object to mark verbs instead of primitive strings
 
 let V="+-*%&|<>=~.!@?^#_,$'/\\"
 
 let f1="type neg sqr sqrt flip rev up down frq not value til first uniq sort count floor list string each right left".split(" ")
 let f2="add sub mul div min max less more eql match dot dict at find cut take drop cat string both join split".split(" ")
 let F=(x,f)=>{let i=V.indexOf(x);return -1<i?f[i]:x},mo=(x,y)=>b(F(x,f1),y),dy=(x,y,z)=>b(F(x,f2),[y,z])
 
 
 let t=()=>{                                                //t(): term
  let r=s.pop();  if(r===undefined)return 0                 //next token
  if(")}];".includes(r)){s.push(r);return 0}                //terminator
  r.verb=V.includes(r)
  if(r=="("){r=l();r=1==r.length?r[0]:b("rev",r.reverse())} //(1) and (1;2;3)->[3;2;1]
  while(1){                                                 //adverb and [application]
   if(!s.length)return r;let p=s.pop()
   if("'/\\".includes(p))r=d(p,r)
   else if(p=="[")r=a(r)                                    
   else{s.push(p);return r}
  }
  return r
 },
 
 e=(x)=>{let y,z                                          //e(t()): expr
  if(!x)return 0;if(!(y=t()))return x
  if(y.verb&&!x.verb){
   z=e(t())
   //todo asn
   return(!z)?p(x,y):z.verb?q(x,y,z):dy(y,z,x)
  }
  z=e(y);return(!x.verb)?j(z,x):z.verb?c(x,z):mo(x,z)},
 
 a=(x,y)=>{y=l();return(1==y.length)?b("at",[y[0],x]):b(x,y.reverse())},                     //apply x[y] or x[y;z;..]   //todo project
 b=(x,y)=>x+"("+((y.constructor===Array)?y.join(","):y)+")",                                 //x(y) or x(y0,y1)
 c=(x,y)=>v(V.includes(y)?b("(x,y)=>"+F(x,f1),b(F(y,f2),"y,x")):b("x=>"+F(x,f1),b(y,"x"))),  //composition x=>x(y(x)) and (x,y)=>f(g(y,x))
 d=(x,r)=>v(["each(","over(","scan("]["'/\\".indexOf(x)]+r+")"),                             //derived verb
 j=(x,y)=>b("at",[y,x]),                                                                     //juxtaposition x y
 v=x=>((x=new String(x)).verb=true,x),
 p=(x,y)=>b("x=>"+F(y,f2),["x",x]),                                                          //project 1+
 q=(x,y,z)=>v(V.includes(z)?b("(y,x)=>"+F(y,f2),[b(F(z,f2),"(y,x)"),x]):b("x=>"+F(y,f2),[b(F(z,f1),"x"),x])),  //compose project 1+-
 l=r=>{r=[];while(s.length){r.push(e(t()));if(s.pop()!=";")return r}}                        // list e;e;e[terminator]
 //λ 
 
 s.reverse()
 return e(t())
}
