"use strict";

var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    router = express.Router(),
    app = express();

app.use(express.static(path.join(__dirname, 'public')));
/* routes*/;
require('./routes/routes')(router);

app.use('/api', router); //route base

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            success: false
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        success: false
    });
});

module.exports = app;
