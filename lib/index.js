const utils = require('./utils'),
fs  = require('fs'),
path  = require('path'),
config = require('./config');

exports.compile = function(){
  utils.ifExists(config.main.compile.command)
}

exports.backupWin = function(i){
  utils.backupWin(i)
}

exports.backupLin = function(i){
  utils.backupLin(i)
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

exports.watch = function(i){
  utils.watch(i);
}

exports.versionCheck = function(){
  utils.versionCheck()
}

exports.backup = function(){
  var zipfile = new zip.ZipFile();
  zipfile.addFile("bower.json", "bower.json");
  // pipe() can be called any time after the constructor
  zipfile.outputStream.pipe(fs.createWriteStream("./test.zip")).on("close", function() {
    console.log("done");

  });

}

const build = exports.build = function(i){
  var strReplaced;
  if (i) {
    strReplaced = config.cloneInstall;
    utils.createCopy();
  } else {
    strReplaced = config.baseInstall;
  }

  fs.copyFile(config.baseInstall + config.baseDir + config.baseFile, './' + config.baseFile, (err) => {
    if (err) {
      utils.logIt('r','m','task:create', 'unable to create '+ config.baseFile +',  check your file permissions.');
      return
    }
    utils.logIt('g','m','task:success', config.baseFile + ' created in working dir');
    fs.readFile('./' + config.baseFile, 'utf8', (err, data) => {
      var str2replace = './'
      var result = data.replace(str2replace, strReplaced + config.baseDir);
      utils.logIt('g','m','task:success', config.baseFile + ' found. updating...')
      fs.writeFile('./' + config.baseFile, result, (err) => {
        if (err) {
          utils.logIt('r','m','task:create', 'unable to update '+ config.baseFile +',  check your file permissions.');
          return
        }
        utils.logIt('g','m','task:success', config.baseFile + ' updated. creating bs4.js...');
        fs.copyFile(config.baseInstall + config.baseDir + 'example/bs4.js', './bs4.js', (err) => {
          if (err) throw err;
          if (i) {
            utils.logIt('g','m','task:success', 'configuring bs4.js...');
            fs.readFile('./bs4.js', 'utf8', (err, dat) => {
              if (err) throw err;
              dat = dat.replace(/node_modules/g, config.cloneInstall.slice(2,-1));
              fs.writeFile('./bs4.js', dat, (err) => {
                if (err) {
                  utils.logIt('r','m','task:create', 'unable to create bs4.js,  check your file permissions.');
                  return
                }
                utils.logIt('g','m','task:success', 'bs4.js created. done!');
                return;
              })
            })
          } else {
            utils.logIt('g','m','task:success', 'bs4.js created. done!');
          }
        });
      });
    });
  });

}
