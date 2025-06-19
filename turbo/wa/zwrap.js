/* zwrap adds wrapper functions to an (a)ssembly program that replaces complex(z) atoms with ff.
   otherwise a v128 representing a complex atom cannot pass the wasm-js boundary.
   it is used by the b repl(F5-key) */

let zwrap=a=>{let b=[],w=x=>{let v=x.split(" "),s=v[1]
  let[r,a]=s.split(":");if(a==undefined){throw new Error("function signature: "+x)}
   if(!((r+a).includes("z")))return x
   let f=v[0],R=r.replace("z","ff"),I=[],j=-1,A=a.split("").map((x,i)=>(++j,"z"==x?(I.push(j++),"ff"):x)).join("")
   if(v.length>3&&v[2]=="export"){let u=v.slice();u.splice(2,2);x=u.join(" ")} //unexport original function
   v[0]+=".z";v[1]=R+":"+A
   b.push(v.join(" "));
   if(r=="z")b.push("z r")
   A.split("").forEach((x,i)=>{b.push("get "+i);if(I.includes(i))b.push("zrr");if(I.includes(i-1))b.push("zrr","zzz")})
   b.push("cal "+f)
   if(r=="z")b.push("tee r","foz","get r","imz")
   return x
 }
 a.forEach(x=>{if(x.includes(":"))x=w(x);b.push(x)});return b}
