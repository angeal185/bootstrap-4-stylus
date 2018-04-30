const utils = require('./utils'),
fs  = require('fs'),
config = require('./config');

function build(){
  if (config.main.compile.enable){
    //compile bootstrap.css
    utils.compile(config.main.compile.command);
  }
  if (config.main.compress.enable){
    //compile bootstrap.min.css
    utils.compile(config.main.compress.command)
  }
  if (config.main.compileSourceMaps.enable){
    //compile bootstrap.css with sounceMaps
    utils.compile(config.main.compileSourceMaps.command)
  }
  if (config.main.compressSourceMaps.enable){
    //compile bootstrap.min.css with sounceMaps
    utils.compile(config.main.compressSourceMaps.command)
  }
}

function b4s(){
  if(fs.existsSync('./dist')){
    console.log('./dist exist.');
    build();
  } else{
    console.log('./dist does not exist. creating...');
    fs.mkdir('./dist', function(){
      build();
    })
  }
}

exports.compile = function compile(i){
  if(fs.existsSync(i)){
    console.log(i + ' exists.');
    utils.compile(config.required.compile.command + i);
  } else {
    console.log(i + ' does not exist. creating...');
    fs.mkdir(i, function(){
      utils.compile(config.required.compile.command + i);
    })
  }
}

exports.compress = function(i){
  if(fs.existsSync(i)){
    console.log(i + ' exists.');
    utils.compile(config.required.compress.command + i + '/bootstrap.min.css')
  } else {
    console.log(i + ' does not exist. creating...');
    fs.mkdir(i, function(){
      utils.compile(config.required.compress.command + i + '/bootstrap.min.css')
    })
  }
}

exports.compileSourceMaps = function(i){
  if(fs.existsSync(i)){
    console.log(i + ' exists.');
    utils.compile(config.required.compileSourceMaps.command + i)
  } else {
    console.log(i + ' does not exist. creating...');
    fs.mkdir(i, function(){
      utils.compile(config.required.compileSourceMaps.command + i)
    })
  }
}

exports.compressSourceMaps = function(i){
  if(fs.existsSync(i)){
    console.log(i + ' exists.');
    utils.compile(config.required.compressSourceMaps.command + i + '/bootstrap.min.css')
  } else {
    console.log(i + ' does not exist. creating...');
    fs.mkdir(i, function(){
      utils.compile(config.required.compressSourceMaps.command + i + '/bootstrap.min.css')
    })
  }
}

exports.init = function(){
  b4s();
}

exports.watchMain = function(i){
  i.forEach(function(item){
    fs.watch(item, (eventType, filename) => {
      b4s();
      console.log(filename + 'change detected. compiling...');
    });
  })
}

exports.watch = function(i,e){
  utils.watch(i,e);
}
