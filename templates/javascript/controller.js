'use strict';

angular.module('<%= scriptAppName %>')
  .controller('<%= classedName %>Ctrl', function ($scope, $http) {
    $scope.messages = ['What Ho','Splendid','Jolly Good', 'Top Hole', 'Oh I Say'];  // Just so the controller has something to do
    $scope.message = $scope.messages[Math.floor(Math.random()*$scope.messages.length)];
  });
