const utils = require('./utils'),
fs  = require('fs'),
path  = require('path'),
config = require('./config');

exports.compile = function(){
  utils.ifExists(config.main.compile.command)
}

exports.compress = function(){
  utils.ifExists(config.main.compress.command)
}

exports.getJs = function(i){
  if(i.bootstrap){
    utils.getfile(
      config.get.js.bootstrap.url, config.get.js.bootstrap.checksum, 'bootstrap.js', config.get.js.dest
    )
  }
  if(i.bootstrapMap){
    utils.getfile(
      config.get.js.bootstrapMap.url, config.get.js.bootstrapMap.checksum, 'bootstrap.js.map', config.get.js.dest
    )
  }
  if(i.bootstrapMin){
    utils.getfile(
      config.get.js.bootstrapMin.url, config.get.js.bootstrapMin.checksum, 'bootstrap.min.js', config.get.js.dest
    )
  }
  if(i.bootstrapMinMap){
    utils.getfile(
      config.get.js.bootstrapMinMap.url, config.get.js.bootstrapMinMap.checksum, 'bootstrap.min.js.map', config.get.js.dest
    )
  }
}

exports.compileSourceMaps = function(){
  utils.ifExists(config.main.compileSourceMaps.command)
}

exports.compressSourceMaps = function(i){
  utils.ifExists(config.main.compressSourceMaps.command)
}

exports.init = function(){
  utils.b4s();
}

exports.watchMain = function(i){
  logIt('b', 'm', 'task:watch', 'loading default watch...');
  i.forEach(function(item){
    fs.watch(item, (eventType, filename) => {
      utils.b4s();
      utils.logIt('g', 'c', 'task:watch', 'change detected in ' + filename + ', compiling...');
    });
  })
  logIt('g', 'c', 'task:watch', JSON.stringify(i,0,2));
}

exports.watch = function(i){
  utils.watch(i);
}

exports.build = function(i){
  var strReplaced;
  if (i) {
    strReplaced = config.cloneInstall;
    utils.createCopy();
  } else {
    strReplaced = config.baseInstall;
  }

  fs.copyFile(config.baseInstall + config.baseDir + config.baseFile, './' + config.baseFile, (err) => {
    if (err) throw err;
    utils.logIt('g','m','task:success', 'config file created in working dir');
    fs.readFile('./' + config.baseFile, 'utf8', (err, data) => {
      var str2replace = '@import "includes"'
      var result = data.replace(str2replace, '@import "' + strReplaced + config.baseDir + 'includes"');
      utils.logIt('g','m','task:success', config.baseFile + ' found. updating...')
      fs.writeFile('./' + config.baseFile, result, (err) => {
        if (err) throw err;
        utils.logIt('g','m','task:success', config.baseFile + ' updated. creating bs4.js...');
        fs.copyFile(config.baseInstall + config.baseDir + 'example/bs4.js', './bs4.js', (err) => {
          if (err) throw err;
          if (i) {
            utils.logIt('g','m','task:success', ' configuring bs4.js...');
            fs.readFile('./bs4.js', 'utf8', (err, dat) => {
              if (err) throw err;
              dat = dat.replace(/node_modules/g, config.cloneInstall.slice(2,-1));
              fs.writeFile('./bs4.js', dat, (err) => {
                if (err) throw err;
                utils.logIt('g','m','task:success', ' bs4.js created. done!');
                return;
              })
            })
          }
          utils.logIt('g','m','task:success', ' bs4.js created. done!');
          return;
        });
      });
    });
  });

}
