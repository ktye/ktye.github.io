let M,rip
let loadelf=u=>{let U=new Uint32Array(u.buffer,0,u.buffer.byteLength>>>2),H=new Uint16Array(u.buffer,0,u.buffer.byteLength>>>1),n=H[28],p=U[8]>>>2,i,s=[],m=0
 for(i=0;i<n;i++){s.push({o:U[p+2],va:U[p+4],fs:U[p+8]});m=Math.max(m,U[p+4]+U[p+10]);p+=14};M=new Uint8Array(m);s.forEach(x=>M.set(u.subarray(x.o,x.o+x.fs),x.va));rip=U[6]}

let show=_=>{let s="";for(let i=0;i<10;i++)s+=M[rip+i].toString(16).padStart("0")+" ";return s}


/* fasm syscalls:
0x0    0  read
0x1    1  write
0x2    2  open
0x3    3  close
0x8    8  lseek
0x9    9  mmap         only for large alloc
0xb   11  munmap       .. 
0xc   12  brk
0x3c  60  exit
0x60  96  gettimeofday
0xc9 201  time
*/
