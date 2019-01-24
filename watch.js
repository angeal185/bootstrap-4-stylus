const lib = require('./lib'),
config = require('./lib/config');

lib.watch(config.options.toWatch);
