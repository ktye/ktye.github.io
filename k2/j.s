let J=x=>{let s=sk(x).trim(),t=+sk("4:"+x),n=+sk("#"+x),R=x=>(x._=t,x.$=n,x)
 return R((!n)?[]              //empty
 :-4==t?s.split(" ").map(x=>x.slice(1))                       //symbols
 :-3==t?s.slice(1,s.length-2)                                 //chars
 : 0> t?s.split(" ")                                          //floats ints
 : 0==t?new Array(n).fill(0).map((_,i)=>J(x+"["+i+"]"))       //list
 : 3> t?[s]                                                   //int float
 : 3==t?[s.slice(1,s.length-1)]                               //char
 : 4==t?[s.slice(1)]                                          //symbol
 : 5==t?[J("!"+x),J(`(${x})[!${x}]`)]                         //dict
 :[])}                                                        //null
