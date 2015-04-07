"use strict"
var debug = require('debug')('xcleague:httphelpers.js');
var merge = require('merge');

function HttpHelpers() {
  
}

HttpHelpers.prototype.forceHttps = function(req,res,next) {
  
  // Skip this if it isn't production
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }
  
  // Check the x-forwarded-proto for http and if so redirect to https
  if (req.headers['x-forwarded-proto'] == 'http') { 
    res.redirect('https://xcleague-nwxc.rhcloud.com' + req.path);
  } else {
    return next();
  }
}

HttpHelpers.prototype.forceHttp = function(req,res,next) {
  
  // Skip this if it isn't production
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }
  
  // Check the x-forwarded-proto for http and if so redirect to https
  if (req.headers['x-forwarded-proto'] == 'https') { 
    res.redirect('http://www.nw-xc.com' + req.path);
  } else {
    return next();
  }
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

HttpHelpers.prototype.respond = function(req, res, htmlPartial, dataObj, statusCode) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  dataObj = merge(merge({}, req.body), dataObj);
  dataObj = this.addStandardResponseFields(dataObj, req.session);
    
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

HttpHelpers.prototype.respondError = function(req,res,htmlPartial, dataObj, x, statusCode) {
  dataObj = merge(
    {
      error: true,
      updated: false
    },
    dataObj
  );
  
  if (!req.accepts('html') || req.params.format == 'json') {
      var codeToRespond = statusCode || 200;
      _logger.trace("respond returning JSON >" + dataObj + "< with code="+codeToRespond);
      return res.json.call(res, dataObj, codeToRespond);
  }
  
  if (typeof x !== 'number') statusCode = x, x = undefined;
  if (x) return exports.respond(req, res, htmlPartial, merge(dataObj, x), statusCode || 400);
  return exports.respond(req, res, htmlPartial, dataObj, statusCode || 400);
}

HttpHelpers.prototype.addStandardResponseFields = function(dataObject,sessionObj) {

    try {
        if (typeof sessionObj !== "undefined") {
            var loggedInUser = merge({},sessionObj.user);
            dataObject.liuser = exports.buildAcceptableUserObject(loggedInUser);
        } else {
            return dataObject;
        }

    } catch (err) {
        _logger.crit("addStandardResponseFields err="+err+err.stack);
    }

    return dataObject;
};

module.exports = new HttpHelpers();