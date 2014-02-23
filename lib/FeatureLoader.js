'use strict';

var logger = require('./Logger');
var Q = require('q');
var _ = require('lodash');

module.exports = function FeatureLoader() {
    logger.info('Feature loader: ');

    var loaders = _.flatten(arguments);
    var position = 0;

    /**
     * Returns a list of all file names that are to be loaded.
     * @returns {*}
     */
    this.fileNames = function fileNames() {
        var deferred = Q.defer();
        var files = loaders.map(function (loader) {
            return loader.fileNames();
        });
        Q.all(files).spread(function () {
            var filenames = _.flatten(arguments);
            deferred.resolve(filenames);
        }, function (err) {
            logger.error('Error loading filenames: ', err);
            deferred.reject(err);
        });
        return deferred.promise;
    };

    /**
     * Loop Through the files loading each one in turn.
     * Returns a promise that on completion contains all the files that
     * have been loaded.
     * forEach(function(file){}).done(function(files{}));
     * @param callback
     * @returns {*|Promise.<Array.<Object>>}
     */
    /*jshint -W083*/
    this.forEach = function (callback) {
        var deferred = Q.defer();
        var files = loaders.map(function (loader) {
            return loader.files();
        });
        Q.all(files).spread(function () {
            var filenames = _.flatten(arguments);
            filenames.forEach(function (file) {
                callback(file);
            });
            deferred.resolve(filenames);
        }, function (err) {
            logger.error('Error loading filenames: ', err);
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.files = function () {
        return this.forEach(function () {
        });
    };

    /**
     * Returns true if there are more files to load.
     * @returns {boolean}
     */
    this.hasNext = function () {
        var deferred = Q.defer();
        var files = loaders.map(function (loader) {
            return loader.hasNext();
        });
        Q.allSettled(files).spread(function () {
            var hasNext = _.some(_.flatten(arguments), function (value) {
                return value.state === 'fulfilled';
            });
            if (!hasNext) {
                return deferred.reject();
            }
            deferred.resolve();
        }, function (err) {
            logger.error('Error evaluating hasNext: ', err);
            deferred.reject(err);
        });
        return deferred.promise;
    };

    /**
     * Returns a promise of the next file.
     * Throws an error if there are no more files to load.
     * @returns {*|Promise}
     */
    this.next = function () {
        var context = this;
        var deferred = Q.defer();
        this.hasNext().then(function () {
            var loader = loaders[position];
            loader.hasNext().then(function () {
                loader.next().then(function (file) {
                    deferred.resolve(file);
                }).fail(function () {
                        position++;
                        deferred.resolve(context.next());
                    });
            }).fail(function () {
                    position++;
                });
        }).fail(function () {
                logger.error('No more files to load!');
                deferred.reject('No more files to load!');
            });
        return deferred.promise;
    };

    this.reset = function () {
        position = 0;
    };
};