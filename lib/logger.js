/*jslint node: true */
/*global _db, _ascoltatoreCloud, _logger, _config.file, _redis */
"use strict";

var winston = require('winston');
var util = require('util');
var debug = require('debug')('logger.js')

function Logger(level) {
    var self = this;

    this.colors = {
        trace : 'white',
        debug : 'green',
        info : 'green',
        warn : 'yellow',
        crit : 'red',
        fatal : 'red'
    };

    this.levels = {
        trace: 0,
        debug: 1,
        info: 2,
        warn: 3,
        crit: 4,
        fatal: 5
    };


    // Part of the winston.Logger inheritance
    winston.Logger.call(this, {
        colors: self.colors,
        levels: self.levels,
        transports: [
            new (winston.transports.Console) ({
              
                level: level || 'warn',
                colorize: true,
                timestamp: true
            })
        ]
    });

    // Override `this.log` to provide the stack on errors.
    this.log = (function(orig) {
        return function (level, msg) {
            if (msg instanceof Error) {
                return orig.call(self, level, msg.stack);
            }

            orig.call(self, level, msg);
        };
    })(this.log);
}

// Inherits winston.Logger on Logger
util.inherits(Logger, winston.Logger);

// Used to set the log level without having to create a new Logger
Logger.prototype.setLogLevel = function (level) {
    var self = this;
    // Run through each transport name and set the level on that transport.
    this._names.forEach(function (name) {
        self.transports[name].level = level;
    });
    return this;
};

module.exports = new Logger();
