"use strict";

var config = require('config'),
    logger = require('winston'),
    debug = require('debug')('weather:log'),
    error = require('debug')('weather:error'),
    http = require('http'),
    ffmpeg = require('fluent-ffmpeg'),
    fs = require('fs');

/* GET stream */

exports.stream = function (req, res, next) {

    res.writeHead(206, {
        "Content-Type": "video/flv"
    });

    var video = ffmpeg();

    video
        .input('/dev/video0')
        .size('640x480')
        .videoCodec('libx264')
        .audioCodec('libmp3lame')
        .inputFPS(29.7)
        .duration(3)
        .format('flv') //stick to webm 
        .on('error', function (err) {
            console.log(err.message);
        })
        .on('end', function () {
            console.log('streaming finished');
        })
        .pipe(res, { end: true });
};


