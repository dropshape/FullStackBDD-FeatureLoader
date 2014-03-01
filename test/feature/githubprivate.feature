@github @private @ignore
Feature: URL Loader
  In order: to be able to keep my files wherever I want
  As a : Developer
  I want : to be able to load my files from a URL

  Scenario: Load files from a private Github repository
    Given A private Github url with a Glob Pattern "**/feature.feature"
    Then I must load the given files :
      | filenames                     |
      | test/features/feature.feature |
    And  I must be able to get the file contents for:
      | filenames                     |
      | test/features/feature.feature |

  Scenario: Load the next file from a private Github repository
    Given A private Github url with a Glob Pattern "**/feature.feature"
    Then  I can get the next file
    And   Must throw an error if I attempt to get a file

  Scenario: Error when trying to load files from a private Github repository with invalid credentials
    Given A private Github url with invalid Credentials
    Then I must receive an authentication error from Github