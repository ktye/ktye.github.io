
let O
let w
function ini(left,o){O=o
 fetch("./kap/ref.txt").then(r=>r.text()).then(r=>{let p=document.createElement("pre");p.textContent=r;left.appendChild(p)});
 w=new Worker("./kap/compute-queue-worker.js")
 w.onmessage=function(e){let r=JSON.parse(e.data); //console.log(r);
  switch(r.type){
  case"avail":           O("KAP\n      ");               break;
  case"response":        O("\n"+r.result+ "\n      ");   break;
  case"evalexception":   O("\n"+r.message+"\n      ");   break;
  default:console.log("response type?",r)
}}}
function evl(s){w.postMessage(JSON.stringify({src:s}))}
let kap={ini:ini,evl:evl,src:""}
export { kap }
