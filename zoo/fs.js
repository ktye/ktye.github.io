
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
 switch(mode){
 case "a":
 case "r":
 case "rb":
  return fs.open_ra(name,mode=="a")
 case "w":
 case "wb":
  return fs.open_w(name)
 default:
  console.log("fopen: unknown mode:", mode)
  return 0
 }
}
fs.open_ra=function(name,append){
 let d=fs.files[name]
 if(d===undefined) return 0;
 let fp=newfp()
 fs.pointers[fp]={u:new Uint8Array(d),p:append?d.length:0,name:name}
 return fp
}
fs.open_w=function(name){
 let d=fs.files[name]
 fs.files[name]=new Uint8Array([]);
 let fp=newfp()
 fs.pointers[fp]={p:0,name:name}
 return fp
}


fs.fread=function(dst,s,n,fp){
 let src=fs.pointers[fp].u
 let p  =fs.pointers[fp].p
 if(p>=src.length) return -1
 let avail=src.length-p
 let nmemb=Math.floor(avail/s)
 if(nmemb<n)n=nmemb
 U().set(src.slice(p,p+s*n),dst)
 fs.pointers[fp].p+=s*n
 return n
}

fs.getc=function(fp){
 let src=fs.pointers[fp].u
 let p  =fs.pointers[fp].p
 if(p>=src.length)return -1
 let r=src[p]
 fs.pointers[fp].p++
 return r
}

fs.ungetc=function(c,fp){
 let src=fs.pointers[fp].u
 let   p=fs.pointers[fp].p
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

fs.filesize=function(name){ // simpler stat
 let u=fs.files[name]
 return(u===undefined)?-1:u.length
}

fs.readfile=function(s){ // ktye/k interface
 if(s==""){console.log("readfile from stdin"); return new Uint8Array([])}
 let r=fs.files[s]
 return (r===undefined)?new Uint8Array([]):r
}

fs.writefile=function(s,u){ // ktye/k interface
 if(s=="")O(su(u))
 else fs.files[s]=u 
}

function cat(x,y){
 let r=new Uint8Array(x.length+y.length)
 r.set(x)
 r.set(y,x.length)
 return r
}

export { fs }
