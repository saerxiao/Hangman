'use strict';


// Declare app level module which depends on filters, and services
angular.module('hangman', ['hangman.filters', 'hangman.services', 'hangman.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {templateUrl: 'partials/welcome.html', controller: WelcomeCtrl});
    $routeProvider.when('/game', {templateUrl: 'partials/game.html', controller: GameCtrl});
    $routeProvider.otherwise({redirectTo: '/welcome'});
  }]);
