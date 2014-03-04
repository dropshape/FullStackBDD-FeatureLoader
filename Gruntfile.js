module.exports = function (grunt) {
    'use strict';

    //Default task runs tests, jshint and watches for changes.
    grunt.registerTask('default',
        ['test', 'jshint', 'watch']);

    //Just run tests
    grunt.registerTask('test', 'shell:test');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Tests
        shell: {
            test:{
                command: './node_modules/cucumber/bin/cucumber.js test/ -r test/step_definitions/ --format pretty --tags ~@ignore | ./node_modules/bunyan/bin/bunyan -o short'
            }
        },

        //Clean code.
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: { src: ['index.js', 'lib/**/*.js', 'test/**/*.js']}
        },

        //Files to watch and actions to take when they are changed.
        watch: {
            files: ['index.js', 'lib/**/*.js', 'test/**/*.spec.js'],
            tasks: ['test', 'jshint']
        }
    });

    // Load the plugins
    // Watch the file system for changes.
    grunt.loadNpmTasks('grunt-contrib-watch');
    //tests
    grunt.loadNpmTasks('grunt-shell');
    // Clean code validator.
    grunt.loadNpmTasks('grunt-contrib-jshint');
};
