'use strict';

module.exports = function steps() {

    var expect = require('chai').expect;
    var FeatureLoader = require('../../lib/FeatureLoader');
    var FSLoader = require('../../lib/FileSystemLoader');

    this.Given(/^I want to load feature files from the filesystem\.$/, function (callback) {
        this.featureLoader = new FeatureLoader(new FSLoader('**/test/feature/**.feature'));
        callback();
    });

    this.Then(/^I will have access to the feature files in the filesystem\.$/, function (callback) {
        this.featureLoader.fileNames().then(function (filenames) {
            expect(filenames.length).to.be.above(0);
            expect(filenames.indexOf('test/feature/github.feature')).to.be.above(-1);
            expect(filenames.indexOf('test/feature/fileloader.feature')).to.be.above(-1);
            callback();
        }).fail(function (err) {
                callback.fail(err);
            });
    });

    this.Given(/^I load a file from the filesystem$/, function (callback) {
        this.featureLoader = new FeatureLoader(new FSLoader('**/test/feature/fileloader.feature'));
        callback();
    });

    this.Then(/^I can retrieve that file from the filesystem$/, function (callback) {
        this.featureLoader.next().then(function (file) {
            expect(file.length).to.be.above(0);
            callback();
        }).fail(function () {
                callback.fail('Should be able to load the next file!');
            });
    });

    this.Given(/^I load an invalid file from the filesystem$/, function (callback) {
        this.featureLoader = new FeatureLoader(new FSLoader('invalid_file_that_should_not_exist.pdf.md.txt'));
        callback();
    });

    this.Then(/^There should be no files to load$/, function (callback) {
        this.featureLoader.hasNext().then(function (hasNext) {
            expect(hasNext).to.be.eql(false);
        });
        this.featureLoader.fileNames().then(function (fileNames) {
            expect(fileNames).to.have.length(0);
            callback();
        });
    });

    this.Given(/^I want to load feature files from the filesystem with multiple filesystem loaders\.$/, function (callback) {
        this.featureLoader = new FeatureLoader(
            new FSLoader('**/test/feature/fileloader.feature'), new FSLoader('**/test/feature/fileloader.feature')
        );
        callback();
    });

    this.Then(/^I will have access to the feature files in the filesystem twice\.$/, function (callback) {
        this.featureLoader.fileNames().then(function (fileNames) {
            expect(fileNames).to.have.length(2);
            callback();
        });
    });

    this.Then(/^Must throw an error if I attempt to get a file$/, function (callback) {
        this.featureLoader.next().then(function (file) {
            callback.fail('Should not be able to retrieve an empty file!', file);
        }).fail(function () {
                callback();
            });
    });
};