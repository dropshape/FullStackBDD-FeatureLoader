@filesystem
Feature: File Loader
  In order: to be able to keep my files wherever I want
  As a : Developer
  I want : to be able to load my files from the filesystem

  Scenario: Load files from the filesystem
    Given Filesystem Glob Pattern "{**/github.js,lib/**/FeatureLoader.js}"
    Then  I must load the given files :
      | filename                        |
      | lib/FeatureLoader.js            |
      | test/step_definitions/github.js |
    And  I must be able to get the file contents for:
      | filename                        |
      | lib/FeatureLoader.js            |
      | test/step_definitions/github.js |

  Scenario: Load the next file from the filesystem
    Given Filesystem Glob Pattern "**/github.js"
    Then  I can get the next file
    And   Must throw an error if I attempt to get a file

  Scenario: Load files from the filesystem
    Given Filesystem Glob Pattern "{myfake_file_here.js.pdf.doc}"
    Then  There should be no files to load
    And   Must throw an error if I attempt to get a file

  Scenario: Multiple file loaders throw on invalid next file
    Given I have configured Multiple Filesystems with Glob Pattern "**/github.js"
    Then  I can get the next file
    Then  I can get the next file
    And   Must throw an error if I attempt to get a file

  Scenario: Load Multiple FileLoaders
    Given I have configured Multiple Filesystems with Glob Pattern "**/github.js"
    Then  I must load the given files :
      | filename                        |
      | test/step_definitions/github.js |
      | test/step_definitions/github.js |
    And  I must be able to get the file contents for:
      | filename                        |
      | test/step_definitions/github.js |
      | test/step_definitions/github.js |