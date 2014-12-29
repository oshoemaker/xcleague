"use strict"

exports.signup = function(req, res, next) {
  res.render('signup', { title: 'Express' });
}