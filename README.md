# bootstrap-4-stylus
stylus port of bootstrap.css v4.0.0-beta

### Installation

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

```sh
$ node index.js
```

will by default compile:

````
./dist/bootstrap.css
./dist/bootstrap.css.map
./dist/bootstrap.min.css
./dist/bootstrap.min.css.map
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


* The default watch and compile options can be configured in:

````
/lib/config/index.json
````

### default stylus command
open a console and type:
```sh
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
