#FullStackBDD-FeatureLoader

##Intallation

```
npm install fullstackbdd-featureloader --save-dev
```

##What is it?

You can read the motivations for the project In this Blog post [GIven, When, Then time to create a new Cucumber-js project](http://blog.dropshape.com/given-when-then-time-to-create-a-new-cucumber-js-project/). A quick summary would be that this project is to be a part of a larger project that I aim to write to enable the running of Feature files from a NodeJS application. One of the requirements for me is the ability to load those feature files from either the local file system or to be able to keep them in a remote github repository. Hence this FeatureLoader which technically can load any file from Github or the filesystem. It can also be easily extended with other types of file loaders so if you have a favorite place to store your feature files why not contribute a loader?

Trello board for tracking this is located on this [FullStackBDD-FeatureLoader](https://trello.com/b/WThTEnVT/fullstack-cucumber)

###Intended Structure
The file loader has been built with a certain project structure in mind. This structure allows you to keep all your Feature files for both the server and client under one central repository instead of having to have feature files in both your server and client side repositories.

```
- REPO:Client
    |_Step_definitions
- REPO:Server
    |_Step_definitions
- REPO:Features
    |_Feature1
    |_Feature2
```

But of course you can use any structure you like for your projects this is just a suggestion.

##Usage

```
new FeatureLoader( new GitHubLoader(pattern, url), new FileSystemLoader(pattern));
```

##Running the tests
```npm test``` or ```grunt test```

##Contributing

##Changelog