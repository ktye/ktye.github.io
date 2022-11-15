
let a=false     //AudioContext
let ctx=ge("spec").getContext("2d")
let img=ctx.getImageData(0,0,512,512)
let rate


ge("button").onclick=function(e){
 e.target.enabled=false
 if(a===false)navigator.mediaDevices.getUserMedia({audio:true,video:false}).then(record)
 else         a.close().then(()=>{e.target.enabled=true;e.target.textContent="start recording";a=false})
}
function record(stream){
 console.log("record")
 a=new AudioContext()
 let s=a.createMediaStreamSource(stream);
 let p=a.createScriptProcessor(1024,1,1);
 rate=a.sampleRate
 setlabels()
 ge("rate").textContent=""+rate
 
 s.connect(p);
 p.connect(a.destination);
 ge("button").textContent="stop"
 ge("button").enabled=true

 let n=0
 let d=false
 p.onaudioprocess=function(e){
  let b=e.inputBuffer
  if(d)d.set(b.getChannelData(0))
  else d=new Float64Array(b.getChannelData(0))
  let scale=new Float64Array([+ge("zmin").value,+ge("zmax").value])
  let lg=(ge("lg").checked?1:0)
  k("F",d,scale,lg).then(r=>{
   img.data.set(new Uint8ClampedArray(r.buffer))
   ctx.putImageData(img,0,0)
})}}

function setlabels(){
 let c=ge("labels").getContext("2d")
 c.font = "14px monospace";
 for(let i=0;i<4;i++){c.textBaseline=("top middle middle bottom".split(" "))[i];c.fillText(((3-i)*rate/6000)+" kHz", 10, i*170); }
}

ge("lg").onchange=function(e){ge("zmin").step=(e.target.checked?1:0.001);ge("zmax").step=(e.target.checked?1:0.001)}
