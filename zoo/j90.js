function ge(x){return document.getElementById(x)}
function ce(x){return document.createElement(x)}

var txt = "Roger Hui: <blockquote>The first release of the software was at APL90 in Copenhagen in August 1990, when J was made available as shareware to the Software Exchange. (You can still get this version from various archives.)</blockquote>It turned out to be not so simple.<p>Thank's to Martin Neitzel for the binary and @copy for the v86 emulator<p>You can select text in the APL\\? paper (e.g. from the examples at the end) then press enter to send it to the emulator"

// send marked text in APL\? pre elements to emulator on enter key.  
// initialization needs to wait for APL\? iframe to be ready.
var emulator
function jlink(d){
 let s=d.getSelection().getRangeAt(0).toString()+"\n"
 for(let i=0;i<s.length;i++)emulator.keyboard_adapter.simulate_char(s[i])
}
var iframe
function ready(){let p=iframe
 let d=p.contentDocument||p.contentWindow.document
 console.log(d.readyState)
 if(d.readyState=="complete"){
  console.log("complete")
  d.onkeyup=function(e){if(e.key=="Enter")jlink(d)}
  return
 } 
 window.setTimeout(ready,100)
}

let O
function ini(left,o){O=o
 let p=ce("iframe")
 p.src="../j/j90/J1990a.htm"
 p.style.width="100%";p.style.height="100%";
 left.style.overflow="hidden";
 left.appendChild(p)
 iframe=p;ready()
 

 
 let sc=ce("div"); sc.classList.add("right")
 let sd=ce("div")
 sd.style.whiteSpace="pre"
 sd.style.font=      "14px monospace"
 sd.style.lineHeight="14px"
 sc.appendChild(sd)
 let cn=ce("canvas")
 cn.style.display="none"
 sd.appendChild(cn)
 let an=document.createElement("div")
 an.innerHTML=txt
 an.style.fontFamily="serif"
 sc.appendChild(an)
 ge("tty").parentNode.append(sc)
 

 let dos="../j/j90/dos/"
 fetch(dos+"libv86.js").then(r=>r.text()).then(r=>{
  eval(r)
  emulator = window.emulator = new V86Starter({
   wasm_path: dos+"v86.wasm",
   memory_size: 32 * 1024 * 1024,
   vga_memory_size: 2 * 1024 * 1024,
   screen_container: sc,
   bios: { url: dos+"seabios.bin" },
   vga_bios: { url: dos+"vgabios.bin" },
   fda: { url: dos+"jdos.img", size: 737280 },
   autostart: true,
  })
 })

 
 O("where was my apl90 floppy again?\n")
}

function evl(s){ 
}


let j90={ini:ini,evl:evl}

export { j90 }
