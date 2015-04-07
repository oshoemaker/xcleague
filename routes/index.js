"use strict"

var express = require('express');
var router = express.Router();
var controllers = require('../lib/controllers');
var httpHelpers = require('../lib/httphelpers');

router.get('/', controllers.index );
router.get('/index.:format', controllers.index);

// Signup
router.get('/signup.:format', httpHelpers.forceHttps, controllers.signup);
router.post('/signup.:format', httpHelpers.forceHttps, controllers.signupPost);

// Login
router.get('/login.:format', httpHelpers.forceHttps, controllers.loginGet);
router.post('/login.:format', httpHelpers.forceHttps, controllers.loginPost);

// IGC Upload
router.get('/upload/igc', httpHelpers.forceHttps, controllers.getIgcUpload);
router.post('/upload/igc', httpHelpers.forceHttps, controllers.postIgcUpload);

// Site information
router.get('/sites/:site', httpHelpers.forceHttp, controllers.site);

router.get('/blipspot/:site', httpHelpers.forceHttp, controllers.getBlipspot);

router.get('/dashboard', httpHelpers.forceHttps, controllers.dashboard);

module.exports = router;