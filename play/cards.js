
const c_="🃑 🃒 🃓 🃔 🃕 🃖 🃗 🃘 🃙 🃚 🃛 🃝 🃞 🂡 🂢 🂣 🂤 🂥 🂦 🂧 🂨 🂩 🂪 🂫 🂭 🂮 🂱 🂲 🂳 🂴 🂵 🂶 🂷 🂸 🂹 🂺 🂻 🂽 🂾 🃁 🃂 🃃 🃄 🃅 🃆 🃇 🃈 🃉 🃊 🃋 🃍 🃎 🂠".split(" ")
let card=(c,n,x,y,s)=>`<text x="${x}" y="${y}" font-size="${s}" fill="${c>1?'#ff5555':'black'}">${c_[c<0?52:n+13*c]}</text>`

let drawDeck=(x,y,c)=>
let drawPlayer=(name,x,y,al,hand)=>`<text x="${x}" y="${y}" font-size:"40" >${name+("me"?"":+" "+c_[52])}</text>`
let drawTable=t=>{let r=`<ellipse cx="400" cy="400" rx="300" ry="200" fill="#704217"/>`
 let player=Object.keys(t).filter(x=>x!="table"),np=player.length;
 r+=drawPlayer("🃒🃒🃒",400,700,"center")
 drawPlayer(player[0])
 table.innerHTML=r;}

/*
let rnd=m=>0|(m*Math.random())
let draw=(Y,m)=>{ board.innerHTML=`${card(-1,-1,10,100,100)} ${card(rnd(4),rnd(13),400,400,100)}` };draw();
board.onclick=_=>draw();
*/
