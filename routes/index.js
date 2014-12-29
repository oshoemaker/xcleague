"use strict"

var express = require('express');
var router = express.Router();
var controllers = require('../lib/controllers');

router.get('/', controllers.index );
router.get('/index.:format', controllers.index);
router.get('/signup.:format', controllers.signup);
router.get('/login.:format', controllers.login);
router.get('/sites/:site', controllers.site);
router.get('/upload/igc', controllers.getIgcUpload);
router.post('/upload/igc', controllers.postIgcUpload);

router.get('/mm5', controllers.getMm5);

router.get('/blipspot/:site', controllers.getBlipspot);

module.exports = router;