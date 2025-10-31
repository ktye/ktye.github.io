let ed=x=>{if("string"==typeof x)x=[x];if(1!=x.length){O("use: ed file\n");return};x=x[0]
 let i=fs.findIndex(f=>f.name==x);x=i<0?({name:x,u:new Uint8Array()}):fs[i]
 if(String(af(x.u.slice(0,4)))=="127,69,76,70"){
  editor.value=xxd(x.u);editor.readonly=true
 }else{
  editor.value=su(x.u);editor.readonly=false
 }
 filename.textContent=x.name
 edbutw.disabled=editor.readonly
 edshow(1)
}
let edshow=x=>{
 if(x){editor.hidden=false;tty.hidden=true;edbut.hidden=false}
 else {tty.hidden=false;editor.hidden=true;edbut.hidden=true}
}
let edwrite=x=>{fsadd(filename.textContent,us(editor.value));fsshow()}
let xxd=(x,t, s,i,o,O)=>(t=t?t:0,i=0,o="",O=x=>o+=x,s="  ",x.forEach((x,i)=>{
 if(0==i%16)(O((i?s+"\n":"")+(i+t).toString(16).padStart(8,'0')+":"),s="  ")
 if(0==i%2)O(" ");O(x.toString(16).padStart(2,'0'));s+=(x>31&&x<127)?String.fromCharCode(x):"."}),(i=x.length%16),O(i?" ".repeat(2.5*(16-x.length%16)):""+s),o)
let download=()=>{
 let name=filename.textContent,i=fs.findIndex(f=>f.name==name);if(i<0)return
 let u=fs[i].u,x=new Blob([u],{type:"application/octet-stream"});dl.href=URL.createObjectURL(x);dl.download=name;dl.click()
}
