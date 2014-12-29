"use strict"
var debug = require('debug')('xcleague:sites.js');

exports.site = function(req, res, next) {
  var date = new Date();
  
  if (req.params.site) {
    var site = req.params.site.replace(/.html/, '');
    var responseObj = {
      loadMaps: true,
      month: date.getMonth() + 1,
      day: date.getDate(),
      year: date.getFullYear()
    }
    responseObj[site] = true;
    return res.render(site, responseObj);
  }
  res.render('index', { title: 'Express' });
}