"use strict"

exports.dashboard = function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
}