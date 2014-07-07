'use strict';

angular.module('<%= scriptAppName %>')
  <% if(filters.ngroute) { %>.config(function ($routeProvider) {
    $routeProvider
      .when('/applicant', {
        templateUrl: 'app/applicant/applicant.html',
        controller: 'ApplicantCtrl'
      });
  });<% } %><% if(filters.uirouter) { %>.config(function ($stateProvider) {
    $stateProvider
      .state('applicant', {
        url: '/applicant',
        templateUrl: 'app/applicant/applicant.html',
        controller: 'ApplicantCtrl'
      });
  });<% } %>
