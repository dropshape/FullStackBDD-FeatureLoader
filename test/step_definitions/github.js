'use strict';


module.exports = function steps() {

//    var expect = require('chai').expect;
//    var FeatureLoader = require('../../lib/FeatureLoader');
//    var featureLoader;

    this.Given(/^A public Github url with a Glob Pattern "([^"]*)"$/, function(arg1, callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

    this.Given(/^A private Github url with a Glob Pattern "([^"]*)" and valid Credentials$/, function(arg1, callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

    this.Given(/^A private Github url with invalid Credentials$/, function(callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

    this.Then(/^I must receive an authentication error from Github$/, function(callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });
};