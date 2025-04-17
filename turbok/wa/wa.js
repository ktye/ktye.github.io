
let o=[0,0x61,0x73,0x6d,1,0,0,0],
lebs=(x,r,b)=>{x|=0;r=[];while(1){b=x&0x7f;x>>=7;if(x==0&&!(b&0x40)||(x==-1&&(b&0x40))){r.push(b);break};r.push(b|0x80)};return new Uint8Array(r)},        //signed i32
lebn=(x,r,b)=>{r=[];while(1){b=Number(x&0x7fn);x>>=7n;if(x==0n&&!(b&0x40)||(x==-1n&&(b&0x40))){r.push(b);break};r.push(b|0x80)};return new Uint8Array(r)}, //signed BitInt
lebu=(x,r,b)=>{x>>>=0;r=[];do{b=x&0x7f;if(x>>>=7)b|=0x80;r.push(b)}while(x);return new Uint8Array(r)}                                                      //unsigned i32



/*
func wa(T){
 
 let o=[0,0x61,0x73,0x6d,1,0,0,0]
 
 return src=>{
  
 }
}
*/