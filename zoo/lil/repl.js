// derived from: https://raw.githubusercontent.com/JohnEarnest/Decker/main/js/repl.js

readBinaryFile=path=>{ throw("readBinaryFile nyi") /*const b=require('fs').readFileSync(path);return array_make(b.length,'u8',0,new Uint8Array(b))*/ }
writeBinaryFile=(path,x)=>{ throw("writeBinaryFile nyi")  /*require('fs').writeFileSync(path,Buffer.from(x.data))*/}
readTextFile=path=>{ throw("readTextFile nyi") /*require('fs').readFileSync(path,{encoding:'utf8'}).replace(/\uFEFF/g, '')*/}
writeTextFile=(path,text)=>{ throw("readTextFile nyi") /*require('fs').writeFileSync(path,text,{encoding:'utf8'})*/}
go_notify=(deck,x,t)=>{/*console.log('go notify',x,t)*/}
const env=lmenv()
n_play=([x])=>NONE
n_show=z=>{console.log(z.map(x=>show(x,z.length==1)).join(' '));return z[0]}
n_print=x=>{console.log(ls(x.length>1?dyad.format(x[0],lml(x.slice(1))):x[0]));return NONE}
n_alert  =([x])=>ONE
n_save   =([x])=>NONE
n_open   =(   )=>lms('')
run      =prog=>{pushstate(env),state.external=1,issue(env,prog);while(running())runop();const r=arg();return popstate(),r}
env.local('read',lmnat(([x,y])=>y&&ls(y)=='array'?readBinaryFile(ls(x)):lms(readTextFile(ls(x)))))
env.local('write',lmnat(([x,y])=>array_is(y)?writeBinaryFile(ls(x),y):writeTextFile(ls(x),ls(y))))
env.local('exit',lmnat(([x])=>process.exit(ln(x))))
env.local('print',lmnat(n_print))
env.local('show',lmnat(n_show))
env.local('shell',lmnat(([x])=>{
 throw("shell nyi")
 /*	let o='',e=0;try{o=require('node:child_process').execSync(ls(x))}catch(err){o=err.stdout.toString(),e=err.status}
	return lmd(['exit','out'].map(lms),[lmn(e),lms(o)]) */
}))
env.local('dir',lmnat(([x])=>{
 throw("dir nyi")
 /*     const path=x?ls(x):'.', r={dir:[],name:[],type:[]}, fs=require('fs'), pt=require('path')
	fs.readdirSync(path).map(name=>{
		r.dir.push(lmn(fs.lstatSync(`${path}/${name}`).isDirectory()))
		r.name.push(lms(name)),r.type.push(lms(pt.extname(name)))
	});return lmt(r) */
}))
env.local('random',lmnat(n_random))
env.local('array',lmnat(n_array))
env.local('image',lmnat(n_image))
env.local('sound',lmnat(n_sound))
env.local('eval',lmnat(n_eval))
env.local('writecsv',lmnat(n_writecsv))
env.local('readcsv',lmnat(n_readcsv))
env.local('writexml',lmnat(n_writexml))
env.local('readxml',lmnat(n_readxml))
env.local('readdeck',lmnat((([filename])=>deck_read(filename?readTextFile(ls(filename)):''))))
env.local('writedeck',lmnat(([filename,deck])=>writeTextFile(ls(filename),deck_write(deck,/\.html$/i.test(ls(filename))))))
constants(env)

/*
if(process.argv.length>=3){
	try{run(parse(readTextFile(process.argv[2])))}
	catch(e){console.error('x' in e?`(${e.r+1}:${e.c+1}) ${e.x}`:e),process.exit(1)}
	process.exit(0)
}
rl=require('readline').createInterface({input:process.stdin,output:process.stdout,prompt:'  '});rl.prompt()
rl.on('close',_=>(console.log('\n'),process.exit(0)))
rl.on('line',line=>{
	try{(line.trim()!='')&&console.log(show(run(parse(line.trim())),true))}
	catch(e){console.error('x' in e?`${' '.repeat(e.c+1)}^\n${e.x}\n`:e)}
	rl.prompt()
})
*/

return function(s){ //evl
 O("\n")
 try{O(show(run(parse(s.trim())),true))}
  catch(e){O('x' in e?`${' '.repeat(e.c+1)}^\n${e.x}\n`:e)}
  O("\n ")
}
