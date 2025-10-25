let shpr="$"
let rlbuf=[]

let rlpos=0
let rladd=x=>{rlpos=rlbuf.length;if(rlbuf.length&&rlbuf[rlbuf.length]==x)return x;rlbuf.push(x);rlpos++;return x}
let rlprev=x=>{let n=rlbuf.length;  if(rlpos>0)rlpos--;rdl.textContent=(n?rlbuf[rlpos]:"");rlend()}
let rlnext=x=>{let n=rlbuf.length;  if(rlpos<n)rlpos++;rdl.textContent=(n?rlbuf[rlpos]:"");rlend()}

let prmt=x=>{prm.textContent=x?"█":"";rdl.focus()}
rdl.onkeydown=(e,k)=>(k=e.key,"Enter"==k?(pd(e),exec(rladd(rdl.textContent))):"ArrowUp"==k?(pd(e),rlprev(rdl.textContent)):"ArrowDown"==k?(pd(e),rlnext(rdl.textContent)):("c"==k&&e.ctrlKey)?(pd(e),progexit()):"Escape"==k?(pd(e),rdl.textContent=""):"Tab"==k?(pd(e),complete(rdl.textContent)):0)
tty.onclick=_=>rdl.focus()

let complete=x=>{let i=x.lastIndexOf(" "),l=fs.map(x=>x.name),s=(i<0)?x:x.slice(1+i)
 if(i<0)l=[...l,..."ls rm cp cat vi ed edit emacs nano".split(" ")]
 for(let i=0;i<l.length;i++){if(l[i].startsWith(s)){rdl.textContent+=l[i].slice(s.length);break}}
 rlend() }

let rlend=_=>{let r=document.createRange(),s=window.getSelection();r.selectNodeContents(rdl);r.collapse(false);s.removeAllRanges();s.addRange(r);rdl.focus()}
let progexit=_=>{prog="";stdflush();shprmt("$")}

let stdout=0,stdin=0,prog=""
let exec=x=>{ out.textContent+=x+"\n";rdl.textContent="";
 if("k"==prog)return kshell(x,shprmt,progexit);
 x=x.trim()
 x=x.replaceAll(">"," > ").replaceAll("<"," < ").replace(/[ \t]+/g," ")
 let a=x.split(" "),ii=a.indexOf("<"),ifile="",ofile=""
 if(ii>=0){ifile=a[ii+1];a.splice(ii,2)};let io=a.indexOf(">")
 if(io>=0){ofile=a[io+1];a.splice(io,2);stdout=new Uint8Array(4096);stdout.n=0;stdout.name=ofile}
 if(x.length==0){}
 else if(x.includes("|")){ out.textContent+="pipe: non smoking place\n" }
 else if(ofile==">"){ out.textContent+=">>: no append\n" }
 else if(ifile!=""&&0>fs.findIndex(x=>x.name==ifile)) { out.textContent+="no file: "+ifile+"\n" }
 else if(ifile!=""&&ifile==ofile) { out.textContent+="><:same file\n" }
 else if(a[0]in builtins)builtins[a[0]](a.slice(1))
 else if(a[0]=="ls")ls(a.slice(1))
 else if(a[0]=="cat")cat(a.slice(1))
 else if(a[0]=="k"){prog="k";return kshell(a.slice(1),shprmt,progexit)}
 else{x=fsget(a[0]); 
  if(x===0)out.textContent+="no file: "+a[0]+"\n";
  else if(String(af(x.slice(0,4)))!="127,69,76,70")out.textContent+="no elf: "+a[0]+"\n"
  else {prog=a[0];return execv(a)}
 }
 stdflush()
 shprmt("$")
} 
let O=x=>(stdout?stdpush("string"==typeof x?us(x):x):out.textContent+=(("string"==typeof x)?x:su(x)))
let ls=a=>O((!a.length)?fs.map(x=>x.name+"\n").join(""):fs.filter(x=>a.includes(x.name)).map(x=>x.name+"\n").join(""))
let cat=a=>{a.forEach(x=>(x=fsget(x),x===0?"":O(x)))}
let rm=a=>{a.forEach(x=>fsdel(x))}
let cp=(a,b)=>2==a.length?(((b=fsget(a[0])),b===0)?O("no file: "+a[0]+"\n"):fsadd(a[1],b.slice())):O("cp src dst\n")
let mv=a=>(cp(a),rm(a.slice(0,1)))
let clear=_=>out.textContent=""
let kill=a=>a.includes("1")?tty.innerHTML="kernel panic":""
let cmp=a=>{if(2!=a.length){O("use:cmp a b\n");return};
 let b=a[1];a=a[0],x=fsget(a),y=fsget(b);if(x===0||y===0){O("no file: "+((x===0)?a:b)+"\n");return}
 if(x.length!=y.length){O(a+" "+b+": size differs\n");return}
 for(let i=0;i<x.length;i++)if(x[i]!=y[i]){O(a+" "+b+" differ at byte "+(1+i));return}}
let xxc=a=>{a.forEach(x=>(x=fsget(x),x!==0?O(xxd(x)):0))}
let wget=(a,i)=>{a.forEach(x=> fe(x,  (i=x.lastIndexOf("/"))>=0?x.slice(1+i):x ))}
let head=a=>{if(!a.length)return;a=fsget(a[0]);if(a===0)return;a=su(a).split("\n");O((a.length>19?a.slice(0,19):a).join("\n"))}
 
let builtins={ls:ls,cat:cat,xxd:xxc,rm:rm,cmp:cmp,cp:cp,mv:mv,clear:clear,find:_=>O("nothing to lose\n"),ps:_=>O("1 sh\n"),kill:kill,pwd:_=>O("/\n"),cd:_=>0,echo:a=>O(a.join(" ")+"\n"),ed:ed,vi:ed,nano:ed,emacs:ed,edit:ed,help:_=>cat(["readme"]),head:head,wget:wget}

let stdpush=u=>{let n=stdout.n,name=stdout.name
 if(n+u.length>stdout.length){
  let r=new Uint8Array(n+u.length+4096);
  r.set(stdout);stdout=r;stdout.n=n;stdout.name=name }
 stdout.set(u,n);stdout.n+=u.length }
let stdflush=_=>{if(stdout===0)return;fsadd(stdout.name,stdout.slice(0,stdout.n));stdout=0}

let shprmt=p=>{
 let v=out.textContent.split("\n")
 v=(19<v.length?v.slice(v.length-19):v).join("\n")
 v+=v.endsWith("\n")?p:"\n"+p;out.textContent=v
 rdl.textContent="";prmt(1);
}
let sh=_=>{shprmt("$")}

out.onblur=_=>{let s=document.getSelection().toString();if(s!="")navigator.clipboard.writeText(s) }


