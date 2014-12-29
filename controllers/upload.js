"use strict"
var fs = require('fs');
var debug = require('debug')('xcleague:upload.js');

exports.postIgcUpload = function(req, res, next) {
  console.log(JSON.stringify(req.files));
  var fileName = req.files;
  debug(fileName);
  debug('SHIT SHIT SHIT');

  //fs.rename(req.files.igcFile.path,
  //  process.cwd() + serverPath + 'test',
  //  function(error) {
  //    debug('Attepmting to rename: ' + req.files.igcFile.path);
  //    if(error) {
	//      res.send({
  //        error: 'Ah crap! Something bad happened'
	//      });
  //      return;
  //    }
  //
  //    res.send({
  //      path: serverPath
  //    });
  //  }
  //);
  
  res.send({
    success: true
  });
  //res.render('index', { title: 'Express' });
}

exports.getIgcUpload = function(req, res, next) {
  res.render('igcupload', {igcupload: true});
}