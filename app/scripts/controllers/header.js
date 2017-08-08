'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('HeaderCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$window', '$http', '$translate', function ($scope, API_PATH_MEDIA, contenidoFactory, $window, $http, $translate) {
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;
      $scope.avatar = $window.localStorage.avatar;
      $scope.nombre = $window.localStorage.nombre;
      $scope.classs = 'cargador'

      if ($window.localStorage.idioma == undefined) {
          $scope.idiomaLocal = $window.localStorage.idioma = 'es_MX'; 
      }

      $scope.salir = function () {
          $window.localStorage.clear();
          $window.location.assign('/ingresa');
          $window.localStorage.idioma = 'es_MX';
      }

      contenidoFactory.ServiceContenido('fcm/logos/?format=json', 'GET', '{}').then(function (data) {
          $scope.logo = data.data
          $window.localStorage.en = API_PATH_MEDIA + $scope.logo[0].logo_en;
          $window.localStorage.es = API_PATH_MEDIA + $scope.logo[0].logo;
          CargarImagenes();
          //$scope.classs = 'display:block;';
          
      });
      
      $scope.changeLanguage = function (key) {
          //console.log(key);
          $window.localStorage.idioma = key;
          //CargarImagenes();
          //$translate.use(key);
      };
      //$window.localStorage.idioma = data.token;
     //$scope.idioma = "es_MX";
      $scope.calcular = function () {

          if ($window.localStorage.idioma == 'es_MX') {
              $scope.idiomaLocal = 'es_MX';
              $scope.lg = $window.localStorage.es;
          }
          else {
              $scope.idiomaLocal = 'en_EN';
              $scope.lg = $window.localStorage.en;
          }
         

      }

      $scope.$watch($scope.calcular);

      function CargarImagenes() {
          $(".post-carga").each(function () {
              $(this).attr('src', $(this).data('src')).on('load', function () {
                  $(this).fadeIn();
              });
          })
      }

  }]);
