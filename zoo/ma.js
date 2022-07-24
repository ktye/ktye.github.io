// bucket allocator as a malloc/free replacement for clang/wasm modules
export default class allocator{
 constructor(base,memory){
  this.base   = base   // __heap_base (wasm/clang)
  this.memory = memory // wasm memory object
  this.head   = base>>>2
  this.total  = memory.buffer.byteLength
  this.I      = []     // Uint32Array
  this.bk     = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  if(4*this.head!=base){console.error("malloc: __heap_base is not a multiple of 4!")}
 }
 malloc(n){               // [bucket-type i32, next-pointer, data...]
  this.I=new Uint32Array(this.memory.buffer)
  let t=this.bucket(8+n)  
  let r
  for(let b=t;b<31;b++){
   r=this.bk[b]
   if(r!=0){
    this.bk[b] = this.I[1+r]   //next
    while(t<b){
console.log("t<b",t,b)
     b--
     this.I[r]=b
     this._free(r)
     r+=1<<(b-2)
     this.I[r]=b
    }
   }
   if(r==0)r=this._grow(1<<t)
   this.I=new Uint32Array(this.memory.buffer)
   this.I[r]=t
   let a=8+(r<<2)
   console.log("malloc",n,"=>",a,"..",a+(1<<t)-8,"t",t)
   return a
  }
 }
 realloc(x,n){
 console.log("realloc",x,n)
  if(x==0)return this.malloc(n)
  this.I=new Uint32Array(this.memory.buffer)
  let p=x>>>2
  let t=this.I[p-2]
  if(t<4||t>31)console.error("realloc",x,"unknown bucket type",t)
  if(this.bucket(8+n)==t){console.log("keep");return x}
  let r=this.malloc(n)
  let u=new Uint8Array(this.memory.buffer)
  let l=(1<<t)-8 // old length
  u.copyWithin(r,x,x+(n<l)?n:l)
  this.free(x)
  return r
 }
 free(x){
  this.I=new Uint32Array(this.memory.buffer)
  this._free((x>>>2)-2)
  return 0  
 }
 bucket(n){
  let t=32-Math.clz32(7+n)
  return (t<4)?4:t
 }
 _free(x){
  let t=this.I[x]
console.log("free", 8+(x<<2), "t", t)
  if(t<4||t>31) console.error("free: ", x, "illegal bucket type", t)
  this.I[1+x]=this.bk[t]  // pointer to next
  this.bk[t]=x
 }
 _grow(x){
console.log("grow", x, "avail", this.total-this.head)
  let r
  if(x>this.total-this.head){
   let b=x>>>16
   if(x>64*1024*b)b++
   let g=this.memory.grow(b)
   console.log("grow by",b,"=>",g,"total",this.memory.buffer.byteLength)
   this.total=this.memory.buffer.byteLength
  }
  r=this.head>>>2
  this.head+=x
  return r
 }
 stats(){
  let I = new Uint32Array(this.memory.buffer)
  let s1=function(bk,t){
   let n=0
   let p=bk[t]
   while(p){
    p=I[p]
    n++
   }
   console.log("type",t,n,"*",1<<t,"=",n*(1<<t))
   return n*(1<<t)
  } 
  let free=0
  for(let t=0;t<this.bk.length;t++)free+=s1(this.bk,t)
  console.log("free(in bk)", free)
 }
}
