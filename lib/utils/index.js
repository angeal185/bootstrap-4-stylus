const {exec,spawn} = require('child_process'),
config = require('../config'),
fs  = require('fs'),
path  = require('path'),
http  = require('http'),
crypto = require('crypto'),
baseCmd = 'stylus';

let buildCmd = [baseCmd, config.baseFile],
inc = config.baseInstall + config.baseDir,
dev = config.cloneInstall + config.baseDir;

exports.joinCmd = joinCmd = function (i){
  buildCmd.push(i)
  compile(buildCmd.join(' '));
}

function checksum(str) {
  return crypto
    .createHash('sha256')
    .update(str, 'utf8')
    .digest('base64')
}

function writeLog(url, text, task, note){
  fs.writeFile(url, text, function (err) {
    if (err) throw err;
    logIt('g', 'c', 'task:' + task, note);
  });
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

exports.ifExists = ifExists = function(i){
  if(fs.existsSync(config.baseDest)){
    logIt('g', 'c', 'task:checkDir', config.baseDest + ' exists. starting compile task...');
    joinCmd(i)
  } else {
    logIt('b', 'm', 'task:checkDir', config.baseDest + ' does not exist. creating...');
    fs.mkdir(config.baseDest, function(){
      joinCmd(i)
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

exports.getfile = function(url, cs, fileName, dest){
  http.get('http://' + url, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    }
    if (error) {
      console.error(error.message);
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        if (checksum(rawData) !== cs){
          logIt('r', 'm', 'task:checksum', ' checksum check failed! exiting.');
          return;
        }
        logIt('g', 'm', 'task:checksum', ' checksum ok. saving files...');
        fs.access(config.get.js.dest, fs.constants.F_OK | fs.constants.W_OK, (err) => {
          if (err) {
            logIt('b', 'm', 'task:checkDir', config.get.js.dest + ' does not exist. creating...');
            fs.mkdir(config.get.js.dest, { recursive: true }, (err) => {
              if (err) throw err;
              writeLog(config.get.js.dest + fileName, rawData, 'get', config.get.js.dest + fileName + ' save success!')
            });
          } else {
            writeLog(config.get.js.dest + fileName, rawData, 'get', config.get.js.dest + fileName + ' save success!')
          }
        });
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

exports.versionCheck = function(){
  let i = "npm view bootstrap-4-stylus version"
  logIt('c','m','task:version', 'initiating version check...');
  exec(i, (err, stdout, stderr) => {
      if (err) {
          logIt('r','m','stylus:error', stderr);
      } else {

        response = parseFloat(stdout.slice(2));
        challenge = parseFloat(config.version.slice(2));
        console.log(response)
        console.log(challenge)
        if (challenge < response) {
          logIt('r','c','task:version', 'update available from v'+ config.version + ' to v'+ stdout );
          return
        }
        logIt('g','m','task:version', 'current v'+ config.version +' up to date!');
      }
  });
}

exports.backupLin = function(i){
  let arr = [];

  i.forEach(function(item){
    arr.push(item.replace(/\\/g, '/'))
  })
  console.log('tar cvzf backup.tar.gz ' + arr.toString().replace(/,/g, ' '))
  exec('tar cvzf backup.tar.gz ' + arr.toString().replace(/,/g, ' '), (err, stdout, stderr) => {
      if (err) {
          logIt('r','m','backup:error', stderr);
      } else {
        logIt('g','c','backup:success', stdout);
      }
  });

}

exports.backupWin = function(i){
  let pathCheck = fs.existsSync('./bin/zip.bat'),
  arr = [],
  pathTo;
  if(pathCheck){
    pathTo = './bin';
  } else {
    pathTo = path.join(config.baseInstall, config.baseDir,'bin');
  }

  const defaults = {
    cwd: pathTo
  };

  i.forEach(function(item){
    arr.push(
      path.join(
        process.cwd() + item
      )
        .replace(/\\/g, '/')
        .replace('./', '/')
      )
  })
  console.log(arr);


  let ls = spawn(
    'zip.bat', [ arr, '-o', process.cwd() + '/backup.zip'],
    defaults
  );

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

}
