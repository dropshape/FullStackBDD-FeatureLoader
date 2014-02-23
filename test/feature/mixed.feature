#Feature: Mixed Loader
#  In order: to be able to keep my files wherever I want
#  As a : Developer
#  I want : to be able to load my files from anywhere
#
#  Scenario: Load files from the filesystem and a Github repository
#    Given Filesystem Glob Pattern "{**/github.js,lib/**/*.js}" and A public Github url with a Glob Pattern "**/*.feature"
#    Then  I must load the given files :
#      | filename                        |
#      | lib/FeatureLoader.js            |
#      | lib/Logger.js                   |
#      | lib/cli.js                      |
#      | test/step_definitions/github.js |
#      | sample.feature                  |
#      | nested.feature                  |
#      | deeplynested.feature            |