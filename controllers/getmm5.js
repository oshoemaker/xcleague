"use strict";
var request = require('request');
var url = require('url');
var cheerio = require('cheerio');
var debug = require('debug')('xcleague:getmm5.js');

var host = "http://www.atmos.washington.edu";
var path = "/mm5rt/rt/sound_gen/scripts/sound_gen.cgi";
var imgPath = "/mm5rt/rt/sound_gen/scripts"

exports.getMm5 = function(req, res, next) {
  var url_parts = url.parse(req.url, true);
  var params = url_parts.query;
  
  if (params.lon < 0) {
    debug('Longitude was negative')
    params.lon = Math.abs(params.lon).toString();
  }

  request({
    url:host + path, 
    qs:params
  }, function(err, response, body){

    var $ = cheerio.load(body);
    var img = $("input[type='image'][width='900']").attr('src');

    if (img) {
      img = img.replace('.','');
      var imgUrl = host + imgPath + img;
      
      res.json({
        success: true,
        imgUrl: imgUrl
      });
      return;
    }
  
    res.json({
      success: false
    });

  });
}
