'use strict';

module.exports = function steps() {

    var expect = require('chai').expect;
    var FeatureLoader = require('../../lib/FeatureLoader');
    var FSLoader = require('../../lib/FileSystemLoader');
    var GHLoader = require('../../lib/GitHubLoader');
    var githubURL = 'https://github.com/dropshape/FullStackBDD-Features';

    this.Given(/^I want to load feature files from the filesystem and a public Github repository\.$/, function(callback) {
        this.featureLoader = new FeatureLoader(new FSLoader('**/test/feature/**.feature'), new GHLoader('**/*.feature_txt', githubURL));
        callback();
    });

    this.Then(/^I will have access to the feature files in the filesystem and the Github repository\.$/, function(callback) {
        this.featureLoader.fileNames().then(function(filenames){
            expect(filenames.length).to.be.above(0);
            expect(filenames.indexOf('test/feature/github.feature')).to.be.above(-1);
            expect(filenames.indexOf('FeatureLoader/testdata/sample.feature_txt')).to.be.above(-1);
            callback();
        }).fail(function(err){
                callback.fail(err);
            });
    });
};