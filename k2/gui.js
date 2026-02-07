let G=[],gui=(x,y)=>G.push([x,y]),ui=_=>{G.forEach(x=>(x[0]?show:hide)(x[1])),G=[]}
let show=x=>win(x)
let hide=x=>qs(dex,`[k="${x}"]`).remove()

let ce=x=>document.createElement(x)
let ac=(c,x)=>(x.appendChild(c),x)
let ct=(t,x)=>(x.textContent=t,x)
let cl=(c,x)=>(x.classList.add(c),x)
let qs=(x,y)=>x.querySelector(y)
let bb=x=>x.getBoundingClientRect()
let win=x=>{let i=dex.childElementCount
 let w=cl("win",ce("w"));w.dataset.k=x
 w.innerHTML=`<div class="hdr">
  <img src="../kelas32.png" width="16" style="float:left;position:relative;left:-5px">
  <span>${x}</span>
  <span style="float:right" style="padding-left:5px" class="cxx">&#x2717;</span>
 </div><p>a lot of content and more</p>`
 ac(w,dex);lay(w,i);drag(w);return w}

let lay=(w,i)=>{let r=bb(dex);w.style.left=(5+r.left+20*i)+"px";w.style.top=(5+r.top+30*i)+"px"}
let drag=w=>{let h=w.firstElementChild,a=0,p=0,c=0,d=0
 let cd=_=>{document.onmouseup=null;document.onmousemove=null}
 let mm=e=>{pd(e);a=c-e.clientX;b=d-e.clientY;c=e.clientX;d=e.clientY;
  let r=bb(dex),R=bb(w)
  w.style.top=Math.max(5,Math.min(-5+r.height-R.height,w.offsetTop-b))+"px"
  w.style.left=Math.min(r.left+r.width-R.width-5,Math.max(r.left+5,w.offsetLeft-a))+"px"}
 let md=e=>{pd(e);w.parentNode.appendChild(w);/*bring to top*/
 if(e.target.className=="cxx")return w.remove()
 c=e.clientX;d=e.clientY;document.onmouseup=cd;document.onmousemove=mm}
 h.onmousedown=md
}

/*
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
  */
/*
<div id="mydiv">
  <!-- Include a header DIV with the same name as the draggable DIV, followed by "header" -->
  <div id="mydivheader">Click here to move</div>
  <p>Move</p>
  <p>this</p>
  <p>DIV</p>
</div>
*/
