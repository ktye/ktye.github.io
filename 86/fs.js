let fs=[]
let fe=(x,y)=>fetch(x).then(r=>r.arrayBuffer()).then(r=>fsadd(y,new Uint8Array(r)))
let fsget=name=>{for(let i=0;i<fs.length;i++)if(fs[i].name==name)return fs[i].u;return 0}
let fsadd=(name,u)=>{
 for(let i=0;i<fs.length;i++)if(fs[i].name==name){fs[i]={name:name,u:u};fsshow();return}
 fs.push({name:name,u:u});fsshow()}
let fpeek=u=>af(u.slice(0,16)).map(x=>(x>31&&x<127)?String.fromCharCode(x):".").join("")
let fsdel=x=>(x=fs.findIndex(f=>f.name==x),x<0?0:(fs.splice(x,1),fsshow()))
let fsshow=_=>{
 let r=""
 fs.forEach(x=>r+=`<span class="l" onclick='ed("${x.name}")'>${x.name}</span>`+(" ".repeat(18-x.name.length-String(x.u.length).length))+x.u.length+"  "+fpeek(x.u)+"\n")
 disk.innerHTML=r
}
