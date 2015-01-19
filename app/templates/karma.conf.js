// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'client/bower_components/jquery/dist/jquery.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/forms-angular/dist/forms-angular.js',
      'client/bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      'client/bower_components/angular-elastic/elastic.js',
      'client/bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/angular-route/angular-route.js',<% if(filters.uibootstrap) { %>
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',<% } %>
      'client/bower_components/lodash/dist/lodash.compat.js',<% if(filters.socketio) { %>
      'client/bower_components/angular-socket-io/socket.js',<% } %><% if(filters.uirouter) { %>
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',<% } %><% if (filters.uiDate) { %>
      'client/bower_components/angular-ui-date/src/date.js',<% } %><% if (filters.jqUpload) { %>
      'client/bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
      'client/bower_components/blueimp-file-upload/js/jquery.fileupload.js',
      'client/bower_components/blueimp-file-upload/js/jquery.fileupload-angular.js',
      'client/bower_components/fng-jq-upload/dist/fng-jq-upload.js',<% } %><% if (filters.reports) { %>
      'client/bower_components/ng-grid/build/ng-grid.min.js',<% } %><% if (filters.ckeditor) { %>
      'client/bower_components/ckeditor/ckeditor.js',
      'client/bower_components/ng-ckeditor/ng-ckeditor.js',<% } %><% if (filters.uiSelect) { %>
      'client/bower_components/angular-ui-select/dist/select.js',
      'client/bower_components/fng-ui-select/src/fng-ui-select.js',<% } %><% if (filters.select2) { %>
      'client/bower_components/select2/select2.js',
      'client/bower_components/angular-ui-select2/src/select2.js',<% } %>
      'client/app/app.js',
      'client/app/**/*.js',
      'client/components/**/*.js',
      'client/app/**/*.html',
      'client/components/**/*.html'
    ],

    preprocessors: {
      '**/*.html': 'html2js'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    ngJade2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
