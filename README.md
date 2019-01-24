# bootstrap-4-stylus
stylus port of bootstrap.css v4

### Installation

Ensure stylus is installed globally

```sh
$ npm install stylus -g
```

### info
A complete, fully functional and unaltered convert of bootstrap.css to stylus.  
No learning curve and no repeats. build it how you want it or just use it as an easy way to exclude unused css.
bootstrap.css has been converted, broken down into smaller `.styl` includes and the include files are named accordingly. within these include files are smaller sub-includes that can also be excluded.

## npm
```sh
$ npm install bootstrap-4-stylus --save-dev
```
bootstrap-4-stylus can be used in the following ways when required as a module

#### build bootstrap-4-stylus

```javascript
/* ./index.js */
const b4s = require('bootstrap-4-stylus');

b4s.build(true);

//build bootstrap4-stylus for use in cwd
//true = clone a copy into your cwd and automatically update rout strings.
//false = for use of the `./node_modules/bootstrap-4-stylus` module directly
// ~ note: This will write over any existing files.


````

if you chose `true` your setup will be:

```bash
├─bootstrap.styl
├─bs4.js
├───dev
│   └───bootstrap-4-stylus
│       └───includes.styl
│       └───includes/*.styl
│           └───helpers/*.styl
├───dist

```

* `./bs4.js` contains a complete list of build functions.
* Build variables can be edited via the `./bootstrap.styl` file.  
* include options can be edited in the in the `./dev/bootstrap-4-stylus/includes.styl` file as booleans ~ true/false.
* include files are located at `./dev/bootstrap-4-stylus/includes/**/*.styl`
*  `./dist` is where your compiled bootstrap files will be saved
*  your baseDir within your files will automatically be updated to `./dev/bootstrap-4-stylus/`


if you chose `false` your setup will be:
```bash
├─bootstrap.styl
├─bs4.js
├───dist

```
*  your baseDir within your files will remain as `./node_modules/bootstrap-4-stylus/`

#### API
```js
// ./bs4.js

const b4s = require('bootstrap-4-stylus');
// build options
var options = {
    // watch options
  compile:true, //compile bootstrap.css on change
  compress:true, //compile bootstrap.min.css on change
  compileSourceMaps:false, //compile bootstrap.css.map on change
  compressSourceMaps:false, //compile bootstrap.min.css.map on change
    // files/folders to watch
  toWatch: [
    "./bootstrap.styl",
    "./dev/bootstrap-4-stylus/includes",
    "./dev/bootstrap-4-stylus/includes.styl",
    "./dev/bootstrap-4-stylus/includes/helpers"
  ],
    //bootstrap.js options ~ saved to ./dist/js
  js:{ // requires internet connection
    "bootstrap": true, //get bootstrap.js and verify hash
    "bootstrapMin": false, //get bootstrap.min.js and verify hash
    "bootstrapMap": false, //get bootstrap.js.map and verify hash
    "bootstrapMinMap": false //get bootstrap.min.js.map and verify hash
  }
}


// start livewatch and compile to ./dist folder on change
b4s.watch(options);

/* default task. will compile bootstrap.css && bootstrap.min.css into ./dist folder
   this can be configured in /lib/config/index.json under "main" */
b4s.init()

// compile bootstrap.css into ./dist folder
b4s.compile()

// compile bootstrap.min.css into ./dist folder
b4s.compress()

// compile bootstrap.css.map into ./dist folder
b4s.compileSourceMaps()

// compile bootstrap.min.css.map into ./dist folder
b4s.compressSourceMaps()

// download bootstrap js files into ./dist/js folder
b4s.getJs(options.js)

// build bootstrap4-stylus for use in cwd
// ~ note: This will write over any existing files, probably best to remove this.
b4s.build(true);

// check for updates
b4s.versionCheck()

```

#### gulp API
`v4`
```sh
$ npm install gulp --save-dev
```
all of the functions included in the `./bs4.js` file can be called using gulp like so:
```js
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
  }
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

function watch(done) {
  return b4s.watch(options)
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
exports.watch = watch;
exports.default = watch
```
* An example gulpfile.js can be found at `/examples/gulpfile.js`



#### bower/git

```sh
$ bower install bootstrap-4-stylus --save-dev
```

```sh
$  git clone git://github.com/angeal185/bootstrap-4-stylus.git
```


your setup will be:

```bash
├─bootstrap.styl
├─bincludes.styl
├─index.js
├─watch.js
├───cmd
├───dist
├───includes
    └───helpers


```

```sh
$ node index.js
```

will by default compile:

```json
[
    "./dist/bootstrap.css",
    "./dist/bootstrap.min.css"
]
````

#### live watch

```sh
$ node watch.js
```

will by default start watching

````json
[
  "./bootstrap.styl",
  "./includes.styl",
  "./includes",
  "./includes/helpers"
]
````
for changes and compile to the `./dist` folder when a change is detected.

* as with the npm users, you also have access to all the other functions and gulp usage. examples can be found in the `./examples` folder.
* The default watch and compile options can be configured in `/lib/config/index.json`


```json
{
  "main":{
    "compile":{
      "enable":true,
      "command":"-o ./dist"
    },
    "compress":{
      "enable":true,
      "command":"-c -o ./dist/bootstrap.min.css"
    },
    "compileSourceMaps":{
      "enable":false,
      "command":"-m -o ./dist"
    },
    "compressSourceMaps":{
      "enable":false,
      "command":"-c -m -o ./dist/bootstrap.min.css"
    }
  },
  "options":{
    "compile":true,
    "compress":true,
    "compileSourceMaps":false,
    "compressSourceMaps":false,
    "toWatch":[
      "./bootstrap.styl",
      "./includes.styl",
      "./includes",
      "./includes/helpers"
    ]
  }
}
```

### default stylus command
open a console and type:
```js
// compile bootstrap.css to ./dist folder
$ stylus bootstrap.styl -o ./dist

// compile and compress bootstrap.min.css to ./dist folder
$ stylus bootstrap.styl -c -o ./dist/bootstrap.min.css

// compile bootstrap.css to ./dist folder with sourceMap
$ stylus bootstrap.styl -m -o ./dist

// compile and compress bootstrap.min.css to ./dist folder with sourceMap
$ stylus bootstrap.styl -c -m -o ./dist/bootstrap.min.css

```

### windows users
Navigate to: the `./cmd` folder and simply double click the `.cmd` file to compile to the `./dist` folder


done.
