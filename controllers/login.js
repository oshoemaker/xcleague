"use strict"

var models = require("../models");

exports.login = function(req, res, next) {
 res.render('login', { title: 'Express' }); 
}