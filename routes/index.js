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
router.get('/login.:format', controllers.loginGet);
router.post('/login.:format', controllers.loginPost);

// IGC Upload
router.get('/upload/igc', controllers.getIgcUpload);
router.post('/upload/igc', controllers.postIgcUpload);

// Site information
router.get('/sites/:site', controllers.site);

router.get('/blipspot/:site', controllers.getBlipspot);

router.get('/dashboard', controllers.dashboard);

module.exports = router;