@github
Feature: Load Feature files from a Github repository so that
  feature files can be run against all modules in the application.

  In order to : Increase application stability
  As a        : Quality Assurance Engineer
  I want to   : Run feature files from a central repository

  @current
  Scenario: Load files from a public Github repository
    Given I want to load feature files from a public Github repository.
    When  The loader has finished loading the Github repository.
    Then  I will have access to the feature files in the Github repository.

  Scenario: Load the next file from a public Github repository
    Given A public Github url with a Glob Pattern "**/sample.feature_txt"
    Then  I can get the next file
    And   Must throw an error if I attempt to get a file
