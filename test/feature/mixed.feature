@filesystem @github
Feature: Mixed Loader
  In order: to be able to keep my files wherever I want
  As a : Developer
  I want : to be able to load my files from anywhere

  Scenario: Load files from the filesystem and a Github repository
    Given A Filesystem Pattern "**/github.js" and A public Github url and a Glob Pattern "**/*.feature_txt"
    Then  I must load the given files :
      | filename                                                        |
      | test/step_definitions/github.js                                 |
      | FeatureLoader/testdata/sample.feature_txt                       |
      | FeatureLoader/testdata/features/nested.feature_txt              |
      | FeatureLoader/testdata/features/nested/deeplynested.feature_txt |
    And  I must be able to get the file contents for:
      | filename                                                        |
      | test/step_definitions/github.js                                 |
      | FeatureLoader/testdata/sample.feature_txt                       |
      | FeatureLoader/testdata/features/nested.feature_txt              |
      | FeatureLoader/testdata/features/nested/deeplynested.feature_txt |

  Scenario: Multiple mixed loaders throw on invalid next file
    Given I have configured Multiple loaders with the glob pattern "{**/github.js,**/sample.feature_txt}"
    Then  I can get the next file
    Then  I can get the next file
    And   Must throw an error if I attempt to get a file