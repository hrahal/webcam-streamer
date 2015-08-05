"use strict";

var video = require('./video');
var path = require('path');

module.exports = function (router) {

    //stick to rest api conventions
    router.get('/stream/cam', video.stream_cam);
    router.get('/stream/screen', video.stream_screen);

};
