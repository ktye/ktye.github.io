
// virtual file system
// fopen for reads copy data
// fopen for writes (fwrite/putc) writes directly

let fs = {
 files:   {}, // name:Uint8Array
 pointers:[0,0,0], // number:dataobject{u:Uint8Array,p:position,name:string}
}

let U // function returns Uint8Array
let O // function that writes to stdout
fs.init=function(u,o){ U=u, O=o }

function us(s){return new TextEncoder("utf-8").encode(s)}
function su(u){return (u.length)?new TextDecoder("utf-8").decode(u):""}
function s0(x){let i=U().slice(x);return su(i.slice(0,i.indexOf(0)))}

function newfp(){
 for(let i=0;i<fs.pointers;i++)if(pointers[i]===false)return i
 return fs.pointers.length
}

fs.setinput=function(u){ fs.pointers[0]={u:u,p:0,name:"/dev/stdin"} }

fs.fopen=function(x,y){
 let name=s0(x)
 let mode=s0(y)
 console.log("fopen",name,mode)
 let d,fp
 switch(mode){
 case "a":
 case "r":
 case "rb":
  d=fs.files[name]
  if(d===undefined) return 0;
  fp=newfp()
  fs.pointers[fp]={u:new Uint8Array(d),p:(mode=="a")?d.length:0,name:name}
  return fp
  break
 case "w":
 case "wb":
  d=fs.files[name]
  fs.files[name]=new Uint8Array([]);
  fp=newfp()
  fs.pointers[fp]={p:0,name:name}
  return fp
 default:
  console.log("fopen: unknown mode:", mode)
  return 0
 }
}

fs.fread=function(dst,s,n,fp){
 let src=fs.pointers[fp].u
 let p  =fs.pointers[fp].p
 if(p>=src.length) return -1
 let avail=src.length-p
 let nmemb=Math.floor(avail/s)
 if(nmemb<n)n=nmemb
//console.log("fread to", dst)
 U().set(src.slice(p,p+s*n),dst)
 fs.pointers[fp].p+=s*n
 return n
}

fs.getc=function(fp){
 let src=fs.pointers[fp].u
 let p  =fs.pointers[fp].p
 if(p>=src.length) { console.log("getc=>EOF", fp, p); return -1 }
 let r=src[p]
 fs.pointers[fp].p++
//console.log("getc",fp,p,src.length,"=>",r)
 return r
}

fs.ungetc=function(c,fp){
 let src=fs.pointers[fp].u
 let   p=fs.pointers[fp].p
//console.log("ungetc",c,fp,p)
 if(p>0){
  fs.pointers[fp].p--
  fs.pointers[fp].u[p-1]=c
 }
 return c
}

fs.fclose=function(fp){ fs.pointers[fp]=false; return 0; }

fs.feof=function(fp){
 let src=fs.pointers[fp].u
 let   p=fs.pointers[fp].p
 return p>=src.length
}

fs.putc=function(c,fp){
 if(fp<3){O(String.fromCharCode(c)); return c}
 let name=fs.pointers[fp].name
 let d=fs.files[name]
 fs.files[name]=cat(fs.files[name],new Uint8Array([c]))
 fs.pointers[fp].p++
 return c
}

fs.fwrite=function(src,s,n,fp){
 if(fp<3){ O(su(U().slice(src,src+s*n))); return n }
 let name=fs.pointers[fp].name
 let d=fs.files[name]
 fs.files[name]=cat(fs.files[name],U().slice(src,src+s*n))
 fs.pointers[fp].p+=s*n
 return n
}

fs.remove=function(x){
 delete fs.files[s0(x)]
 return 0
}

fs.readfile=function(s){
 if(s==""){console.log("readfile from stdin"); return new Uint8Array([])}
 let r=fs.files[s]
 return (r===undefined)?new Uint8Array([]):r
}

fs.writefile=function(s,u){
 if(s=="")O(su(u))
 else fs.files[s]=u 
}

function cat(x,y){
 let r=new Uint8Array(x.length+y.length)
 r.set(x)
 r.set(y,x.length)
 return r
}

window.fs = fs
export { fs }
