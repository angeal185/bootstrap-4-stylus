const b4s = require('./lib'),
config = require('./lib/config');

// list of files/folders to watch
var options = {
  compile:true,
  compress:true,
  compileSourceMaps:false,
  compressSourceMaps:false,
  toWatch: [
    "./bootstrap.styl",
    "./includes",
    "./includes.styl",
    "./includes/helpers"
  ],
  js:{ // requires internet connection
    "bootstrap": true, //get bootstrap.js
    "bootstrapMin": false, //get bootstrap.min.js
    "bootstrapMap": false, //get bootstrap.js.map
    "bootstrapMinMap": false //get bootstrap.min.js.map
  },
  backup: [
    './bootstrap.styl',
    './includes',
    './includes.styl'
  ]
}


/* start livewatch and compile to ./dist folder on change */
 //b4s.watch(options);

/* default task. will compile bootstrap.css && bootstrap.min.css into ./dist folder */
 //b4s.init()

/* compile bootstrap.css into ./dist folder */
 //b4s.compile()

/* compile bootstrap.min.css into ./dist folder */
// b4s.compress()

/* compile bootstrap.css.map into ./dist folder */
// b4s.compileSourceMaps()

/* compile bootstrap.min.css.map into ./dist folder */
// b4s.compressSourceMaps()

/* download bootstrap js files into ./dist/js folder */
 //b4s.getJs(options.js)

/* check for updates */
 //b4s.versionCheck()

 /* backup for windows users ~ .zip */
 //b4s.backupWin(options.backup);

 /* backup for linux/ windows with tar installed ~ .tar.gz */
 //b4s.backupLin(options.backup);
