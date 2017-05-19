﻿'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('PerfilCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$window', '$mdToast', '$stateParams', function ($scope, API_PATH_MEDIA, contenidoFactory, $window, $mdToast, $stateParams) {
      
      $scope.configuracion = [{}];
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;
      $scope.currentLocation = window.location.host;
      $scope.nombre = $stateParams.user

      contenidoFactory.ServicePerfil('candidates/custom-url/' + $stateParams.user + '/', 'GET', {
         
      }).then(function (data) {
          console.log(data);
          $scope.user = data
      });

  }]);