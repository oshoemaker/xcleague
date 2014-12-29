"use strict"
var debug = require('debug')('xcleague:httphelpers.js');

function HttpHelpers() {
  
}

HttpHelpers.prototype.restrict = function(req, res, next) {
  debug("Starting the restrict function");

  if (remembermeIsStolen(req)) {
    req.rememberme.destroy();
  } 
  
  if (typeof req.session !== 'undefined' && req.session && req.session.user) {
    debug("restrict session is valid");
    return next();
  } 

  debug("restrict session is not valid");

  if (req.params.format == 'json') {
    var codeToRespond = 401;
    debug("respond returning JSON with code="+codeToRespond);
    return res.json.call(res, {error: "Session is not valid"}, codeToRespond);
  }
  
  res.redirect('/login');

}

HttpHelpers.prototype.respond = function(req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  dataObj = merge(merge({}, req.body), dataObj);
  dataObj = exports.addStandardResponseFields(dataObj, req.session);
    
  if (!req.accepts('html') || req.params.format == 'json') {
    var codeToRespond = statusCode || 200;
    _logger.trace("respond returning JSON >" + JSON.stringify(dataObj) + "< with code="+codeToRespond);
    return res.status(codeToRespond).json(dataObj); 
  }
  
  var codeToRespond = statusCode || 200;
  res.status(codeToRespond);
  
  _logger.info("respond returning HTML with data >" + JSON.stringify(dataObj) + "< and code="+codeToRespond);
  return res.render.call(res, htmlPartial, dataObj);

}