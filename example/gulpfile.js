const gulp = require('gulp'),
b4s = require('bootstrap-4-stylus'),
options = {
  compile:true,
  compress:true,
  compileSourceMaps:false,
  compressSourceMaps:false,
  toWatch: [
    "./bootstrap.styl",
    "./dev/bootstrap-4-stylus/includes",
    "./dev/bootstrap-4-stylus/includes.styl",
    "./dev/bootstrap-4-stylus/includes/helpers"
  ],
  js:{
    "bootstrap": true,
    "bootstrapMin": true,
    "bootstrapMap": true,
    "bootstrapMinMap": true
  },
  backup: [ // files/dirs for backup
    "./bootstrap.styl",
    "./dev/bootstrap-4-stylus"
  ]
};


function bs4Init(done) {
  b4s.init()
  done()
}

function bs4Compile(done) {
  b4s.compile()
  done()
}

function bs4Compress(done) {
  b4s.compress()
  done()
}

function bs4CompileSourceMaps(done) {
  b4s.compileSourceMaps()
  done()
}

function bs4CompressSourceMaps(done) {
  b4s.compressSourceMaps()
  done()
}
function bs4GetJs(done) {
  b4s.getJs(options.js)
  done()
}

function bs4VersionCheck(done) {
  b4s.versionCheck()
  done()
}

function bs4Build(done) {
  b4s.build(true)
  done()
}

function bs4Watch(done) {
  b4s.watch(options)
  done()
}

function bs4BackupLin(done) {
  b4s.backupLin(options.backup)
  done()
}

function bs4BackupLin(done) {
  b4s.backupWin(options.backup)
  done()
}


exports.bs4Init = bs4Init;
exports.bs4Compile = bs4Compile;
exports.bs4Compress = bs4Compress;
exports.bs4CompileSourceMaps = bs4CompileSourceMaps;
exports.bs4CompressSourceMaps = bs4CompressSourceMaps;
exports.bs4GetJs = bs4GetJs;
exports.bs4VersionCheck = bs4VersionCheck;
exports.bs4Build = bs4Build;
exports.bs4Watch = bs4Watch;
exports.bs4BackupLin = bs4BackupLin;
exports.bs4backupWin = bs4BackupWin;
exports.default = bs4Watch
