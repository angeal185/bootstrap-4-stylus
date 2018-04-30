//example: require as module
const b4s = require('bootstrap-4-stylus');

// list of files/folders to watch
var toWatch = [
  "./node_modules/bootstrap-4-stylus/bootstrap.styl",
  "./node_modules/bootstrap-4-stylus/index.styl",
  "./node_modules/bootstrap-4-stylus/includes"
]

// start livewatch and compile to ./dist folder on change
b4s.watch(toWatch,'./dist');


// compile bootstrap.css into ./dist folder
b4s.compile('./dist')

// compile bootstrap.min.css into ./dist folder
b4s.compress('./dist')

// compile bootstrap.css.map into ./dist folder
b4s.compileSourceMaps('./dist')

// compile bootstrap.min.css.map into ./dist folder
b4s.compressSourceMaps('./dist')
