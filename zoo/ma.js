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
    this.bk[b] = this.I[1+b]   //next
    while(b>t){
     b--
     this.I[r]=b
     this._free(r)
     r+=1<<(b-2)
     this.I[r]=b
    }
   }
   if(r==0)r=this._grow(1<<t)
   this.I[r]=t
   let a=8+(r<<2)
   console.log("malloc",n,"=>",a)
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
  let r=this.malloc(n)
  let u=new Uint8Array(this.memory.buffer)
  u.set(r, u.slice(x,x+(1<<t)-8))
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
  if(t<4||t>31) console.error("free: ", x, "illegal bucket type", t)
  this.I[1+x]=this.bk[t]  // pointer to next
  this.bk[t]=x
 }
 _grow(x){
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
}
