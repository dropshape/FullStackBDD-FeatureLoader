'use strict';

module.exports = function steps() {

    var FeatureLoader = require('../../lib/FeatureLoader');
    var GHLoader = require('../../lib/GitHubLoader');
    var githubURL = 'https://github.com/dropshape/FullStackBDD-Features.git';
    var githubURLPrivate = 'https://<REPLACE WITH TOKEN>:x-oauth-basic@github.com/dropshape/private.git';
    var githubURLPrivateInvalid = 'https://<REPLACE WITH INVALID TOKEN>:x-oauth-basic@github.com/dropshape/private.git';

    this.Given(/^A public Github url with a Glob Pattern "([^"]*)"$/, function (pattern, callback) {
        this.featureLoader = new FeatureLoader(new GHLoader(pattern, githubURL));
        callback();
    });

    this.Given(/^A private Github url with a Glob Pattern "([^"]*)"$/, function (pattern, callback) {
        this.featureLoader = new FeatureLoader(new GHLoader(pattern, githubURLPrivate));
        callback();
    });

    this.Given(/^A private Github url with invalid Credentials$/, function (callback) {
        this.featureLoader = new FeatureLoader(new GHLoader("**/feature.feature", githubURLPrivateInvalid, true));
        callback();
    });

    this.Then(/^I must receive an authentication error from Github$/, function (callback) {
        // express the regexp above with the code you wish you had
        this.featureLoader.fileNames().then(function (results) {
            callback.fail('Call should fail!', results);
        }).fail(function () {
                callback();
            });
    });
};