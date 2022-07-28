function ge(x){return document.getElementById(x)}
function ce(x){return document.createElement(x)}

let O
function ini(left,o){O=o
 let p=ce("iframe")
 p.src="../j/j90/J1990a.htm"
 p.style.width="100%";p.style.height="100%";
 left.style.overflow="hidden";
 left.appendChild(p)

 
 let sc=ce("div"); sc.classList.add("right")
 let sd=ce("div")
 sd.style.whiteSpace="pre"
 sd.style.font=      "14px monospace"
 sd.style.lineHeight="14px"
 sc.appendChild(sd)
 let cn=ce("canvas")
 cn.style.display="none"
 sd.appendChild(cn)
 ge("tty").parentNode.append(sc)

 let dos="../j/j90/dos/"
 fetch(dos+"libv86.js").then(r=>r.text()).then(r=>{
  eval(r)
  var emulator = window.emulator = new V86Starter({
   wasm_path: dos+"v86.wasm",
   memory_size: 32 * 1024 * 1024,
   vga_memory_size: 2 * 1024 * 1024,
   screen_container: sc,
   bios: { url: dos+"seabios.bin" },
   vga_bios: { url: dos+"vgabios.bin" },
   fda: { url: dos+"freedos722.img", size: 737280 },
   autostart: true,
  })
 })
 
 O("nyi\n    ")
}

function evl(s){ 
}

let j90={ini:ini,evl:evl}

export { j90 }
