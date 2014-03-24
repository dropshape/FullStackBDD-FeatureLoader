@filesystem @github
Feature: Load Feature files from a local filesystem as well as Github so that
  feature files can be run against all modules in the application.

  In order to : Increase application stability
  As a        : Quality Assurance Engineer
  I want to   : Run feature files from the filesystem

  Scenario: Load files from the filesystem and a Github repository
    Given I want to load feature files from the filesystem and a public Github repository.
    Then  I will have access to the feature files in the filesystem and the Github repository.