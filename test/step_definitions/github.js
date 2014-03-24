'use strict';

module.exports = function steps() {

    var FeatureLoader = require('../../lib/FeatureLoader');
    var GHLoader = require('../../lib/GitHubLoader');
    var githubURL = 'https://github.com/dropshape/FullStackBDD-Features.git';
    var githubURLPrivate = 'https://<REPLACE WITH TOKEN>:x-oauth-basic@github.com/dropshape/private.git';
    var githubURLPrivateInvalid = 'https://<REPLACE WITH INVALID TOKEN>:x-oauth-basic@github.com/dropshape/private.git';
    var expect = require('chai').expect;

    this.Given(/^I want to load feature files from a public Github repository\.$/, function(callback) {
        this.featureLoader = new FeatureLoader(new GHLoader('**/*.feature_txt', githubURL));
        callback();
    });

    this.When(/^The loader has finished loading the Github repository\.$/, function (callback) {
        this.featureLoader.fileNames().then(function () {
            callback();
        }).fail(function (err) {
                callback.fail(err);
            });
    });

    this.Then(/^I will have access to the feature files in the Github repository\.$/, function(callback) {
        this.featureLoader.fileNames().then(function(filenames){
            expect(filenames.length).to.be.above(0);
            expect(filenames.indexOf('FeatureLoader/testdata/sample.feature_txt')).to.be.above(-1);
            expect(filenames.indexOf('FeatureLoader/testdata/features/nested.feature_txt')).to.be.above(-1);
            expect(filenames.indexOf('FeatureLoader/testdata/features/nested/deeplynested.feature_txt')).to.be.above(-1);
            callback();
        }).fail(function(err){
                callback.fail(err);
            });
    });

    this.Given(/^I want to load feature files from a private Github repository\.$/, function(callback) {
        this.featureLoader = new FeatureLoader(new GHLoader('**/*.feature', githubURLPrivate));
        callback();
    });

    this.Then(/^I will have access to the feature files in the private Github repository\.$/, function(callback) {
        this.featureLoader.fileNames().then(function(filenames){
            console.log('Filenames  ', filenames);
            expect(filenames.length).to.be.above(0);
            expect(filenames.indexOf('app/features/integrations/github.feature')).to.be.above(-1);
            callback();
        }).fail(function(err){
                callback.fail(err);
            });
    });

    this.Given(/^I want to load feature files from a private Github repository with invalid credentials$/, function(callback) {
        this.featureLoader = new FeatureLoader(new GHLoader('**/*.feature', githubURLPrivateInvalid));
        callback();
    });

    this.Then(/^I must receive an authentication error from Github$/, function (callback) {
        this.featureLoader.fileNames().then(function (results) {
            callback.fail('Call should fail!', results);
        }).fail(function () {
                callback();
            });
    });
};