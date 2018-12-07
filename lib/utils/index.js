const { exec } = require('child_process'),
lib = require('../'),
config = require('../config'),
fs  = require('fs'),
baseCmd = 'stylus';

let buildCmd = [baseCmd, config.baseFile],
inc = config.baseInstall + config.baseDir,
dev = config.cloneInstall + config.baseDir;

exports.joinCmd = joinCmd = function (i){
  buildCmd.push(i)
  compile(buildCmd.join(' '));
}

function build(){

  if (config.main.compile.enable){
    //compile bootstrap.css
    joinCmd(config.main.compile.command)
  }
  if (config.main.compress.enable){
    //compile bootstrap.min.css
    joinCmd(config.main.compress.command)
  }
  if (config.main.compileSourceMaps.enable){
    //compile bootstrap.css with sounceMaps
    joinCmd(config.main.compileSourceMaps.command)
  }
  if (config.main.compressSourceMaps.enable){
    //compile bootstrap.min.css with sounceMaps
    joinCmd(config.main.compressSourceMaps.command)
  }
}

function copyFiles(){

  fs.readdir(inc + 'includes', (err, data) =>{
    data = data.filter(function(i){
      return i !== 'helpers';
    })
    data.forEach(function(i){
      fs.copyFile(inc + 'includes/' + i, dev + 'includes/' + i,(err) => {
        if (err) throw err;
      })
    })
    fs.readdir(inc + 'includes/helpers', (err,res) =>{
      res.forEach(function(i){
        fs.copyFile(inc + 'includes/helpers/' + i, dev + 'includes/helpers/' + i,(err) => {
          if (err) throw err;
        })
      })
    })
    fs.copyFile(inc + 'includes.styl', dev + 'includes.styl',(err) => {
      if (err) throw err;
    })
  })
}

function compile(i){
  exec(i, (err, stdout, stderr) => {
      if (err) {
          logIt('r','m','stylus:error', stderr);
      } else {
        logIt('g','c','stylus:success', stdout);
      }
  });
}

exports.b4s = function(){
  if(fs.existsSync(config.baseDest)){
    logIt('g', 'c', 'task:checkDir', config.baseDest + ' exists. starting compile task...');
    build();
  } else{
    logIt('b', 'm', 'task:checkDir', config.baseDest + ' does not exist. creating...');
    fs.mkdir('./dist', function(){
      build();
    })
  }
}

exports.logIt = logIt = function(a,b,c,d){
  console.log('\x1b[' + col(a) + 'm%s\x1b[0m' + '\x1b[' + col(b) + 'm%s\x1b[0m', '[' + c + ']: ', d);
}

function col(i){
  if (i == 'r'){
    //red
    return '31';
  }
  else if (i === 'g'){
    //green
    return '32';
  }
  else if (i === 'c'){
    //cyan
    return '36';
  }
  else if (i === 'm'){
    //magenta
    return '35';
  }
  else if (i === 'b'){
    //blue
    return '34';
  }
  else {
    console.error('color choice eror!')
  }
}

exports.watch = function(i){
  if (!i){
    i = config.options;
    logIt('b', 'm', 'task:watch', 'no options selected, loading default...');
  } else {
    logIt('g', 'm', 'task:watch', 'options detected, loading...');
  }
  let files = i.toWatch;
  files.forEach(function(item){
    fs.watch(item, (eventType, filename) => {
      if (i.compile){
        ifExists(config.main.compile.command)
      }
      if (i.compress){
        ifExists(config.main.compress.command)
      }
      if (i.compressSourceMaps){
        ifExists(config.main.compressSourceMaps.command)
      }
      if (i.compileSourceMaps){
        ifExists(config.main.compileSourceMaps.command)
      }
      logIt('g', 'c', 'task:watch', 'change detected in ' + filename + ', compiling...');
    });

  })
  logIt('g', 'c', 'task:watch', JSON.stringify(files,0,2));
}

exports.ifExists = ifExists = function(){
  if(fs.existsSync(config.baseDest)){
    logIt('g', 'c', 'task:checkDir', config.baseDest + ' exists. starting compile task...');
    joinCmd(config.main.compressSourceMaps.command)
  } else {
    logIt('b', 'm', 'task:checkDir', config.baseDest + ' does not exist. creating...');
    fs.mkdir(config.baseDest, function(){
      joinCmd(config.main.compressSourceMaps.command)
    })
  }
}

exports.createCopy = function(){
  fs.access(dev + 'includes/helpers', fs.constants.F_OK | fs.constants.W_OK, (err) => {
    if (err) {
      fs.mkdir(dev + 'includes/helpers', { recursive: true }, (err) => {
        if (err) throw err;
        copyFiles();
      });
    } else {
      copyFiles();
    }
  });
}
