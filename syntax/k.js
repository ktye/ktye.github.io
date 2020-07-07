let tree; //from tree-sitter playground / lelf / ktye
var K

(async () => {
 const cons = document.getElementById('console');
 var help = ""; fetch('h').then(r=>{return r.text()}).then(s=>{help=s})

 // k.wasm module
 var O = function(s) {codeEditor.replaceRange(s, {line:codeEditor.lineCount()})}
 var draw = function(w,h,p) { console.log("no drawing canvas") }
 var grow = function(x) {var cur=K.exports.mem.buffer.byteLength;if((1<<x)>cur){var a=(1<<x)-cur;K.exports.mem.grow(a>>>16); msl()};return x}
 var printc = function(x,y){O(su(K.C.slice(x,x+y))+"\n")}
 var msl = function(){var b=K.exports.mem.buffer;K.C=new Uint8Array(b);K.U=new Uint32Array(b);K.I=new Int32Array(b);K.F=new Float64Array(b)}
 var nn, dx, mk, val, kst, bak
 WebAssembly.instantiateStreaming(fetch('k.wasm'), { "ext": {"sin":Math.sin,"cos":Math.cos,"log":Math.log,"atan2":Math.atan2,"hypot":Math.hypot,"draw":draw,"grow":grow,"printc":printc} }).then(r=>{
  K=r.instance;msl();K.exports.ini(16);bak=K.C.slice(0)
  nn=K.exports.nn;dx=K.exports.dx;mk=K.exports.mk;val=K.exports.val;kst=K.exports.kst
 });

 function execute(s) {t=s.trim();if(t.length==0)return;if(t==="\\")return help;var x = ktry(s);return x?sk(kst(x)):"'"}
 function us(s) { return new TextEncoder("utf-8").encode(s) }
 function su(u) { return (u.length) ? new TextDecoder("utf-8").decode(u) : "" }
 function sk(x) { var n=nn(x); dx(x); return su(K.C.slice(8+x, 8+x+n))}
 function cstr(s) { var n=s.length;var x=mk(1, n);for(var i=0;i<n;i++)K.C[8+x+i]=s.charCodeAt(i);return x}
 function ktry(s) {
  try     { var x = val(cstr(s)); bak = K.C.slice(0, 1<<K.U[32]);return x}
  catch(e){console.log(e);K.C.set(bak);return 0}
 }

 const CAPTURE_REGEX = /@\s*([\w\._-]+)/g;
 const COLORS_BY_INDEX = ['red','gray',    '#268bd2',    '#d33682',    '#6c71c4',    '#b58900',    '#859900',    '#2aa198',    "green","blue",        '#d00682',    '#6001c4',    '#200bd2',    '#b00900',    '#800900',    '#cb4b16',    '#dc322f',    '#c00b16',    '#d0022f',    '#bf8970',    '#200198',    '#cf4b76',    '#df327f',    '#df3672',    '#6f7174',    '#2f8b72',    '#2fa178',    '#8f9970',    '#bf8970',    '#cf4b76',    '#df327f',    '#df3672',    '#6f7174',    '#2f8b72',    '#2fa178',    '#8f9970',    'blue',    'chocolate',    'darkblue',    'darkcyan',    'darkgreen',    'darkred',    'darkslategray',    'dimgray',    'green',    'indigo',    'navy',    'red',    'sienna'  ];
 const scriptURL = document.currentScript.getAttribute('src');
 const languagesByName = {};
 loadState();  await TreeSitter.init();
 const parser = new TreeSitter();
 const codeEditor = CodeMirror.fromTextArea(cons, {showCursorWhenSelecting: true});
 const saveStateOnChange = debounce(saveState, 2000);
 const runTreeQueryOnChange = debounce(runTreeQuery, 50);

 let languageName = 'k';
 let treeRows = null;  let treeRowHighlightedIndex = -1;  let parseCount = 0;  let isRendering = 0;  let query;

 codeEditor.on('keydown', handleKey); // execute k on enter
 codeEditor.on('changes', handleCodeChange);
 codeEditor.on('viewportChange', runTreeQueryOnChange);
 await handleLanguageChange()

 async function handleLanguageChange() {
   const newLanguageName = 'k';
   if (!languagesByName[newLanguageName]) {
     const url = `tree-sitter-k.wasm`
     try {languagesByName[newLanguageName] = await TreeSitter.Language.load(url);}
      catch (e) {console.error(e);return} finally {}
   }

   tree = null;
   languageName = newLanguageName;
   parser.setLanguage(languagesByName[newLanguageName]);
   handleCodeChange();
   handleQueryChange();
 }

 async function handleCodeChange(editor, changes) {
   const newText = codeEditor.getValue() + '\n';
   const edits = tree && changes && changes.map(treeEditForEditorChange);
   if (edits) {      for (const edit of edits) {        tree.edit(edit);      }    }
   const newTree = parser.parse(newText, tree);

   if (tree) tree.delete();    tree = newTree;    parseCount++;
   runTreeQueryOnChange();
   saveStateOnChange();
 }


 function runTreeQuery(_, startRow, endRow) {
   if (endRow == null) {
     const viewport = codeEditor.getViewport();
     startRow = viewport.from;
     endRow = viewport.to;
   }

   codeEditor.operation(() => {
     const marks = codeEditor.getAllMarks();
     marks.forEach(m => m.clear());

     if (tree && query) {
       const captures = query.captures(
         tree.rootNode,
         {row: startRow, column: 0},
         {row: endRow, column: 0},
       );
       let lastNodeId;
       for (const {name, node} of captures) {
         if (node.id === lastNodeId) continue;
         lastNodeId = node.id;
         const {startPosition, endPosition} = node;
         codeEditor.markText(
           {line: startPosition.row, ch: startPosition.column},
           {line: endPosition.row, ch: endPosition.column},
           {
             inclusiveLeft: true,
             inclusiveRight: true,
             css: `color: ${colorForCaptureName(name)}`
           }
         );
       }
     }
   });
 }

 function handleQueryChange() {
   var queryText = '';
   fetch('highlights.scm').then(x=>x.text()).then(function(x){if(x){query=parser.getLanguage().query(x);runTreeQuery()}});
 }

 function treeEditForEditorChange(change) {
   const oldLineCount = change.removed.length;
   const newLineCount = change.text.length;
   const lastLineLength = change.text[newLineCount - 1].length;

   const startPosition = {row: change.from.line, column: change.from.ch};
   const oldEndPosition = {row: change.to.line, column: change.to.ch};
   const newEndPosition = {
     row: startPosition.row + newLineCount - 1,
     column: newLineCount === 1
       ? startPosition.column + lastLineLength
       : lastLineLength
   };

   const startIndex = codeEditor.indexFromPos(change.from);
   let newEndIndex = startIndex + newLineCount - 1;
   let oldEndIndex = startIndex + oldLineCount - 1;
   for (let i = 0; i < newLineCount; i++) newEndIndex += change.text[i].length;
   for (let i = 0; i < oldLineCount; i++) oldEndIndex += change.removed[i].length;

   return {
     startIndex, oldEndIndex, newEndIndex,
     startPosition, oldEndPosition, newEndPosition
   };
 }

 function colorForCaptureName(capture) {
   const id = query.captureNames.indexOf(capture);
   return COLORS_BY_INDEX[id % COLORS_BY_INDEX.length];
 }

 function loadState() {
   const language = localStorage.getItem("language");
   const sourceCode = localStorage.getItem("sourceCode");
   if (language != null && sourceCode != null) {
     cons.value = sourceCode;
   }
 }

 function saveState() {
   localStorage.setItem("sourceCode", codeEditor.getValue());
   localStorage.setItem("language","k");
 }

 function debounce(func, wait, immediate) {
   var timeout;
   return function() {
     var context = this, args = arguments;
     var later = function() {
       timeout = null;
       if (!immediate) func.apply(context, args);
     };
     var callNow = immediate && !timeout;
     clearTimeout(timeout);
     timeout = setTimeout(later, wait);
     if (callNow) func.apply(context, args);
   };
 }

 var hot=true
 function handleKey(a, e) {
   if(e.keyCode==27){hot=!hot;document.body.style.backgroundColor=hot?"white":"#ffffea"}
   if(!hot)return
   if(e.keyCode!=13)return
   var l = a.getCursor().line
   var s = a.getLine(l)
   s = execute(s)
   O("\n"+s+"\n ")
   e.preventDefault()
   e.stopPropagation()
 }
})();
