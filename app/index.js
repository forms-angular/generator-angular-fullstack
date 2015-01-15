'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var genUtils = require('../util.js');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var wiredep = require('wiredep');

var pluginChoices = [{
  name: 'jQuery UI date picker',
  value: 'uiDate',
  dep: '\'ui.date\'',
  jQueryUI: true,
  checked: true
},{
  name: 'Columnar reporting',
  value: 'reports',
  dep: '\'ngGrid\'',
  jQueryUI: false,
  checked: true
},{
  name: 'Fully featured text / HTML editor',
  value: 'ckeditor',
  dep: '\'ngCkeditor\'',
  jQueryUI: true,
  checked: true
},{
  name: 'Enhanced select control',
  value : 'select2',
  dep: '\'ui.select2\'',

  // After ui-select is published, then
  // value: 'uiSelect',
  // dep:  '\'fng.uiSelect\'',

  jQueryUI: false,
  checked: true
},{
 name: 'File uploader',
 value: 'jqUpload',
 dep: '\'uploadModule\'',
 jQueryUI: false,
 checked: true
}
];

var AngularFullstackGenerator = yeoman.generators.Base.extend({

  init: function () {
    this.argument('name', { type: String, required: false });
    this.appname = this.name || path.basename(process.cwd());
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

    this.option('app-suffix', {
      desc: 'Allow a custom suffix to be added to the module name',
      type: String,
      required: 'false'
    });
    this.scriptAppName = this.appname + genUtils.appName(this);
    this.appPath = this.env.options.appPath;
    this.pkg = require('../package.json');
    this.filters = {};
  },

  info: function () {
    this.log(this.yeoman);
    this.log(
      'Out of the box I include Bootstrap, Mongoose and some AngularJS recommended modules.\n'
    );
  },

  checkForConfig: function() {
    var cb = this.async();

    if(this.config.get('filters')) {
      this.prompt([{
        type: "confirm",
        name: "skipConfig",
        message: "Existing .yo-rc configuration found, would you like to use it?",
        default: true
      }], function (answers) {
        this.skipConfig = answers.skipConfig;

        // NOTE: temp(?) fix for #403
        if(typeof this.oauth==='undefined') {
          var strategies = Object.keys(this.filters).filter(function(key) {
            return key.match(/Auth$/) && key;
          });

          if(strategies.length) this.config.set('oauth', true);
        }

        cb();
      }.bind(this));
    } else {
      cb();
    }
  },

  clientPrompts: function() {

    if(this.skipConfig) return;
    var cb = this.async();

    this.log('# Client\n');

    this.prompt([/*{
        type: "list",
        name: "script",
        message: "What would you like to write scripts with?",
        choices: [ "JavaScript", "CoffeeScript"],
        filter: function( val ) {
          var filterMap = {
            'JavaScript': 'js',
            'CoffeeScript': 'coffee'
          };

          return filterMap[val];
        }
      }, {
        type: "list",
        name: "markup",
        message: "What would you like to write markup with?",
        choices: [ "HTML", "Jade"],
        filter: function( val ) { return val.toLowerCase(); }
      }, {
        type: "list",
        name: "stylesheet",
        default: 1,
        message: "What would you like to write stylesheets with?",
        choices: [ "CSS", "Sass", "Less"],
        filter: function( val ) { return val.toLowerCase(); }
      },{
      type: "list",
      name: "framework",
      message: "Which CSS framework would you like to use?",
      choices: [ "Twitter Bootstrap 3.1.1", "Twitter Bootstrap 2.3.2 (deprecated)"],
      filter: function( val ) {
        var retVal = 'bs2';
        if (val === "Twitter Bootstrap 3.1.1") {
          retVal = 'bs3';
        }
        return retVal;
      }
    }, */{
      type: 'checkbox',
      name: 'plugins',
      message: 'Which plugins would you like to include?',
      choices: pluginChoices
    },{
        type: "list",
        name: "router",
        default: 0,
        message: "What Angular router would you like to use?",
        choices: [ "ngRoute", "uiRouter"],
        filter: function( val ) { return val.toLowerCase(); }
      }
    ], function (answers) {
        answers.framework = 'bs3';
        this.filters[answers.framework] = true;
        this.filters.js = true;
        this.filters.html = true;
        this.filters.css = true;
        this.filters[answers.router] = true;
        answers.plugins.forEach(function(chosenPlugin) {
          var thisPlugin = this._.find(pluginChoices, function(choice) {
            return (choice.value == chosenPlugin);
          });
          if (!thisPlugin) { throw new Error("Plugin inconsistency"); }
          if (thisPlugin.values) {
            var offset = (answers.framework === 'bs2') ? 0 : 1;
            this.filters[thisPlugin.values[offset]] = true;
            thisPlugin.dep = thisPlugin.deps[offset]
          } else {
            this.filters[chosenPlugin] = true;
          }
          if (thisPlugin.jQueryUI) {
            this.filters.jQueryUI = true;
          }
        }.bind(this));
        cb();
      }.bind(this));
  },

  serverPrompts: function() {
    if(this.skipConfig) return;
    var cb = this.async();
    var self = this;

    this.log('\n# Server\n');

    this.prompt([/*{
      type: "confirm",
      name: "mongoose",
      message: "Would you like to use mongoDB with Mongoose for data modeling?"
    },*/{
      type: "confirm",
      name: "auth",
      message: "Would you scaffold out an authentication boilerplate?"/*,
      when: function (answers) {
        //return answers.mongoose;
        return true;
      }*/
    }, {
      type: 'checkbox',
      name: 'oauth',
      message: 'Would you like to include additional oAuth strategies?',
      when: function (answers) {
        return answers.auth;
      },
      choices: [
        {
          value: 'googleAuth',
          name: 'Google',
          checked: false
        },
        {
          value: 'facebookAuth',
          name: 'Facebook',
          checked: false
        },
        {
          value: 'twitterAuth',
          name: 'Twitter',
          checked: false
        }
      ]
    }, {
      type: "confirm",
      name: "socketio",
      message: "Would you like to use socket.io?",
      // to-do: should not be dependent on mongoose
      /*
      when: function (answers) {
        return answers.mongoose;
      },*/
      default: true
    }], function (answers) {
      if(answers.socketio) this.filters.socketio = true;
      this.filters.mongoose = true;
      if(answers.auth) this.filters.auth = true;
      if(answers.oauth) {
        if(answers.oauth.length) this.filters.oauth = true;
        answers.oauth.forEach(function(oauthStrategy) {
          this.filters[oauthStrategy] = true;
        }.bind(this));
      }

      cb();
    }.bind(this));
  },

  saveSettings: function() {
    if(this.skipConfig) return;
    this.config.set('insertRoutes', true);
    this.config.set('registerRoutesFile', 'server/routes.js');
    this.config.set('routesNeedle', '// Insert routes below');

    this.config.set('routesBase', '/api/');
    this.config.set('pluralizeRoutes', true);

    this.config.set('insertSockets', true);
    this.config.set('registerSocketsFile', 'server/config/socketio.js');
    this.config.set('socketsNeedle', '// Insert sockets below');

    this.config.set('filters', this.filters);
    this.config.forceSave();
  },

  compose: function() {
    if(this.skipConfig) return;
    var appPath = 'client/app/';
    var extensions = [];
    var filters = [];

    if(this.filters.ngroute) filters.push('ngroute');
    if(this.filters.uirouter) filters.push('uirouter');
    if(this.filters.coffee) extensions.push('coffee');
    if(this.filters.js) extensions.push('js');
    if(this.filters.html) extensions.push('html');
    if(this.filters.jade) extensions.push('jade');
    if(this.filters.css) extensions.push('css');
    if(this.filters.stylus) extensions.push('styl');
    if(this.filters.sass) extensions.push('scss');
    if(this.filters.less) extensions.push('less');

    this.composeWith('ng-component', {
      options: {
        'routeDirectory': appPath,
        'directiveDirectory': appPath,
        'filterDirectory': appPath,
        'serviceDirectory': appPath,
        'filters': filters,
        'extensions': extensions,
        'basePath': 'client'
      }
    }, { local: require.resolve('generator-ng-component/app/index.js') });
  },

  ngModules: function() {
    this.filters = this.config.get('filters');
    var angModules = [
      "'ngCookies'",
      "'formsAngular'",
      "'ngResource'",
      "'ngSanitize'",
      "'ui.bootstrap'"
    ];
    if(this.filters.ngroute) angModules.unshift("'ngRoute'");     // routing options need to precede formsangular
    if(this.filters.socketio) angModules.push("'btford.socket-io'");
    if(this.filters.uirouter) angModules.unshift("'ui.router'");

    pluginChoices.forEach(function(plugin) {
      if (this.filters[plugin.value])
        angModules.push(plugin.dep);
    }.bind(this));

    this.angularModules = "\n  " + angModules.join(",\n  ") +"\n";
  },

  generate: function() {
    this.sourceRoot(path.join(__dirname, './templates'));
    genUtils.processDirectory(this, '.', '.');
  },

  end: function() {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});

module.exports = AngularFullstackGenerator;
