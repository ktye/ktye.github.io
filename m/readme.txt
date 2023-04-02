k/mobile

web application for mobile with 
persistant storage and offline support

- switch between k versions (ngn/ktye/..)
- edit files locally which are persistent
  (where? fs/storate? web.dev/learn/pwa/offline-data/)
- libs should be available and selectable
- installable pwa for android/iphone (no appstore/tools..)
- text and canvas output


- 2 main screens: repl/edit swipe left/right between them
- 1 browser screen for k and data files

- main screen (repl):

    portrait          landscape
  +--+----------+    +--------------------+
  |ic|input line|    |                    |
  +--+----------+    +--------------------+
  | output      |    |                    |
  | pre-element |    |                    |
  | or canvas   |    |                    |
  |             |    +--------------------+ 
  |             | 
  |             |    output-dimensions are known to k
  |             |    it produces output that fits
  +-------------+

  - on input, the input field changes to an interrupt button
    (k.wasm runs in a webworker and can be interrupted if it hangs)
  - ic is an icon of the current k version, click to change
  

- editor screen

    portrait          landscape
  +-+-------+---+    +--------------------+
  |s|filenam|run|    |                    |
  +-+-------+---+    | full screen        |
  | textarea    |    | textarea           |
  |             |    |                    |
  |             |    |                    |
  |             |    +--------------------+ 
  |             | 
  |             |
  |             |
  +-------------+
  
  - save button stores the file
  - click on filename switches to browser
  - click on run switches to the main screen
    - main screen shows: \l file.k  and the output
    - in case of an error, ideally the error position
      should be highlighted (selected?) when swiping
      back to the editor


- browser
  +-------------+    +--------------------+
  |[ ]a.k 14 m d|    |[ ] a.k 123 date del|
  +-------------+    +--------------------+
  |[x]c.k 12 m d|    |[x] c.k 123 date del|
  +-------------+    +--------------------+
  |[x]b.k 13 m d|    |[x] b.k 123 date del|
  +-------------+    +--------------------+
  |[x]dat 88 m d|
  +-------------+
  |             | 
  |             |  
  |             | 
  +-------------+

  - list or table with filename, size, modified, delete-button
  - click on the name to open the file in the editor
  - long click to rename
  - checkmarks which files are executed in the order they are listed
  - drag up down to rearrange? does that interfere with scroll?

  - data files (anything that doesn't end with .k)
    are preloaded when selected and assigned to a dict, e.g.
    fs:`dat1`dat2!(chars;chars..)
    otherwise using io/verbs is complicated with asynchronous apis
  - files can be created by k (io verbs for write)

  - how to get files in besides the initial bundle?
    - maybe load from fs?
  - how to get files out? trigger a download? share?
  - is it possible to start k/mobile on .k files that are downloaded?
    - register wpa as a file handler?

- canvas

  - it would be nice to be able to plot data or draw images
  - for img (pixels) a native function, e.g. image[(height;width)#ints] 
    could update the canvas, size should be known (assigned to variables)
    or queryable: wh:image[0]
  - vector drawing: e.g. a call to native function canvas[d] with a dict arg
    e.g. `fillStyle`fillRect!(`green;10 10 150 10)
    the native function (js) translates that to js args and updates the canvas
  - when image or canvas has been called, the output is changed to the
    canvas element
  - swipe left/right (or longclick?) to change between text and canvas output

- requirements on k
  - must have
    - init k.wasm
    - js creates and assign a global (fs dict)
    - js executes one or more input files in a row (as uint8array)
    - js executes a line as repl input (uint8array)
    - k calls a js func on output
  - nice to have
    - native js function support (for image/canvas), register on startup
    - when js executes a file which causes an error,
      it can can query the error position
      

