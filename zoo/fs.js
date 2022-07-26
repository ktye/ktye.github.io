
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
 switch(mode){
 case "a":
 case "r":
 case "rb":
  return open_ra(name,mode=="a")
 case "w":
 case "wb":
  let d=fs.files[name]
  fs.files[name]=new Uint8Array([]);
  let fp=newfp()
  fs.pointers[fp]={p:0,name:name}
  return fp
 default:
  console.log("fopen: unknown mode:", mode)
  return 0
 }
}
fs.open=function(path,flags,args){ // system call, k9
 let name=s0(path)
 console.log("open",name,flags,args)
 if(flags==32834){ let r=open_ra(name,false); console.log("return", r); return (r==0)?-1:r }
 console.log("fs.open unknown flags", flags)
 return -1
}
function open_ra(name,append){
 let d=fs.files[name]
 if(d===undefined) return 0;
 let fp=newfp()
 fs.pointers[fp]={u:new Uint8Array(d),p:append?d.length:0,name:name}
 return fp
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

fs.stat=function(path, buf){ // system call, k9
 let name=s0(path)
 let u=fs.files[name]
 console.log("stat", name, u===undefined)
 if(u===undefined)return -1
 let I=new Int32Array(U().buffer)
 let i=buf>>>2
 I.fill(0, i, i+21)
 I[3+i]=33279 //mode
 I[10+i]=u.length;
 console.log(I.slice(i,i+19))
 // I[0+i]  = dev        // dev_t     st_dev;     /* ID of device containing file */
 // I[1+i]  = 0          //           upper
 // I[2+i]  = ino        // ino_t     st_ino;     /* inode number */
 // I[3+i]  = mode       // mode_t    st_mode;    /* protection */
 // I[4+i]  = nlink      // nlink_t   st_nlink;   /* number of hard links */
 // I[5+i]  = uid        // uid_t     st_uid;     /* user ID of owner */
 // I[6+i]  = gid        // gid_t     st_gid;     /* group ID of owner */
 // I[7+i]  = rdev       // dev_t     st_rdev;    /* device ID (if special file) */
 // I[8+i]  = 0          //           upper
 // I[9+i]  = u.length   // off_t     st_size;    /* total size, in bytes */
 // I[10+i] = 0          //           upper
 // I[12+i] = 4096       // blksize_t st_blksize; /* blocksize for file system I/O */
 // I[13+i] = 0          // blkcnt_t  st_blocks;  /* number of 512B blocks allocated */
 // ..
 // I[21+i] = 0
 return 0
}

fs.mmap2=function(addr,len,prot,flags,fd,off){ // syscall, k9
 if((16386!=flags)||(off)){console.log("fs.mmap2: unkown flags/off", flags, off); return -1}
 
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

window.fs = fs
export { fs }
