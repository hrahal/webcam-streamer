"use strict";

var ffmpeg = require('fluent-ffmpeg');
var ss = require("socket.io-stream");

exports.videoSocket = function (socket) {

    ss(socket).on('video streaming', function (stream, data) {
        console.log('called');
    
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
                .pipe(ss(socket).emit('video streaming'));
            //socket.emit('video streaming', )
    });
};
