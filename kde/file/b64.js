let b64=(function(){
 let z="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("")
 const y=[
  255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
  255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,
  255,62,255,255,255,63,52,53,54,55,56,57,58,59,60,61,255,255,255,0,255,255,255,0,1,2,
  3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,255,255,255,255,255,
  255,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];
  let g=function(c){
   if(c>=y.length)throw new Error("b64");
   const o=y[c];if(o===255)throw new Error("b64")
   return o;}
  let enc=function(b) {
   let r='',i,l=b.length;
   for(i=2;i<l;i+=3){
    r+=z[b[i-2]>>2];r+=z[((b[i-2]&0x03)<<4)|(b[i-1]>>4)];
    r+=z[((b[i-1]&0x0F)<<2)|(b[i]>>6)];r+=z[b[i]&0x3F];}
    if(i===l+1){r+=z[b[i-2]>>2];r+=z[(b[i-2]&0x03)<<4];r+="==";}
   if(i===l){r+=z[b[i-2]>>2];r+=z[((b[i-2]&0x03)<<4)|(b[i-1]>>4)];
   r+=z[(b[i-1]&0x0F)<<2];r+="=";}return r;}
  let dec=function(s){if(s.length%4!==0)throw new Error("b64");
   const i=s.indexOf("=");if (i!==-1&&i<s.length-2)throw new Error("b64");
   let m=s.endsWith("==")?2:s.endsWith("=")?1:0,
   n=s.length,r=new Uint8Array(3*(n/4)),b;
   for(let i=0,j=0;i<n;i+=4,j+=3){
    b=g(s.charCodeAt(i))<<18|g(s.charCodeAt(i+1))<<12|g(s.charCodeAt(i+2))<<6|g(s.charCodeAt(i+3));
    r[j]=b>>16;r[j+1]=(b>>8)&0xFF;r[j+2]=b&0xFF;}
   return r.subarray(0,r.length-m);}
  return{enc:enc,dec:dec}
})()
