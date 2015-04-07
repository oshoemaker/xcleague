"use strict"

var express = require('express');
var router = express.Router();
var controllers = require('../lib/controllers');
var httpHelpers = require('../lib/httphelpers');

router.get('/', controllers.index );
router.get('/index.:format', controllers.index);

// Signup
router.get('/signup.:format', controllers.signup);
router.post('/signup.:format', controllers.signupPost);

// Login
router.get('/login.:format', httpHelpers.forceHttps, controllers.loginGet);
router.post('/login.:format', controllers.loginPost);


router.get('/sites/:site', controllers.site);
router.get('/upload/igc', controllers.getIgcUpload);
router.post('/upload/igc', controllers.postIgcUpload);

router.get('/mm5', controllers.getMm5);

router.get('/blipspot/:site', controllers.getBlipspot);

router.get('/dashboard', controllers.dashboard);

module.exports = router;