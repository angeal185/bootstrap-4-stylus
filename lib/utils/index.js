const { exec } = require('child_process'),
lib = require('../'),
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
      lib.compile(e);
      lib.compress(e);
      lib.compressSourceMaps(e);
      lib.compileSourceMaps(e);
      console.log(filename + 'change detected. compiling...');
    });
  })
}
