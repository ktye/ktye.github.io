<!DOCTYPE html>
<head><meta charset="utf-8">
<link rel=icon href='data:;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEX/AAAAAAD////KksOZAAAAMElEQVR4nGJYtWrVKoYFq1ZxMSyYhkZMgxNRXAwLpmbBCDAXSRZEgAwAGQUIAAD//+QzHr+8V1EyAAAAAElFTkSuQmCC'>
<title>file</title>
</head>

<body onload="window.init()">
<h1>h1</h1>
<script>
let fs={} //in-src-fs modified and repacked by the application
let K
let kenv={env:{}} //todo
function init(){
 let inner=document.documentElement.innerHTML;
 let i=inner.indexOf("/script>\n<!--\n")
 let s=inner.slice(14+i,-14)
 let u=inner.slice(0,i)+"\n</"+"script>\n<!--\n"
 for(let i=0;;i++){
  let p=s.indexOf("\n")
  let name=s.slice(1,p)
  console.log("name",name)
  s=s.slice(p)
  p=s.indexOf("\n\\")
  if(p<0){fs[name]=s.slice(1,p-1);break}
  fs[name]=s.slice(1,1+p)
  s=s.slice(1+p)
 }
 console.log(fs)
 let w=fs["d.hx.wasm"].split("\n").join("")
 let a=new Uint8Array(w.length/2)
 let b=function(x){return x-((x<97)?48:87)}
 for(let i=0;i<a.length;i++)a[i]=b(w.charCodeAt(1+2*i))+16*b(w.charCodeAt(2*i))
 WebAssembly.compile(a).then(x=>WebAssembly.instantiate(x,kenv))
 window.dopack=function(f){
  let b=u
  let k=Object.keys(f)
  for(let i=0;i<k.length;i++){
   b+="\n\\"+k[i]+"\n"
   b+=f[k[i]]
  }
  b+="\n!--></"+"body>\n</"+"html>\n"
  return b
 }
}
</script>
<!--
\a.k
1+!10
\a.html
<!DOCTYPE html>
<body><h1>a a a</h1>
</body></html>
\css
a{color:red}
\d.hx.wasm
