'use strict';

module.exports = function steps() {

    var FeatureLoader = require('../../lib/FeatureLoader');
    var FSLoader = require('../../lib/FileSystemLoader');
    var GHLoader = require('../../lib/GitHubLoader');
    var githubURL = 'https://github.com/dropshape/FullStackBDD-Features';

    this.Given(/^A Filesystem Pattern "([^"]*)" and A public Github url and a Glob Pattern "([^"]*)"$/, function (filePattern, githubPattern, callback) {
        this.featureLoader = new FeatureLoader(new FSLoader(filePattern), new GHLoader(githubPattern, githubURL));
        callback();
    });

    this.Given(/^I have configured Multiple loaders with the glob pattern "([^"]*)"$/, function(pattern, callback) {
        this.featureLoader = new FeatureLoader(new FSLoader(pattern), new GHLoader(pattern, githubURL));
        callback();
    });


};