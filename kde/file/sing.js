
let a=false     //AudioContext

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
 
 s.connect(p);
 p.connect(a.destination);
 ge("button").textContent="stop"
 ge("button").enabled=true

 let d=false
 p.onaudioprocess=function(e){
  let b=e.inputBuffer
  if(d)d.set(b.getChannelData(0))
  else d=new Float64Array(b.getChannelData(0))
  k("F",d).then(r=>console.log("r",r)) //.catch(a.close())
 }
}
/*
audioCtx.close().then(() => {
 startBtn.removeAttribute("disabled");
 susresBtn.setAttribute("disabled", "disabled");
 stopBtn.setAttribute("disabled", "disabled");
});
*/
