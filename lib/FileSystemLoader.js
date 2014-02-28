'use strict';

var logger = require('./Logger');
var glob = require('multi-glob');
var fs = require('graceful-fs');
var Q = require('q');

/**
 * Filesystem implementation of FeatureLoader.
 * Will load files from the filesystem based on
 * multi-glob patterns.
 * @param pattern
 * @constructor
 */
module.exports = function Loader(pattern, options) {
    logger.info('FileSystem loader: ');
    var loaderDefer = Q.defer();
    var filePatterns = [];
    var position = 0;

    glob.glob(pattern, options, function (err, value) {
        if (err) {
            logger.error('Error loading files: ', err);
            return loaderDefer.reject(err);
        }
        filePatterns = value;
        logger.info('Files found: ', value);
        loaderDefer.resolve(value);
    });

    this.fileNames = function fileNames() {
        return loaderDefer.promise;
    };

    this.forEach = function (callback) {
        var context = this;
        var deferred = Q.defer();
        this.reset();
        loaderDefer.promise.then(function () {
            var files = [];
            if (filePatterns.length > 0) {
                filePatterns.forEach(function () {
                    files.push(context.next().then(function (file) {
                        callback(file);
                        return file;
                    }));
                });
                Q.all(files).then(function (resolvedFiles) {
                    deferred.resolve(resolvedFiles);
                });
            } else {
                deferred.resolve(files);
            }
        }).fin(function(){
                context.reset();
            });

        return deferred.promise;
    };

    this.files = function () {
        return this.forEach(function () {
        });
    };

    function resolvedPath() {
        var path = filePatterns[position++];
        if(options && options.cwd){
            path = options.cwd + '/' + path;
        }
        return path;
    }

    this.next = function () {
        var deferred = Q.defer();
        this.hasNext().then(function () {
            fs.readFile(resolvedPath(), function (err, file) {
                if (err) {
                    logger.error('Error loading file: ', err);
                    return deferred.reject(err);
                }
                deferred.resolve(file);
            });
        }).fail(function () {
                logger.error('No more files to load!');
                deferred.reject('No more files to load!');
            });
        return deferred.promise;
    };

    this.hasNext = function () {
        var deferred = Q.defer();
        loaderDefer.promise.then(function () {
            var hasNext = filePatterns.length !== 0 && position < filePatterns.length;
            if (!hasNext) {
                return deferred.reject();
            }
            deferred.resolve();
        });
        return deferred.promise;
    };

    this.reset = function () {
        position = 0;
    };
};