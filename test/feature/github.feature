@github
Feature: Github Loader
  In order: to be able to keep my files wherever I want
  As a : Developer
  I want : to be able to load my files from a github URL

  Scenario: Load files from a public Github repository
    Given A public Github url with a Glob Pattern "**/*.feature_txt"
    Then I must load the given files :
      | filenames                                                       |
      | FeatureLoader/testdata/sample.feature_txt                       |
      | FeatureLoader/testdata/features/nested.feature_txt              |
      | FeatureLoader/testdata/features/nested/deeplynested.feature_txt |
    And  I must be able to get the file contents for:
      | filenames                                                       |
      | FeatureLoader/testdata/sample.feature_txt                       |
      | FeatureLoader/testdata/features/nested.feature_txt              |
      | FeatureLoader/testdata/features/nested/deeplynested.feature_txt |

  Scenario: Load the next file from a public Github repository
    Given A public Github url with a Glob Pattern "**/sample.feature_txt"
    Then  I can get the next file
    And   Must throw an error if I attempt to get a file
