let elf=u=>{let err=s=>{throw new Error(s)},K=new BigUint64Array(u.buffer,0,u.buffer.byteLength>>>3),U=new Uint32Array(u.buffer,0,u.buffer.byteLength>>>2),H=new Uint16Array(u.buffer,0,u.buffer.byteLength>>>1),r={}
 if(U[0]!=1179403647)err("bad magic")  //https://gist.github.com/x0nu11byt3/bcb35c3de461e5fb66173071a2379779
 let e={type:H[8],machine:H[9],version:U[5],entry:K[3],phoff:K[4],shoff:K[5],eflags:U[12],ehsize:H[26],phentsize:H[27],phnum:H[28],shentsize:H[29],shnum:H[30],shstrndx:H[31]};r.e=e
 let m=0,p=Number(e.phoff>>3n),np=e.phnum;r.p=[];for(let i=0;i<e.phnum;i++){r.p[i]={type:U[2*p],flags:U[2*p+1],offset:K[++p],vaddr:K[++p],paddr:K[++p],filesz:K[++p],memsz:K[++p],align:K[++p]};p++;m=Math.max(m,Number(r.p[i].vaddr+r.p[i].memsz))}
 let mem=new Uint8Array(m);r.p.forEach(p=>mem.set(u.subarray(Number(p.offset),Number(p.offset+p.filesz)),Number(p.vaddr)));r.mem=mem
 return r //entry r.mem[Number(r.e.entry)]..
}
