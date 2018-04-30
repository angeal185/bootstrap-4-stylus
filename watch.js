const lib = require('./lib'),
config = require('./lib/config');

lib.watchMain(config.main.toWatch);
