
if('serviceWorker'in navigator)navigator.serviceWorker.register("kde.sw.js")

function ge(x){return document.getElementById(x)}
function ce(x){return document.createElement(x)}
function pd(e){if(e){e.preventDefault();e.stopPropagation()}}
function rm(p){while(p.firstChild)p.removeChild(p.firstChild);return p}

let left,repl,intr,ed,dir
const td_=new TextDecoder("utf-8"),su=x=>td_.decode(x)
const te_=new TextEncoder("utf-8"),us=x=>te_.encode(x)

function err(x){ge("repl").textContent+="\n"+x+"\n "}

window.onerror=function(m,s,l,c,e){err(s+m)}


window.init=function(){
 left=ge("left")
 repl=ge("repl")
 intr=ge("intr")
 ed = CodeMirror(left, {
  "mode":"k","theme":"k","lineNumbers":true,
  "dragDrop":false,"tabSize":1,"smartIndent":false,
  "matchBrackets":true,
  "foldGutter":true,
  "gutters":["CodeMirror-linenumbers","CodeMirror-foldgutter"]})
 ed.setOption("extraKeys",{"RightClick":search,"Shift-RightClick":exec,"Shift-Enter":exec})
 ed.on("contextmenu",function(_,e){pd(e)})
 ed.setValue(decodeURIComponent(window.location.hash.substr(1)))
 ed.modified=false
 ed.sp=false //.sp(span) ed.sp.h(handle)
 ed.on("change",modify)
 ed.on("change",function(){})
 if(!crossOriginIsolated)ge("expl").append(document.createTextNode("no hr timer"))
 fetch("z.k").then(r=>r.text()).then(r=>zk=r)
 kstart("")
}


function search(cm,pos){ //right click selected text in the editor
 let t=cm.getSelection()
 if(!t.length)return 
 let i=cm.indexFromPos(cm.getCursor())
 let s=cm.getValue()
 let r=s.slice(i)
 let x=r.indexOf(t)
 let p=cm.posFromIndex((x>0)?i+x:s.indexOf(t))
 cm.setSelection(p,{line:p.line,ch:p.ch+t.length})
}
function exec(cm,pos){ //shift-enter or shift-rightclick, eval current selection or restart
 let s=cm.getSelection()
 if(s.length){repl.textContent+=s+"\n";krep(s);return}
 kstart(cm.getValue())
}

function modify(){if(ed.modified)return
 ed.modified=true
 if(ed.sp)ed.sp.classList.add("modified")
}

//opendir by button click or dropping a directory (requires support&authorization)
async function opendir(d){dir=d
 ge("newb").disabled=false
 ge("rall").disabled=false
 let ex=rm(ge("expl"))
 let ak=false
 for await(const [f,v]of dir.entries()){
  if(v.kind=="file"){
   let s=newspan(f,v)
   ex.appendChild(s)
   if("a.k"==f)ak=s
  }
 }
 document.title=dir.name
 ge("odir").textContent="/"+dir.name
 if(ak!==false)openfile(ak,ex)
}
ge("odir").onclick=async function(){window.showDirectoryPicker().then(h=>opendir(h))}

function newspan(name,h){
 let s=ce("span")
 let ex=ge("expl")
 s.textContent=name
 s.h=h
 let k=name.endsWith(".k")
 s.classList.add(k?"kfile":"file")
 s.onclick=function(){openfile(s,ex)}
 if(k)preload(s)
 return s
}

function openfile(s,ex,p){ //span: .h(handle)
 s.classList.add("curfile")
 let set=function(s,u){
  s.u=new Uint8Array(u)
  ed.setValue(su(s.u))
  ed.sp=s
  ed.modified=false
  ed.setOption("mode", (s.textContent.endsWith(".k")&&ge("ksyn").checked) ? "k" : "")
  if(p)showpos(p)
  ge("wrtb").disabled=false
  let a=ex.children;for(let i=0;i<a.length;i++)if(a[i]!=s)a[i].classList.remove("curfile","modified")
 }
 if("(z.k)"==s.textContent){set(s,s.u);return}
 s.h.getFile().then(r=>r.arrayBuffer()).then(u=>set(s,u))
}

ge("rall").onclick=function(){ //preload all files for k synchronous read
 let ex=ge("expl")
 let a=ex.children;for(let i=0;i<a.length;i++)preload(a[i])
}

function preload(s){
 s.h.getFile().then(r=>r.arrayBuffer()).then(u=>{s.u=new Uint8Array(u)})
}

function findfile(name){
 let ex=ge("expl")
 let a=ex.children;for(let i=0;i<a.length;i++){let s=a[i].textContent
  if(s==name)return a[i]
 }
 if(name=="(z.k)"){
  let s=newspan(name,null)
  s.u=us(zk);ex.appendChild(s);return s
}}

function readfile(name){ // from k(must be preloaded), or readdir: `$"\n"\:<`"."
 let ex=ge("expl")
 let d=[]
 let a=ex.children;for(let i=0;i<a.length;i++){let s=a[i].textContent;
  if((s==name)&&("u"in a[i])&&("object"==typeof a[i].u))return a[i].u
  d.push(s)
 }
 if(name==".")return us(d.join("\n"))
 return new Uint8Array(0)
}

async function writefile(name,u){ //from k
 if(dir){
  const h=await dir.getFileHandle(name,{create:true})
  const w=await h.createWritable()
  await w.write(u)
  await w.close()
  addfile(h)
 }else return 1
}

ge("wrtb").onclick=async function(){
 if(ed.sp!==false){
  const w=await ed.sp.h.createWritable()
  await w.write(ed.getValue())
  await w.close()
  ed.sp.classList.remove("modified")
  ed.modified=false
 }
}

ge("newb").onclick=async function(e){
 let b=e.target
 let h=await window.showSaveFilePicker({startIn:dir})
 openfile(addfile(h),ge("expl"))
}

function addfile(h){
 let ex=ge("expl")
 let a=ex.children
 for(let i=0;i<a.length;i++)if(a[i].textContent==h.name){ex.removeChild(a[i]);break}
 let s=newspan(h.name,h)
 let ok=false;for(let i=0;i<a.length;i++)if(a[i].textContent>h.name){ex.insertBefore(s,a[i]);ok=true;break}
 if(!ok)ex.appendChild(s)
 return s
}

window.ondragover=function(e){pd(e)}
window.ondrop=function(e){pd(e);
 if(e.dataTransfer.items){
  let d=e.dataTransfer.items
  if((1==d.length)&&(d[0].kind=="file")){
   d=d[0].getAsFileSystemHandle().then(h=>{
    if(h.kind!="directory"){err("only a directory can be dropped");return}
    opendir(h)
   })
   return
  }
 }
 err("only a directory can be dropped")
}

ge("ksyn").onchange=function(e){ed.setOption("mode",(e.target.checked)?"k":"")}


//dbl-click on editor scrollbar to request more space
let sbclick=0
window.onmousedown=function(e){
 let dbl=function(){
  let t=performance.now(), r=(t-sbclick)<200
  sbclick=t;return r}
 let t=function(){ if(dbl()){
  ge("left").classList.toggle("left0");ge("left").classList.toggle("left1")
  ge("repl").classList.toggle("repl0");ge("repl").classList.toggle("repl1")
 }}
 if     (e.target.classList.contains("CodeMirror-hscrollbar"))t()
 else if(e.target.classList.contains("CodeMirror-vscrollbar"))t()
}

function cats(files,s){
 src={f:["(z.k)"],n:[zk?zk.length:0]}
 let k={}; let r=[]
 if(files.length){
  let a=ge("expl").children;for(let i=0;i<a.length;i++)k[a[i].textContent]=su(a[i].u)
  for(let i=0;i<files.length;i++){
   if(!files[i]in k)throw(files[k]+" is missing")
   let fi=files[i]; let si=k[fi]
   src.f.push(fi);src.n.push(si.length)
   r.push(si)
 }}
 r.push(s)
 src.f.push("(ed)");src.n.push(s.length)
 return r.join("\n")
}
let src={}

function kstart(s,trc){
 intr.disabled=false
 repl.textContent=""
 s=cats(s.startsWith("/!")?s.slice(2,s.indexOf("\n")).split(" "):[],s)
 kw.postMessage({m:"start",s:s,trc:trc})
}
function clickrun(e){
 let s=ed.getValue()
 location.hash=(s.length<1000)?"#"+encodeURIComponent(s):""
 kstart(s,e.target.textContent=="trc")
}
ge("runb").onclick=clickrun
ge("trcb").onclick=clickrun
ge("intr").onclick=interrupt
ge("repl").onkeydown=function(e){if(e.key!="Enter")return
 pd(e)
 
 let s=window.getSelection()
 let r=s.getRangeAt(0)
 let t=repl.textContent.slice(0,r.endOffset)
 repl.textContent=t
 let i=t.lastIndexOf("\n")
 t=t.slice(i>0?1+i:0)
 repl.textContent+="\n"
 if(t.trim()!="")krep(t)
}

function O(s){
 repl.textContent+=s
}

function krep(s){
 if(s.startsWith(" "))s=s.slice(1)
 if((s=="\\")||s=="\\h"){help();return}
 intr.disabled=false
 kw.postMessage({m:"repl",s:s})
}

function end(m){
 intr.disabled=true
 let s=window.getSelection()
 s.removeAllRanges()
 let r=document.createRange()
 r.selectNodeContents(repl)
 r.collapse(false)
 s.addRange(r)
 if(m!==undefined)ge("memo").textContent=m
 repl.scrollTo(0,repl.scrollHeight)
 repl.focus()
}

function help(){fetch("../readme").then(r=>r.text()).then(t=>{repl.textContent=t+" ";end()})}
 
let kw
function newk(){
 kw=new Worker("kwork.js", {type:"module",name:"kwork"})
 
 kw.onmessage=function(e){let d=e.data
  switch(d.m){
  case "write":
   if(d.f==""){O(su(d.u));end(d.mem)}
   else        writefile(d.f,d.u)
   break
  case "indicate":indicate(d.p,d.e,d.l,d.stack);break
  default: console.log("unknown from kwork:", e.data)
 }}
 kw.onerror=function(e){
  console.log("err from kwork:",e.message,e.filename+":"+e.lineno, e)
 }
}
newk()

function interrupt(){
 kw.terminate()
 newk()
 kstart("")
}

let zk //built-in z.k source for error indication
function indicate(p,e,l,fstack){
 if(e!=""){
  let a=ce("a")
  a.href=l;a.target="_blank";a.innerText=e
  let d=ce("div");d.contentEditable=false;d.appendChild(a);repl.appendChild(d) //wrap to make it clickable
 }
 printstack(fstack)
 filelink(p,true)
/*
 for(let i=0;i<src.n.length;i++){let ni=src.n[i]
  if(p<ni){fileat(src.f[i],p-2);return}
  p-=1+ni
 }//otherwise: error in repl
*/
}
function fileat(f,p,direct,text){
 if(direct&&f=="(ed)"){showpos(p);return}
 let a=ce("a");
 a.href=f+":"+p
 a.textContent=f+":"+p
 if(f=="(ed)")a.onclick=function(e){pd(e);showpos(p)}
 else         a.onclick=function(e){pd(e);openfile(findfile(f),ge("expl"),p)}
 repl.appendChild(a)
 if(text)repl.appendChild(document.createTextNode(" "+text))
 repl.appendChild(ce("br"))
}
function filelink(p,direct,text){
 for(let i=0;i<src.n.length;i++){let ni=src.n[i]
  if(p<ni){fileat(src.f[i],p-2,direct,text);return}
  p-=1+ni
 }
 console.log("filelink:",p)
}
function showpos(i){
 let p=ed.posFromIndex(i)
 ed.setSelection(p,{line:p.line,ch:1+p.ch})
}
function printstack(fstack){for(let i=0;i<fstack.length;i++){
 filelink(fstack[i].p,false,fstack[i].s)
}}


window.ge=ge //for js console
