"use strict";

var server = require('../bin/www');
var video_socket = require('./video_socket');
var io = require('socket.io')(server);

module.exports = function () {

    io.on('connection', video_socket.videoSocket);

};
