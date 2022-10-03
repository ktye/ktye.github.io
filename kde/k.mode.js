//                       syntax class   theme colors
// f 1+/1 2              content        see k.mode.css
// /linecomment          comment
// x /comment            comment 
// "str(\n\""            string
// (space)\              keyword
// ;                     separator
// $[c;a;c;b;d]          cond cases
// $[c;a;c;d]            invalid (no else)
// {) no-match-error     invalid

// state:{st="";br="({";cn=[2 3]}
//  st(state)          err|str|..
//  br(bracket stack)
//  cn(cond level stack)

(function(mod){mod(CodeMirror)})(function(CodeMirror){
 "use strict";

 CodeMirror.defineMode("k",function(){
 
  let tokenString=function(t,s){
   if(t.match(/^"([^\\"]|\\.)*"/))
    s.st=""           //complete string
   else if(t.match(/^"([^\\"]|\\.)*/))
    t.skipToEnd()     //start of multiline string
   else if(t.match(/^([^\\"]|\\.)*"/))
    s.st=""          //end of multiline string
   else
    t.skipToEnd()    //within multiline string
   return"string"
  } 
  let level=function(t,s){  //([{;}])
   let p=t.next()
   if(p=="$"){
    p=t.next()
    s.cn.push(0)
   }
   if(")]}".includes(p)){
    let x=s.br.slice(-1)
    if(!matchbr(p,x)){s.st="err";return"invalid"}
    s.br=s.br.slice(0,-1)
    if(x=="$"){
     let x=s.cn.pop();if(x>2&&x%2!=0){s.st="err";return "invalid"}
    }
   }
   if(p==";"&&s.br.at(-1)=="$")s.cn[-1+s.cn.length]++
   s.st=""; return(p==";")?"separator":"content"
  }
  let matchbr=function(x,y){
   switch(x){
   case ")": return y=="("
   case "]": return y=="["||y=="$"
   case "}": return y=="{"
   default:  return false
   }
  }
  let cndlen=function(t,s){
   if(s.br.length&&"$"==s.br.at(-1))s.cn[-1+s.cn.length]++
  }
 
  return {
   startState:function(){return{st:"", br:"", cn:[]}},
   token:function(t,s){
    switch(s.st){
    case "err": t.skipToEnd(); return "invalid"
    case "str": return tokenString(t,s)
    case "com": t.skipToEnd(); s.st=""; return "comment"
    case "sep": return level(t,s)
    case "deb": t.next();      s.st=""; return "keyword"
    }

    let p=t.peek()
    if(t.sol()&&p==="/"){
     t.skipToEnd()
     return "comment"
    }
    if(t.sol())cndlen(t,s)
    let l=""
    while(1){
     if(p==null)break
     if((l==" ")&&(p=="/" )){s.st="com";break}
     if((l==" ")&&(p=="\\")){s.st="deb";break}
     if           (p=='"' ) {s.st="str";break}
     if           (p==';' ) {s.st="sep";break}
     if((l=="$")&&(p=="[")) {s.st="sep"
      t.backUp(1);s.br+="$";break
     }
     
     if("([{}])".includes(p)){
      if("([{".includes(p))s.br+=p
      s.st="sep";break
     }
     l=p
     t.next()
     p=t.peek()
    }
    if((s.cn.length)&&(0==s.cn.slice(-1)%2)&&p!="]")return"cond"
    return"content"
   },
 
   fold:"brace-paren",
  }
 }) 
});
