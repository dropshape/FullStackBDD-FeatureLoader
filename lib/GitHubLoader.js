'use strict';

var logger = require('./Logger');
var FSLoader = require('./FileSystemLoader');
var Q = require('q');
var git = require('simple-git');
var os = require('os');
var path = require('path');
var fs = require('fs');

/**
 * Filesystem implementation of FeatureLoader.
 * Will load files from the filesystem based on
 * multi-glob patterns.
 * @param pattern String glob pattern to load
 * @param url String valid public github url or a private oauth url
 * @constructor
 */
module.exports = function Loader(pattern, url) {
    logger.info('GitHub loader: ');
    var loaderDefer = Q.defer();
    var loader;
    var repo = path.join(os.tmpdir(), url);

    loadGithubRepo(repo, url).then(function () {
        loader = new FSLoader(pattern, {cwd: repo});
        loaderDefer.resolve();
    }).fail(function (err) {
            loaderDefer.reject(err);
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

function loadGithubRepo(repo, url) {
    var repoDefer = Q.defer();
    fs.exists(repo, function (exists) {
        if (exists) {
            repoDefer.resolve(fetchRepo(url, repo));
        } else {
            repoDefer.resolve(cloneRepo(url, repo));
        }
    });
    return repoDefer.promise;
}

function cloneRepo(url, repoDirectory) {
    logger.info('Cloning into ', repoDirectory);
    var deferred = Q.defer();
    git().clone(url, repoDirectory, function (err) {
        if (err) {
            logger.error('Error cloning github repository: ', err);
            return deferred.reject(err);
        }
        deferred.resolve();
    });
    return deferred.promise;
}

function fetchRepo(url, repoDirectory) {
    logger.info('Fetching repo', url);
    var deferred = Q.defer();
    git(repoDirectory).pull(function (err) {
        if (err) {
            logger.error('Error fetching github repository: ', err);
            return deferred.reject(err);
        }
        deferred.resolve();
    });
    return deferred.promise;
}