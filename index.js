'use strict';

/**
 * Main Feature Loader.
 * You need to pass at least one instance of another type of loader
 * to the constructor.
 *
 * @usage
 * new FeatureLoader( new GitHubLoader(pattern, url), new FileSystemLoader(pattern));
 * @type {*}
 */
module.exports.FeatureLoader = require('./lib/FeatureLoader');

/**
 * FileSystem loader will load files from the computer filesystem.
 * You can pass it a valid relative path or a glob object {'**\/*.js'}
 * @usage
 * var loader = new FeatureLoader(
 *     new FileSystemLoader('test/feature\/**.feature')
 * );
 * @type {*}
 */
module.exports.FileSystemLoader = require('./lib/FileSystemLoader');

/**
 * Github file loader will load files from a public or private
 * github repository. You pass it a path or a glob object for the
 * files you would like it to find in the repository as well as the
 * url to the repository. If the repository is a private repository then
 * you must pass a github url in the format
 * 'https://<OAUTH-TOKEN>:x-oauth-basic@github.com/<REPOSITORY>.git'
 *
 * @usage
 * var loader = new FeatureLoader(
 *      new GitHubLoader(
 *          '**\/*.features',
 *          'https://github.com/dropshape/FullStackBDD-FeatureLoader/tree/master/test/feature'
 *      )
 * );
 * @type {*}
 * @throws 401 Authentication Error if you do not have access to the given github repository.
 */
module.exports.GitHubLoader = require('./lib/GitHubLoader');