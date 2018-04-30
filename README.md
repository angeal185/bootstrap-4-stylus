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

This can be configured in:

````
/lib/config/index.json

````


```sh
stylus bootstrap.styl
```





done.
