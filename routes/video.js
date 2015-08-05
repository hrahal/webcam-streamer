"use strict";

var debug = require('debug')('weather:log'),
    error = require('debug')('weather:error'),
    ffmpeg = require('fluent-ffmpeg'),
    fs = require('fs');

/* GET stream */

exports.stream_cam = function (req, res, next) {

    res.writeHead(200, {
        "Content-Type": "video/webm",
        'Connection' : 'keep-alive'
    });

    var video = ffmpeg();

    video
        .input('/dev/video0')
        .format('v4l2')
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
            '-vf scale=-1:480',
            '-deadline realtime'
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

exports.stream_screen = function (req, res, next) {

    var exec = require('child_process').exec;

    res.writeHead(200, {
        "Content-Type": "video/webm",
        'Connection' : 'keep-alive'
    });

    exec('xdpyinfo  | grep dimensions',
        function (error, stdout, stderr) {

            if (error) {
                res.send(new Error(
                    'Error reading screen dimensions'
                ));
            } else {

                var video = ffmpeg(),
                    getPixels = stdout.split(' pixels')[0],
                    screenres = getPixels.substring(
                        getPixels.lastIndexOf(" ") + 1
                    ).trim();

                video
                    .input(':0.0')
                    .inputOptions('-video_size ' + screenres)
                    .inputFPS(25)
                    .inputFormat('x11grab')
                    .input('default')
                    .inputFormat('pulse')
                    .audioChannels(2)
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
                        '-vf scale=-1:480',
                        '-deadline realtime'
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
            }
        });
};
