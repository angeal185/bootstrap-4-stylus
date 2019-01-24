const b4s = require('bootstrap-4-stylus');

// list of files/folders to watch
var options = {
  compile:true,
  compress:true,
  compileSourceMaps:false,
  compressSourceMaps:false,
  toWatch: [
    "./bootstrap.styl",
    "./node_modules/bootstrap-4-stylus/includes",
    "./node_modules/bootstrap-4-stylus/includes.styl",
    "./node_modules/bootstrap-4-stylus/includes/helpers"
  ],
  js:{ // requires internet connection
    "bootstrap": true, //get bootstrap.js
    "bootstrapMin": false, //get bootstrap.min.js
    "bootstrapMap": false, //get bootstrap.js.map
    "bootstrapMinMap": false //get bootstrap.min.js.map
  }
}


/* start livewatch and compile to ./dist folder on change */
// b4s.watch(options);

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
 // b4s.build(true);
