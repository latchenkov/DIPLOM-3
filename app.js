var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var log = require ('lib/log')(module);
var bodyParser = require('body-parser');
var HttpError = require('error').HttpError;

var app = express();
//log.info(app.get('env'));

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('middleware/sendHttpError'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('routes/index'));
app.use('/run', require('routes/run'));
app.use('/ads', require('routes/ads'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(404);
});

// error handlers

app.use(function(err, req, res, next) {
  if (typeof err == 'number') { // next(404);
    err = new HttpError(err);
  }

  if (err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
      // development error handler
        // will print stacktrace
    if (app.get('env') == 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
    });
  });
    } else {
      log.error(err);
      err = new HttpError(500);
      res.sendHttpError(err);
    }
  }
});

module.exports = app;
