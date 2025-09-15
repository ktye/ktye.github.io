// deno repl --allow-read --allow-write --eval-file=lineis.js --eval-file=deno.js

let lineis=Deno.readFileSync(("windows"==Deno.build.os?"c:/k":"/c/k")+"/ktye.github.io/lineis/lineis.wasm")
let $=new WebAssembly.Instance(new WebAssembly.Module(lineis)).exports
let $0=$.__heap_base,$I=new Int32Array($.memory.buffer),$F=new Float64Array($.memory.buffer)

let _te=new TextEncoder,_td=new TextDecoder,su=u=>_td.decode(u)
let load=f=>{let s=su(Deno.readFileSync(f)),z=s.includes("i"),A,k=0
 let im=s=>{for(let i=1;i<s.length;i++)if((s[i]=="+"||s[i]=="-")&&(s[i-1]!="e"||s[i-1]!="E"))return s.slice(i)}
 s=s.split("\n");console.log(s);if(s.length>0&&s[s.length-1]=="")s=s.slice(0,-1);let n,m=s.length;
 s.forEach((x,i)=>{x=x.split(" ");
  if(!i){n=x.length;A=z?zeroz(m,n):zeros(m,n)};
  if(z)x.forEach(x=>{A[k++]=parseFloat(x);A[k++]=parseFloat(im(x))})
  else x.forEach(x=> A[k++]=parseFloat(x))
 });A.m=m;A.n=n;A.z=z;return flip(A)}

let argv=process.argv.slice(2).map(x=>x)
for(let a of argv)a.endsWith(".js")?eval(su(Deno.readFileSync(a))):a=="-e"?Deno.exit(0):console.log("arg",a)
