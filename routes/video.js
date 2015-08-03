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
        .inputFPS(30)
        .format('v4l2')
        .fps(10)
        .audioCodec('libvorbis')
        .audioBitrate('128k')
        .videoCodec('libvpx')
        .videoBitrate('600k')
        .format('webm')
        .outputOptions([
            '-fflags nobuffer',
            '-flush_packets 1',
            '-g 30',
            '-crf 10',
            '-quality good',
            '-cpu-used 0',
            '-qmin 10',
            '-qmax 42',
            '-maxrate 500k',
            '-bufsize 1000k',
            '-threads 4',
            '-vf scale=-1:480'
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
