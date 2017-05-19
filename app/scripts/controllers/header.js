'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('HeaderCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$window', function ($scope, API_PATH_MEDIA, contenidoFactory, $window) {
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;
      $scope.avatar = $window.localStorage.avatar;
      $scope.nombre = $window.localStorage.nombre;

      $scope.salir = function () {
          $window.localStorage.token = "";
          $window.localStorage.role = "";
          $window.location.assign('/ingresa');
      }

      contenidoFactory.ServiceContenido('fcm/logos/?format=json', 'GET', '{}').then(function (data) {
          $scope.logo = data.data
          CargarImagenes();
          //console.log($scope.logo);
          
      });

      function CargarImagenes() {
          $(".post-carga").each(function () {
              $(this).attr('src', $(this).data('src')).on('load', function () {
                  $(this).fadeIn();
              });
          })
      }

  }]);
