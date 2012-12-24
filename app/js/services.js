'use strict';

/* Services */

angular.module('hangman.services', ['ngResource']).
  factory('Problem', function($resource){
  return $resource('problems/problems.json', {}, {});
});
