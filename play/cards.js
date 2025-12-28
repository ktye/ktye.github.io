
const c_="🃑 🃒 🃓 🃔 🃕 🃖 🃗 🃘 🃙 🃚 🃛 🃝 🃞 🂡 🂢 🂣 🂤 🂥 🂦 🂧 🂨 🂩 🂪 🂫 🂭 🂮 🂱 🂲 🂳 🂴 🂵 🂶 🂷 🂸 🂹 🂺 🂻 🂽 🂾 🃁 🃂 🃃 🃄 🃅 🃆 🃇 🃈 🃉 🃊 🃋 🃍 🃎 🂠".split(" ")
let card=i=>`<span style="font-size:xxx-large;color:${i>25&&i<52?'#ff5555':'black'}">${c_[i<0?52:i]}</span>`
let cards=a=>a.map(card).join("")

//table: {a:[1,3],b:[4,5],c:[7],me:[32,33],table:[12,13,15];turn:"me"}

document.body.innerHTML=`
<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center">
 <div id="north" style="height:10vh;text-align:center"></div>
 <div style="height:15vh;display:flex;justify-content:space-between;width:90%">
  <div id="west" style="text-align:left">west</div>
  <div id="east" style="text-align:right">east</div>
 </div>
<div id="stock" style="height:30vh;line-height:30vh;text-align:center;min-width:50%;border:3px solid brown;border-radius:2em;padding:2em">stock</div>
<div id="south" style="height:30vh;line-height:30vh;text-align:"center">south</div>
</div>
`

let yourturn=(d,t)=>{ d.style.border=t?"2px solid blue":""; d.style.borderRadius="1em"; d.style.border=t?"2px solid blue":""; d.style.paddingLeft=t?"1em":""; d.style.paddingRight=t?"1em":""; }
let fiftytwo=_=>Array(52).fill(0).map((_,i)=>i)
let thirtytwo=_=>fiftytwo().filter(x=>(x=x%13,(!x)||x>5))
let shuffle=a=>a.toSorted(_=>Math.random()-0.5)

//let drawDeck=(x,y,c)=>
let show=(t,open)=>{
 let player=Object.keys(t).filter(x=>x!="table"&&x!="turn");
 let others=player.filter(x=>x!="me"),no=others.length
 let divs=1==no?[north]:2==no?[west,east]:[west,north,east];
 let backside=`<span>${c_[52]}</span>`
 others.forEach((x,i)=>{divs[i].innerHTML=`${x}<br/>${open?cards(t[x]):backside}`;yourturn(divs[i],t.turn==x)})
 south.innerHTML=cards(t.me)
 yourturn(south,t.turn=="me")
 stock.innerHTML=cards(t.table)
}

/*
let rnd=m=>0|(m*Math.random())
let draw=(Y,m)=>{ board.innerHTML=`${card(-1,-1,10,100,100)} ${card(rnd(4),rnd(13),400,400,100)}` };draw();
board.onclick=_=>draw();
*/
