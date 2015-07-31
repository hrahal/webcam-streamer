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

    res.writeHead(200, {
        "Content-Type": "video/webm",
        'Connection' : 'keep-alive'
    });

    var video = ffmpeg();

    video
        .input('/dev/video0')
        .inputFPS(10)
        .format('v4l2')
        .size('640x480')
        .fps(5)
        .format('oss')
        .format('sdl')
        .audioCodec('libvorbis')
        .audioBitrate('48k')
        .videoCodec('libvpx')
        .videoBitrate('448k')
        .format('webm')
        //.duration(5)
        .outputOptions([
            '-fflags nobuffer',
            '-flush_packets 1',
            '-r 30'
        ])
        .on('error', function (err) {
            console.log(err);
        })
        .on('end', function () {
            console.log('streaming finished');
        })
        .pipe(res, {
            end: false
        });
};
