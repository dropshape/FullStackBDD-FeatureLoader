'use strict';

var logger = require('./Logger');
var FSLoader = require('./FileSystemLoader');
var Q = require('q');
var git = require('nodegit');
var os = require('os');
var uuid = require('node-uuid');

/**
 * Filesystem implementation of FeatureLoader.
 * Will load files from the filesystem based on
 * multi-glob patterns.
 * @param pattern
 * @constructor
 */
module.exports = function Loader(pattern, url) {
    logger.info('GitHub loader: ');
    var loaderDefer = Q.defer();
    var loader;
    var temp = os.tmpdir() + '/githubloader/' + uuid.v1();
    logger.info('Cloning into ', temp);

    git.Repo.clone(url, temp, null, function (err, repo) {
        if (err) {
            logger.error('Error loading github repository: ', err);
            return loaderDefer.reject(err);
        }
        loader = new FSLoader(pattern, {cwd: temp});
        loaderDefer.resolve();
    });

    this.fileNames = function fileNames() {
        return loaderDefer.promise.then(function () {
            return loader.fileNames();
        });
    };

    this.forEach = function (callback) {
        return loaderDefer.promise.then(function () {
            return loader.forEach(callback);
        });
    };

    this.files = function () {
        return this.forEach(function () {
        });
    };

    this.next = function () {
        return loaderDefer.promise.then(function () {
            return loader.next();
        });
    };

    this.hasNext = function () {
        return loaderDefer.promise.then(function () {
            return loader.hasNext();
        });
    };

    this.reset = function () {
        loaderDefer.promise.then(function () {
            loader.reset();
        });
    };
};