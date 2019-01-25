const b4s = require('bootstrap-4-stylus');

// list of files/folders to watch
var options = {
  compile:true, // options on detect change
  compress:true,
  compileSourceMaps:false,
  compressSourceMaps:false,
  toWatch: [ // list of files/folders to watch
    "./bootstrap.styl",
    "./dev/bootstrap-4-stylus/includes",
    "./dev/bootstrap-4-stylus/includes.styl",
    "./dev/bootstrap-4-stylus/includes/helpers"
  ],
  js:{ // requires internet connection
    "bootstrap": true, //get bootstrap.js
    "bootstrapMin": false, //get bootstrap.min.js
    "bootstrapMap": false, //get bootstrap.js.map
    "bootstrapMinMap": false //get bootstrap.min.js.map
  },
  backup: [ // files/dirs for backup
    "./bootstrap.styl",
    "./dev/bootstrap-4-stylus"
  ]
}


/* start livewatch and compile to ./dist folder on change */
 b4s.watch(options);

/* default task. will compile bootstrap.css && bootstrap.min.css into ./dist folder */
// b4s.init()

/* compile bootstrap.css into ./dist folder */
// b4s.compile()

/* compile bootstrap.min.css into ./dist folder */
// b4s.compress()

/* compile bootstrap.css.map into ./dist folder */
// b4s.compileSourceMaps()

/* compile bootstrap.min.css.map into ./dist folder */
// b4s.compressSourceMaps()

/* download bootstrap js files into ./dist/js folder */
// b4s.getJs(options.js)

/* check for updates */
// b4s.versionCheck()

/* build bootstrap4-stylus for use in cwd
true = clone a copy into your cwd and automatically update rout strings.
 ~ note: This will write over any existing files! */
 //b4s.build(true);

 /* backup for windows users ~ .zip */
 //b4s.backupWin(options.backup);

 /* backup for linux/ windows with tar installed ~ .tar.gz */
 //b4s.backupLin(options.backup);
