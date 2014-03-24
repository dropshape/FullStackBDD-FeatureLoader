@filesystem
Feature: Load Feature files from a local filesystem so that
  feature files can be run against all modules in the application.

  In order to : Increase application stability
  As a        : Quality Assurance Engineer
  I want to   : Run feature files from the filesystem

  Scenario: Load files from a filesystem repository
    Given I want to load feature files from the filesystem.
    Then  I will have access to the feature files in the filesystem.

  Scenario: Retrieve file from the loaded repository
    Given I load a file from the filesystem
    Then  I can retrieve that file from the filesystem

  Scenario: Throw an error if trying to retrieve a file when there are none.
    Given I load an invalid file from the filesystem
    Then  There should be no files to load
    And   Must throw an error if I attempt to get a file

  Scenario: Load files from a filesystem repository with multiple loaders
    Given I want to load feature files from the filesystem with multiple filesystem loaders.
    Then  I will have access to the feature files in the filesystem twice.