let L=async x=>{
 try{
  x=await WebAssembly.instantiate(x)
  return x.instance.exports
 }catch(e){
  O("L: "+e.message);throw(e)
 }
}
