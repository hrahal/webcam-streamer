"use strict";

var video = require('./video');

module.exports = function (router) {

    //stick to rest api conventions
    router.get('/stream', video.stream);

};
