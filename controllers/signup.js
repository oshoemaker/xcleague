"use strict"

var async = require('async');
var bcrypt = require('bcryptjs');
var models = require("../models");
var HttpHelpers = require('../lib/httphelpers');
var debug = require('debug')('xcleague:signup.js');

exports.signup = function(req, res, next) {
  HttpHelpers.respond(req, res, 'signup', { title: 'Signup', signup: true });
}

exports.signupPost = function(req, res, next) {
  var that = this;
  var viewTemplate = 'signup';
  var pass = req.body.password;
  var vPass = req.body.verifyPassword;
  var errors = [];
  
  delete req.body.password;
  delete req.body.verifyPassword;
  
  if (!pass) {
    errors.push('Password is required');
  }
  
  if (pass !== vPass) {
    errors.push('Passwords must match');
  }
  
  if (!req.body.email) {
    errors.push('Email address is required');
  }
  
  if (!req.body.first) {
    errors.push('First name is required');
  }
  
  if (!req.body.last) {
    errors.push('Last name is required');
  }
  
  if (errors.length > 0) {
    debug('Found errors...');
    HttpHelpers.respondError(req, res, viewTemplate, { errors: errors });
    return;
  }

  var userObj = req.body;
  
  userObj.salt = bcrypt.genSaltSync(10);
  userObj.hash = bcrypt.hashSync(pass, userObj.salt);

  debug("User object created: ");
  debug(userObj);
  
  async.waterfall([
    function(callback) {
      models.User
        .find({ 
          where: { email: userObj.email } 
        })
        .complete(function(err, user) {
          if (err) {
            return callback(err);
          }
          
          if (user) {
            return callback('User already exists');
          }
          
          callback();
        })
    },
    
    function(callback) {
      var user = models.User.build(userObj);
      user
        .save()
        .complete(function(err, newUser) {
          if (err) {
            return callback(err);
          }

          if (!newUser) {
            return callback("Couldn't create a new user");
          }
          
          that.user = newUser;
          callback()
        });
    }
    
  ], function(err) {
    
    if (err) {
      _logger.crit(err);
      return HttpHelpers.respondError(req, res, viewTemplate, {errors: [err]});
    }
  
    HttpHelpers.respond(req, res, viewTemplate, { success: true});
    
  });
}