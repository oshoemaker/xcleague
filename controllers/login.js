"use strict"

exports.login = function(req, res, next) {
 res.render('login', { title: 'Express' }); 
}