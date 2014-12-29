"use strict";
var request = require('request');
var url = require('url');
var cheerio = require('cheerio');
var debug = require('debug')('xcleague:getblipspot.js');

var url = "http://home.comcast.net/~wxtofly/";

var patt = new RegExp("10M_Wind");

var rowsToRemove = [
  1,
  4,
  6,
  8
];

exports.getBlipspot = function(req, res, next) {
  var site = req.params.site;

  debug(site);

  request({
    url: url + site
  }, function(err, response, body){
    
    var $ = cheerio.load(body);
    
    var date = $('body > b > big').html().replace(' --','');
    debug("Date: " + date);
    
    $('table').find('tr.direction').find('td').find('script').remove();
    $('table').find('tr.direction').find('td').find('br').remove();
    
    $('table').find('tr').each(function(i,element){
      if (rowsToRemove.indexOf(i) > -1) {
        $(this).remove();
      }
      
      if (i > 11) {
        $(this).remove();
      }
    })
    
    var table = $('table').html();
    
    if (table) {
      res.json({
        success: true,
        table: table,
        date: date
      });
      return;
    }
    
    res.json({
      success: false
    });

  });
}

function getDirection(degreeString) {
  var degrees = parseInt(degreeString);
  var direction = directions[parseInt((degrees+11.25)/22.5)]
  return direction;
}
