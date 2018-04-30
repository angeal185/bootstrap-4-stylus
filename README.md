# bootstrap-4-stylus
stylus port of bootstrap.css v4

### Installation

Ensure stylus is installed globally

```sh
$ npm install stylus -g
```

bower:
```sh
$ bower install bootstrap-4-stylus --save-dev
```

npm:
```sh
$ npm install bootstrap-4-stylus --save-dev
```

### info
A complete, fully functional and unaltered convert of bootstrap.css to stylus.  
No learning curve and no repeats. build it how you want it or just use it as an easy way to exclude unused css.

### Instructions
bootstrap.css has been converted, broken down into smaller .styl includes and the include files are named accordingly.

Build variables can be edited via the `index.styl` file.  

comment out or remove unwanted includes in the `bootstrap.styl` file then compile in one of the following ways..


### nodejs

#### compile

```sh
$ node index.js
```

will by default compile:

````
./dist/bootstrap.css
./dist/bootstrap.min.css
````

#### live watch

```sh
$ node watch.js
```

will by default start watching

````
"./bootstrap.styl",
"./index.styl",
"./includes"
````
for changes and compile to the `./dist` folder when a change is detected.


* The default watch and compile options can be configured in `/lib/config/index.json`


```json
{
  "main":{
    "compile":{
      "enable":true,
      "command":"stylus bootstrap.styl -o ./dist"
    },
    "toWatch":[
      "./bootstrap.styl",
      "./index.styl",
      "./includes"
    ]
  }
}
```

### require it as a module

bootstrap-4-stylus can be used in the following way when required as a module

```js
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

```
* The default module options can be configured in `/lib/config/index.json`

```json
{
  "required":{
    "compile":{
      "command":"stylus node_modules/bootstrap-4-stylus/bootstrap.styl -o "
    }
  }
}
```

* An example can be found in `./example/index.js`


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
