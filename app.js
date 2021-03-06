var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var coookieSession = require('cookie-session');
var hbs = require('express-hbs');
var multer  = require('multer');
var redis = require("redis");
var httpHelpers = require('./lib/httphelpers');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

_logger = require(__dirname + '/lib/logger');
_config = require(__dirname + '/lib/config').file;

_redis = redis.createClient(
  _config.redis.port,
  _config.redis.host,
  {
    auth_pass: _config.redis.pass
  }
);

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

var routes = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs', hbs.express3({
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: [__dirname + '/views/partials', __dirname + '/views/partialsJs'],
  defaultLayout: __dirname + '/views/layouts/default'
}));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ dest: process.cwd() + '/uploads/tmp/'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(httpHelpers.forceHttps);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log(err);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
