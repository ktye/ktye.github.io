//!kdefile
kdefile=false
debug=function(x){}
if('serviceWorker'in navigator)navigator.serviceWorker.register("kde.sw.js")

function ge(x){return document.getElementById(x)}
function ce(x){return document.createElement(x)}
function pd(e){if(e){e.preventDefault();e.stopPropagation()}}
function rm(p){while(p.firstChild)p.removeChild(p.firstChild);return p}
const td_=new TextDecoder("utf-8"),su=x=>td_.decode(x)
const te_=new TextEncoder("utf-8"),us=x=>te_.encode(x)
//kdefile

let left,repl,intr,ed,dir

let startuperr=false
function err(m,s){staruperr=true;let r=ge("repl");debug(true)
 if((!kdefile)||("string"!==typeof s)){let sp=ce("span");sp.textContent(m+" "+s);r.appendChild(sp);return}
 let st=parseStack(s)
 let sp=findfile(".js")
 let counts=su(sp.u).split("\n").map(x=>x.length)
 let pos=function(l,c){
  let n=0;for(let i=0;i<Math.min(counts.length,l-1);i++)n+=1+counts[i];return n+c-1}
 if(r.lastChild!==null&&r.lastChild.textContent==" ")r.removeChild(r.lastChild)
 let lc=[]
 for(let i=0;i<st.length;i++){let lci=st[i].l+":"+st[i].c;if(lc.indexOf(lci)>=0)continue;lc.push(lci)
  let a=ce("a");a.style.color="green";let h=".js:"+lci
  a.href=h
  a.textContent=h;if(i==0)a.textContent+=":  "+m+"\n"
  a.onclick=function(e){pd(e);openfile(sp,ge("expl"),pos(+st[i].l,+st[i].c))}
  r.appendChild(a)
 };pr()
}
function parseStack(s){
 let r=[];let a=s.split("\n")
 for(let i=0;i<a.length;i++){
  let x=s.match(       /eval:([0-9]+):([0-9]+)/) //ff
  let y=s.match(/eval at start.*<anonymous>:([0-9]+):([0-9]+)\)/) //chrome
  if     (x!==null)r.push({l:x[1],c:x[2]})
  else if(y!==null)r.push({l:y[1],c:y[2]})
 };return r
}
 
window.onerror=function(m,s,l,c,e){err(m,e.stack)}


let src={}
let zk //built-in z.k source for error indication
let kw
window.kdeinit=function(){
 rm(ge("expl"))
 left=ge("left")
 repl=ge("repl")
 intr=ge("intr")
 cminit()
 ed.modified=false
 ed.sp=false //.sp(span) ed.sp.h(handle)
 kmode(true)
//!kdefile
 fetch("z.k").then(r=>r.text()).then(r=>zk=r)
 kstart("")
//kdefile
}
function save(){if(ed.sp)ed.sp.u=us(ed.getValue())}

//!kdefile
function cminit(){
 ed=CodeMirror(left,{
   "lineNumbers":true,
   "dragDrop":false,"tabSize":8,"smartIndent":false,
   "matchBrackets":true,
   "foldGutter":true,
   "gutters":["CodeMirror-linenumbers","CodeMirror-foldgutter"]})
  ed.on("contextmenu",function(_,e){pd(e)})
  ed.setValue(decodeURIComponent(window.location.hash.substr(1)))
  ed.on("change",modify)
}

function kmode(x){
 let ex=[] //words in a.k b.k if first line is /!a.k b.k
 if(x){
  let em={}
  let s=ed.getValue()
  let g=ge("grep").value
  s=(g.startsWith("k "))?cats(g.slice(2).split(" "),""):""
  let re=/[a-zA-Z][\w]*/g
  var a=s.match(re)
  if(a)a.forEach(x=>{em[x]=true})
  ex=Object.keys(em)
 }
 let WORD = /[\w$]+/, RANGE = 500; //from anyword-hint.js
 let hnt=function(ed,o){
  var w=o&&o.word||WORD;
  var range=o&&o.range||RANGE;
  var cur=ed.getCursor(),curLine=ed.getLine(cur.line);
  var end=cur.ch,start=end;
  while(start&&w.test(curLine.charAt(start-1)))--start;
  var curWord=start!=end&&curLine.slice(start,end);
  var li=o&&o.list||[],seen={};
  var re=new RegExp(w.source,"g");
  for(var d=-1;d<=1;d+=2){
   var l=cur.line,endLine=Math.min(Math.max(l+d*range,ed.firstLine()),ed.lastLine())+d;
   for(;l!=endLine;l+=d){
    var text=ed.getLine(l),m;
    while(m=re.exec(text)){
     if(l==cur.line&&m[0]===curWord)continue;
      if((!curWord||m[0].lastIndexOf(curWord,0)==0)&&!Object.prototype.hasOwnProperty.call(seen,m[0])){
       seen[m[0]]=true;
       li.push(m[0]);
  }}}}
  for(let i=0;i<ex.length;i++)if(ex[i].startsWith(curWord))li.push(ex[i])
  return{list:li,from:CodeMirror.Pos(cur.line,start),to:CodeMirror.Pos(cur.line,end)};
 }
 ed.setOption("mode",x?"k":"")  
 ed.setOption("theme",x?"k":"")
 if(x)ed.on("gutterClick",execline);else ed.off("gutterClick",execline)
 if(x)ed.setOption("extraKeys",{"RightClick":search,"Shift-RightClick":exec,"Shift-Enter":exec,'F11':function(cm){cm.setOption("fullScreen",!cm.getOption("fullScreen"))},"Tab":"autocomplete"})
 else ed.setOption("extraKeys",{})
 CodeMirror.commands.autocomplete=function(cm){cm.showHint({hint:hnt})}
}
ge("feat").onchange=function(e){let x=e.target.checked
 kmode(x)
 ge("repl").classList.toggle("k")
 ge("brow").classList.toggle("k")
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
 if(s.length){repl.lastChild.textContent+=s+"\n";krep(s);return}
 kstart(cm.getValue())
}
function execline(ed,n,gutter){ //click on linenumber executes
 if(gutter=="CodeMirror-linenumbers"){ //-foldgutter for folding
  repl.lastChild.textContent+=ed.getLine(n)+"\n"
  krep(ed.getLine(n))  
}}
//kdefile

function modify(){if(ed.modified)return;ed.modified=true
//!kdefile
 document.getElementsByClassName("CodeMirror-gutters")[0].style.backgroundColor="#eff"
//kdefile
 if(ed.sp)ed.sp.classList.add("modified")
}
function unmodify(){ed.modified=false
//!kdefile
 document.getElementsByClassName("CodeMirror-gutters")[0].style.backgroundColor="#fff"
//kdefile
}

//!kdefile
function grep(s,suffix,sn){
 let c=ed.getCursor();ed.setSelection(c,c)
 let sel=[]
 repl.lastChild.textContent+="\\grep "+s+" *"+suffix+"\n"
 let g=function(f,a){
  let edfile=(("sp"in ed)&&ed.sp.textContent==f)
  if((suffix!="")&&(!f.endsWith(suffix)))return
  let l=a.split("\n")
  let p=0
  for(let i=0;i<l.length;i++){let j //todo !cmedit
   if("string"===typeof s)j=l[i].indexOf(s)
   else{let m=s.exec(l[i]);j=(m===null)?-1:m.index}
   if(j>=0){
    let sp=ce("span");sp.textContent=l[i]
    fileat(f,p+j,false,[sp])
    if(edfile)sel.push({anchor:{line:i,ch:j},head:{line:i,ch:j+sn}})
   }
   p+=1+l[i].length
  }
  if(edfile&&sel.length>0)ed.setSelections(sel)
 }
 let a=ge("expl").children;for(let i=0;i<a.length;i++)if(a[i].u)g(a[i].textContent,su(a[i].u))
 pr()
}
function kdef(s){grep(new RegExp("^\\s*;?"+s+":"),".k", s.length)}
function ffind(s){let r=[]
 repl.lastChild.textContent+="\\find "+s+"*\n"
 let a=ge("expl").children;for(let i=0;i<a.length;i++)if(a[i].textContent.startsWith(s)){
  r.push(a[i])
 }
 return r
}
ge("grep").onkeydown=function(e){if(e.key=="Enter"){let s=e.target.value;if((s.trim()=="")||s.startsWith("k "))return
 let st=function(s){s=s.trim();if(s=="")return ed.getSelection();return s}
 if((s=="g")||s.startsWith("g ")||s.startsWith("g.")){s=s.slice(1)
  let suffix=""
  if(s.startsWith(".")){
   let i=s.indexOf(" ")
   if(i>0){suffix=s.slice(0,i);s=s.slice(1+i)}
   else{suffix=s;s=""}
  }
  s=st(s);grep(s,suffix,s.length)
 }else if(s.startsWith(":")){ kdef(st(s.slice(1).trim())) }
 else {let r=ffind(s)
  if(1==r.length)openfile(r[0],ge("expl"))
  for(let i=0;i<r.length;i++)fileat(r[i].textContent,0,1==r.length)
}}}
//kdefile

ge("colb").onchange=function(e){ge("expl").style.gridTemplateColumns="repeat("+e.target.selectedOptions[0].textContent+",1fr)"}
ge("colb").selectedIndex=3

//opendir by button click or dropping a directory
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
if(!kdefile)ge("odir").onclick=async function(){
 if("showDirectoryPicker"in window)window.showDirectoryPicker().then(h=>opendir(h))
 else err("directory access is not supported by your browser\ndrop files into the window instead")
}

function newspan(name,h){
 let s=ce("span")
 let ex=ge("expl")
 s.textContent=name
 s.h=h
 let k=name.endsWith(".k")
 if(k)s.classList.add("kfile")
 s.onclick=function(){openfile(s,ex)}
 if(k)preload(s)
 return s
}

function openfile(s,ex,p){ //span: .h(handle)
 s.classList.add("curfile")
 let set=function(s,u){
  save()
  ed.sp=false
  s.u=new Uint8Array(u)
  ed.setValue(su(s.u))
  ed.sp=s
  if(ed.sp.classList.contains("modified"))modify();else unmodify() 
  kmode(s.textContent.endsWith(".k")&&ge("feat").checked) 
  if(p)showpos(p)
  ge("putb").disabled=false
  let a=ex.children;for(let i=0;i<a.length;i++)if(a[i]!=s)a[i].classList.remove("curfile")
 }
 if("(z.k)"==s.textContent){set(s,s.u);return}
 if("u"in s)set(s,s.u) //from cache
 else s.h.getFile().then(r=>r.arrayBuffer()).then(u=>set(s,u))
}

if(!kdefile)ge("rall").onclick=function(){ //preload all files for k synchronous read
 let ex=ge("expl")
 let a=ex.children;for(let i=0;i<a.length;i++)preload(a[i])
}

function preload(s){
 if("getFile"in s.h)
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
 }else download(name,u)
}
function download(name,u){
 var dl=ge("dl");var b=new Blob([u],{type:"application/octet-stream"})
 dl.href=URL.createObjectURL(b);dl.download=name;dl.click()
}

ge("putb").onclick=async function(){
 if(ed.sp!==false){
  ed.sp.u=us(ed.getValue())
  if("h"in ed.sp){
   const w=await ed.sp.h.createWritable()
   await w.write(ed.getValue())
   await w.close()
  }else download(ed.sp.textContent,ed.sp.u)
  ed.sp.classList.remove("modified")
  unmodify()
 }
}

if(!kdefile)ge("newb").onclick=async function(e){
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
 let l=e.dataTransfer.files
 for(let i=0;i<l.length;i++){
  let f=l.item(i);
  f.arrayBuffer().then(u=>{
   let sp=addfile({name:f.name})
   delete sp.h
   sp.u=u
  }) 
 }
}

//dbl-click on editor scrollbar to request more space, or F11 to toggle fullscreen, when editor is focused
let sbclick=0
window.onmousedown=function(e){
 let dbl=function(){
  let t=performance.now(), r=(t-sbclick)<200
  sbclick=t;return r}
 let t=function(){ if(dbl()){
  ge("left").classList.toggle("left0");ge("left").classList.toggle("left1")
  ge("repl").classList.toggle("repl0");ge("repl").classList.toggle("repl1")
  ge("canv").classList.toggle("repl0");ge("canv").classList.toggle("repl1")
 }}
 if     (e.target.classList.contains("CodeMirror-hscrollbar"))t()
 else if(e.target.classList.contains("CodeMirror-vscrollbar"))t()
}


function clickrun(e){
 startuperr=false
 let s=ed.getValue()
 save()
 location.hash=(s.length<1000)?"#"+encodeURIComponent(s):""
 kstart(s,ge("feat").checked)
}
ge("runb").onclick=clickrun
ge("intr").onclick=interrupt


//repl
function O(s,k,l){if(s=="")return
 let e=ce("span");
 if("object"==typeof k)kval(e,k,l)
 e.contentEditable="true"
 e.textContent=l?s.trimEnd()+" ":s
 e.onkeydown=enterkey
 repl.appendChild(e);
 if(l)filelink(k.p,false)
}
function kval(sp,k){ //double-click:redisplay, right-click:assign to x
 sp.k=k
 sp.title=k.i
 let o=sp.title.startsWith("out@")
 sp.classList.add(o?"kout":"kval")
 if(o){
  sp.ondblclick=function(e){
   filelink(k.p,true)
  }
 }else{
  sp.ondblclick=function(e){
   repl.lastChild.textContent+=e.target.textContent+"\n"
   kw.postMessage({m:"kst",k:e.target.k.k})
  }
  sp.oncontextmenu=function(e){pd(e);kw.postMessage({m:"xgets",k:e.target.k.k});repl.lastChild.focus()}
 }
}
function pr(){
 let e=ce("span")
 e.textContent=(repl.children.length&&repl.lastChild.textContent.endsWith("\n"))?" ":"\n "
 e.contentEditable=true
 e.classList.add("kinput")
 e.onkeydown=enterkey
 repl.appendChild(e)
 endcursor(e)
 repl.scrollTo(0,repl.scrollHeight)
 e.focus()
}
function endcursor(e){
 let c=window.getSelection()
 c.removeAllRanges()
 let r=document.createRange()
 r.selectNodeContents(e)
 r.collapse(false)
 c.addRange(r)
}
function enterkey(e){if(e.key=="ArrowUp"||e.key=="ArrowDown"){return histkey(e)};if(e.key!="Enter")return
 let t=e.target;let s=t.textContent;if(!s.endsWith("\n"))t.textContent+=" \n"
 s=s.startsWith(" ")?s.slice(1):s.startsWith("\n ")?s.slice(2):s;histadd(s)
 if(t.parentElement==repl){
  if(repl.lastElementChild!=t)repl.lastElementChild.textContent+=s
  krep(s)
 }
 pd(e)
}
function consize(){let mono=ge("mono");let n=mono.textContent.length;return{
  w:Math.floor(n*repl.clientWidth/mono.clientWidth),
  h:Math.floor(repl.clientHeight/mono.clientHeight)
}}
ge("repl").onclick=function(e){if(repl==e.target)repl.lastChild.focus()}

let hist=[""],histi=0
function histadd(s){histi=hist.length;if(s.trim().length==0)return
 let i=hist.indexOf(s)
 if(0>i){hist.push(s)}else{hist.splice(i,1);hist.push(s);histi=hist.length}}
function histup(){let r=hist[histi];histi-=(histi>1);return r}
function histdn(){histi+=(histi<hist.length-1);return(hist[histi])}
function histkey(e){pd(e);let s=(e.key=="ArrowUp")?histup():histdn(); e.target.textContent="\n "+s;endcursor(e.target)}

function kstart(s,trc,kwasm){
 intr.disabled=false
 if(startuperr)return
 repl.textContent=""
 let files=[];if(".k"===s){s="";files=[".k"]}
//!kdefile
 let g=ge("grep").value
 if(g.startsWith("k "))files=g.slice(2).split(" ")
//kdefile
 s=cats(files,s)
 kw.postMessage({m:"start",s:s,trc:trc,cons:consize(),fs:readfs(),kw:kwasm})
}
function krep(s){
 if(s==""){rm(repl);pr();return}
 if(s.startsWith("\\")){help();return}
 intr.disabled=false
 kw.postMessage({m:"repl",s:s,cons:consize()})
}
function cats(files,s){
 src={f:["(z.k)"],n:[zk?zk.length:0]}
 let k={}; let r=[]
 if(files.length){
  let a=ge("expl").children;for(let i=0;i<a.length;i++)if(a[i].textContent.endsWith(".k"))k[a[i].textContent]=su(a[i].u)
  if(a.length==0)return s;
  for(let i=0;i<files.length;i++){
   if(!files[i]in k)throw new Error(files[k]+" is missing")
   let fi=files[i]; let si=k[fi]
   src.f.push(fi);src.n.push(si.length)
   r.push(si)
 }}
 r.push(s)
 src.f.push((ed.sp===false)?"(ed)":ed.sp.textContent);src.n.push(s.length)
 return r.join("\n")
}
//!kdefile
function newkw(){kw=new Worker("kwork.js",{name:"kwork"})}
function help(){fetch("../readme").then(r=>r.text()).then(t=>{O(t);pr()})}
//kdefile
function readfs(){
 let fs={}
 let a=ge("expl").children;for(let i=0;i<a.length;i++)if("u"in a[i])fs[a[i].textContent]=a[i].u
 return fs
}

function newk(){
 newkw() 
 kw.onmessage=function(e){let d=e.data
  switch(d.m){
  case"write":
   if(d.f==""){O(d.s,d.k,d.l);if(d.mem!==undefined)ge("memo").textContent=d.mem}
   else        writefile(d.f,d.u)
   break
  case"prompt":pr();break
  case"indicate":indicate(d.p,d.e,d.l,d.stack);break
  case"plot":plot(d.t,d.l);break
  case"kres":kres(e.data);break //kde/file/file.h
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

function indicate(p,e,l,fstack){
 if(e!=""){
  let a=ce("a")
  a.href=l;a.target="_blank";a.innerText=e
  let d=ce("div");d.contentEditable=false;d.appendChild(a);repl.appendChild(d) //wrap to make it clickable
 }
 if(fstack.length)printstack(fstack)
 else filelink(p,true)
 if(kdefile)debug(true)
}
function fileat(f,p,direct,extra){
 if(direct&&f=="(ed)"){showpos(p);return}
 let a=ce("a");
 a.href=f+"@"+p
 a.textContent=(f+"@"+p).padEnd(10)
 if(f=="(ed)")a.onclick=function(e){pd(e);showpos(p)}
 else         a.onclick=function(e){pd(e);openfile(findfile(f),ge("expl"),p)}
 repl.appendChild(a)
 if(extra!==undefined)for(let i=0;i<extra.length;i++)repl.appendChild(extra[i])
 let e=ce("span");e.textContent="\n";repl.appendChild(e)
}
function filelink(p,direct,extra){
 for(let i=0;i<src.n.length;i++){let ni=src.n[i]
  if(p<ni){fileat(src.f[i],p-2,direct,extra);return}
  p-=1+ni
}}
//!kdefile
function showpos(i){let p=ed.posFromIndex(i);ed.setSelection(p,{line:p.line,ch:1+p.ch})}
//kdefile
function printstack(fstack){for(let i=0;i<fstack.length;i++){
 let kx=fstack[i].k
 let spn=function(s){let r=ce("span");r.textContent=s;return r}
 let extra=[spn("(")]
 for(let j=0;j<kx.length;j++){let kj=kx[j]
  let e=ce("span")
  kval(e,kj)
  e.textContent=kj.s+((j==kx.length-1)?"":" ")
  extra.push(e)
 }
 extra.push(spn(")"))
 filelink(fstack[i].p,false,extra)
}}

