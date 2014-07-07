'use strict'

angular.module('<%= scriptAppName %>')
  <% if(filters.ngroute) { %>.config ($routeProvider) ->
    $routeProvider
    .when('/applicant',
      templateUrl: 'app/applicant/applicant.html'
      controller: 'ApplicantCtrl'
    )<% } %><% if(filters.uirouter) { %>.config ($stateProvider) ->
    $stateProvider
    .state('applicant',
      url: '/applicant',
      templateUrl: 'app/applicant/applicant.html'
      controller: 'ApplicantCtrl'
    )<% } %>
