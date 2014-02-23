'use strict';

module.exports = function steps() {

    var expect = require('chai').expect;
    var FeatureLoader = require('../../lib/FeatureLoader');
    var FSLoader = require('../../lib/FileSystemLoader');

    this.Given(/^Filesystem Glob Pattern "([^"]*)"$/, function (pattern, callback) {
        this.featureLoader = new FeatureLoader(new FSLoader(pattern));
        callback();
    });

    this.Given(/^I have configured Multiple Filesystems with Glob Pattern "([^"]*)"$/, function(pattern, callback) {
        this.featureLoader = new FeatureLoader(new FSLoader(pattern), new FSLoader(pattern));
        callback();
    });

    this.Then(/^I must load the given files :$/, function (table, callback) {
        this.featureLoader.fileNames().then(function (filenames) {
            expect(filenames).to.have.length(table.rows().length);
            table.rows().forEach(function (value) {
                expect(filenames).to.contain(value[0]);
            });
            callback();
        }).fail(function (err) {
                callback.fail(err);
            });
    });

    this.Then(/^I must be able to get the file contents for:$/, function (table, callback) {
        var featureLoader = this.featureLoader;
        var count = table.rows().length;
        featureLoader.forEach(function (file) {
            expect(file.length).to.be.above(5);
            count--;
        }).then(function () {
                expect(count).to.eq(0);
                callback();
            }).fail(function (err) {
                callback.fail('Error loading files', err);
            });
    });

    this.Then(/^There should be no files to load$/, function(callback) {
        this.featureLoader.hasNext().then(function(hasNext){
            expect(hasNext).to.be.eql(false);
        });
        this.featureLoader.fileNames().then(function(fileNames){
            expect(fileNames).to.have.length(0);
            callback();
        });
    });

    this.Then(/^I can get the next file$/, function(callback) {
        this.featureLoader.next().then(function(file){
            expect(file.length).to.be.above(5);
            callback();
        }).fail(function(){
                callback.fail('Should be able to load the next file!');
            });
    });

    this.Then(/^Must throw an error if I attempt to get a file$/, function(callback) {
        this.featureLoader.next().then(function(file){
            callback.fail('Should not be able to retrieve an empty file!', file);
        }).fail(function(){
                callback();
            });
    });
};