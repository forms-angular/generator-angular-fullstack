'use strict';

angular.module('<%= scriptAppName %>', [<%= angularModules %>])
  <% if(filters.ngroute) { %>.config(function ($routeProvider<% if(filters.auth) { %>, $httpProvider<% } %>) {
    $routeProvider.otherwise({redirectTo: '/'});

  <% if(filters.auth) { %>
    $httpProvider.interceptors.push('authInterceptor');<% } %>
  })<% } %><% if(filters.uirouter) { %>.config(function ($stateProvider, $urlRouterProvider, $locationProvider<% if(filters.auth) { %>, $httpProvider<% } %>) {
    $urlRouterProvider
      .otherwise('/');

  <% if(filters.auth) { %>
    $httpProvider.interceptors.push('authInterceptor');<% } %>
  })<% } %><% if(filters.auth) { %>

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on(<% if(filters.ngroute) { %>'$routeChangeStart'<% } %><% if(filters.uirouter) { %>'$stateChangeStart'<% } %>, function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  })<% } %>;

  formsAngular.config(['cssFrameworkServiceProvider', 'routingServiceProvider', function (cssFrameworkService, routingService) {
      routingService.start(
        {
          html5Mode: true,
<% if(filters.auth) { %>add2fngRoutes: {authenticate: true} , <% } %>
          prefix:'/data',
          routing: '<% if(filters.ngroute) { %>ngroute<% } %><% if(filters.uirouter) { %>uirouter<% } %>'
        }
      );
      cssFrameworkService.setOptions({framework: '<% if(filters.bs3) { %>bs3<% } %><% if(filters.bs2) { %>bs2<% } %>'});
      }]);
