/*jslint node: true */
/*global _db, _ascoltatoreCloud, _logger, _config.file, _redis */
"use strict";

var util = require('util');
var fs = require('fs');
var yargs = require('yargs');
var debug = require('debug')('elarm:config.js');

/*
    Config is inherited by Server and inherits Logger. It does not require any
    special calls to initialize.

    Config inherits Logger for the purpose of logging configuration problems.
 */
function Config() {
    var that = this;

    // Try to read from a configuration file. If it fails, set a blank object.
    try {
        this.file = require(util.format('../config/%s.json',
            process.env.NODE_ENV || 'development'));
    } catch (e) {
        this.file = {};
    }

    // Check for /etc/host_ip and set some file vars if it is a docker instance
    if (this.isDockerInstance()) {
      this.setDockerVars();
    }

    // Setup yargs to parse command line options.
    this.args = yargs
        .usage('$0 [options]')
        .alias('h', 'help')
        .option('l', {
            alias: 'loglevel',
            describe: 'Manually set log level to arbitrary value.',
            default: 'warn'
        })
        .option('p', {
            alias: 'port',
            describe: 'Port for the server to listen on.'
        });

    // Parse command line options with the yargs instance set to `this.args`
    this.args = this.args.argv;

    // If we get the -h or --help options, run yargs.showHelp() and exit
    if (this.args.help) {
        yargs.showHelp();
        process.exit(0);
    }

    _logger.setLogLevel(this.args.loglevel)
}

Config.prototype.isDockerInstance = function() {
  if (fs.existsSync('/etc/host_ip')) {
    return true;
  }
  return false;
}

Config.prototype.setDockerVars = function() {
  var that = this;
  var dockerHost = fs.readFileSync('/etc/host_ip','utf-8').trim();
  debug("Docker Host: " + dockerHost);
  that.file.mqtt.host = dockerHost;
  that.file.database.mysql.host = dockerHost;
  that.file.database.redis.host = dockerHost;
  
}

module.exports = new Config();
