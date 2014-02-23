#Feature: URL Loader
#  In order: to be able to keep my files wherever I want
#  As a : Developer
#  I want : to be able to load my files from a URL
#
#  Scenario: Load files from a public Github repository
#    Given A public Github url with a Glob Pattern "**/*.feature"
#    Then I must load the given files :
#      | sample.feature       |
#      | nested.feature       |
#      | deeplynested.feature |
#
#  Scenario: Load files from a private Github repository
#    Given A private Github url with a Glob Pattern "**/*.feature" and valid Credentials
#    Then I must load the given files :
#      | sample.feature       |
#      | nested.feature       |
#      | deeplynested.feature |
#
#  Scenario: Error when trying to load files from a private Github repository with invalid credentials
#    Given A private Github url with invalid Credentials
#    Then I must receive an authentication error from Github