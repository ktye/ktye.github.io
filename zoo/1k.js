let O,K
let I

const us=x=>te_.encode(x),te_=new TextEncoder("utf-8")
const M=()=>{return new Uint8Array(K.memory.buffer)}

let env={env:{                    //Write,ReadIn do 1-byte per call
 "Write":function(a,b,c,d){O(String.fromCharCode(M()[0]));return 0},
 "ReadIn":function(x,y){let m=M();m[x]=I[0];I=I.slice(1);return I.length},
}}

function ini(l,o){O=o
 fetch("./1k/readme").then(r=>r.text()).then(r=>{
  let p=document.createElement("pre");p.textContent=r;l.appendChild(p)
  l.appendChild(p)
 });

 fetch('./1k/1k.wasm').then(r=>r.arrayBuffer()).then(r=>WebAssembly.instantiate(r,env)).then(r=>{ 
  K=r.instance.exports
  K.k1()
  O("1k\n ")
 })
}

function evl(s){O("\n");I=us(" "+s+"\n");K.rep();O(" ")}

let lk={ini:ini,evl:evl,src:""}
export { lk }
