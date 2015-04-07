"use strict"

console.log(_redis)

exports.dashboard = function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
}