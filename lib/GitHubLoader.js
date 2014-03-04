'use strict';

var path = require('path');
var fs = require('fs');
var logger = require('./Logger');
var FSLoader = require('./FileSystemLoader');
var Q = require('q');
var git = require('nodegit');
var os = require('os');
var githubExtract = require('github-url-to-object');
var rimraf = require('rimraf');
/**
 * Filesystem implementation of FeatureLoader.
 * Will load files from the filesystem based on
 * multi-glob patterns.
 * @param pattern String glob pattern to load
 * @param url String valid public github url or a private oauth url
 * @param forceClean Boolean by default the repo will be loaded into the temporary
 * directory on first access and then fetched thereafter. If you want to ensure
 * that a new copy is always cloned then pass true as the forceClean param
 * @constructor
 */
module.exports = function Loader(pattern, url, forceClone) {
    logger.info('GitHub loader: ');
    var loaderDefer = Q.defer();
    var loader;
    var repo = githubExtract(url).repo;
    var repoDirectory = path.join(os.tmpdir(), '/githubloader/', repo);

    var repoPromise;
    var repoAlreadyCloned = fs.existsSync(repoDirectory);
    if (forceClone && repoAlreadyCloned) {
        rimraf.sync(repoDirectory);
        repoAlreadyCloned = false;
    }
    if (!repoAlreadyCloned) {
        repoPromise = cloneRepo(url, repoDirectory);
    } else {
        repoPromise = fetchRepo(repoDirectory, 'origin');
    }

    repoPromise.then(function () {
        loader = new FSLoader(pattern, {cwd: repoDirectory});
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

function fetchRepo(repoDirectory, branch) {
    logger.info('Fetching Repo ', repoDirectory);
    var deferred = Q.defer();
    git.Repo.open(repoDirectory, function (err, repo) {
        if (err) {
            logger.error('Error fetching github repository: ', err);
            return deferred.reject(err);
        }
        var remote = repo.getRemote(branch);
        remote.connect(0, function (err) {
            if (err) {
                logger.error('Error connecting to remote branch: ' + branch, err);
                return deferred.reject(err);
            }
            try {
                remote.download(function(){
                    logger.info('Progress called', arguments);
                }, function (err) {
                    if (err) {
                        logger.error('Error downloading remote branch: ' + branch, err);
                        return deferred.reject(err);
                    }
                    deferred.resolve();
                });
            }catch(err){
                logger.error('Error downloading!', err);
                deferred.reject(err);
            }
        });
    });
    return deferred.promise;
}

function cloneRepo(url, repoDirectory) {
    logger.info('Cloning into ', repoDirectory);
    var deferred = Q.defer();
    git.Repo.clone(url, repoDirectory, null, function (err) {
        if (err) {
            logger.error('Error loading github repository: ', err);
            return deferred.reject(err);
        }
        deferred.resolve();
    });
    return deferred.promise;
}