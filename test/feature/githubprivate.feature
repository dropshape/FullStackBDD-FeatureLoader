@github @private @ignore
Feature: Load Feature files from a private Github repository so that
  feature files can be run against all modules in the application.

  In order to : Increase application stability
  As a        : Quality Assurance Engineer
  I want to   : Run feature files from a central repository

  Scenario: Load files from a private Github repository
    Given I want to load feature files from a private Github repository.
    When  The loader has finished loading the Github repository.
    Then  I will have access to the feature files in the private Github repository.

  Scenario: Error when trying to load files from a private Github repository with invalid credentials
    Given I want to load feature files from a private Github repository with invalid credentials
    Then  I must receive an authentication error from Github