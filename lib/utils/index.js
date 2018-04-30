const { exec } = require('child_process'),
lib = require('../'),
config = require('../config'),
fs  = require('fs');

function compile(i){
  exec(i, (err, stdout, stderr) => {
      if (err) {
          console.log('[stylus:error]:' + stderr);
      } else {
        console.log('[stylus:success]:' + stdout);
      }
  });
}

exports.compile = function(i){
  compile(i)
}

exports.watch = function(i,e){
  i.forEach(function(item){
    fs.watch(item, (eventType, filename) => {
      if (config.required.toWatch.compile){
        lib.compile(e);
      }
      if (config.required.toWatch.compress){
        lib.compress(e);
      }
      if (config.required.toWatch.compressSourceMaps){
        lib.compressSourceMaps(e);
      }
      if (config.required.toWatch.compileSourceMaps){
        lib.compileSourceMaps(e);
      }
      console.log(filename + 'change detected. compiling...');
    });
  })
}
