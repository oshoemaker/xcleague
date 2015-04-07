"use strict"

var async = require('async');
var bcrypt = require('bcryptjs');
var RememberMe = require('redis-rememberme');
var jwt = require('jsonwebtoken');
var models = require("../models");
var HttpHelpers = require('../lib/httphelpers');
var debug = require('debug')('xcleague:login.js');

var jwtSecret = _config.jwtSecret;

exports.loginGet = function(req, res, next) {
  var viewTemplate = 'login';
  HttpHelpers.respond(req, res, viewTemplate, { title: 'Login', login: true });
}

exports.loginPost = function(req, res, next) {
  var that = this;
  var viewTemplate = 'login';
  var pass = req.body.pass;
 
  // Remove sensitive fields from response
  delete req.body.pass;
  
  async.waterfall([
    
    // Find the user in the DB
    function(callback) {
      debug('Attempting to find user')
      models.User
        .find({
          where: { email: req.body.email }
        })
        .complete(function(err, user){
          if (err) {
            return callback('There was an error finding user: ' + err);
          }
        
          if (!user) {
            return callback('Invalid username or password');
          }
          
          that.user = user;
          debug('User found');
          callback();
        });
    },
    
    // Generate the password hash
    function(callback) {
      debug('Generating hash for the password');
      bcrypt.hash(pass, that.user.salt, function (err, hash) {
        if (err) {
          return callback(err);
        }
        
        that.hash = hash;
        callback();
      });
    },
    
    // Verify password
    function(callback) {
      debug('Checking to make sure the hashes match');
      if (that.hash !== that.user.password) {
        debug('Passwords did not match');
        return callback('Invalid username or password');
      }
      
      debug('Passwords matched');
      callback();
    }
    
  ],function(err) {
    if (err) {
      return HttpHelpers.respondError(req, res, viewTemplate, { errors: [err] });
    }
    
    // Check if remember me was enabled
    if (req.body.rememberMe && req.body.rememberMe === 'on') {
      debug('Enabling remember me');
      res.rememberme = {userid: that.user.id};
    }
    
    // Create profile object
    var profile = that.user;
    
    // Create the json webtoken
    var token = jwt.sign(profile, jwtSecret, { expiresInMinutes: 60*5 });
    
    HttpHelpers.respond(req, res, viewTemplate, { 
      title: 'Login', 
      login: true, 
      success: true, 
      token: token 
    });
    
  });
}

function generateToken(profile) {
  var token = jwt.sign(profile, jwtSecret, { expiresInMinutes: 60*5 });
}