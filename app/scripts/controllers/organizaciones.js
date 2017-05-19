'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('OrganizacionesCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', function ($scope, API_PATH_MEDIA, contenidoFactory) {

      $scope.slider = [{}];
      $scope.quehacemos = [{}];
      $scope.utimasvacantes = [{}];
      $scope.descripcioquienesomos = "";
      $scope.tituloquienesomos = "";
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;
      $scope.hacemoss = [];
      $scope.ver = true;

      $scope.vermas = function () {
          $scope.ver = false;
      }

      $scope.vermenos = function () {
          $scope.ver = true;
      }

      $scope.color = {
          color: '#37B34A',
          color: '#FBAE25',
          color: '#E34A26',
          color: '#A51840',
          color: '#372A7C',
          color: '#26A9E0'
      }

      $scope.hovertexto = function (obj) {
          $scope.tituloquienesomos = obj.texto;
          $scope.descripcioquienesomos = obj.descripcion;
      }

      $scope.hovertextoout = function () {
          $scope.tituloquienesomos = "";
          $scope.descripcioquienesomos = "";
      }

      //Slider
      contenidoFactory.ServiceContenido('fcm/organizaciones-info/', 'GET', '{}').then(function (data) {
          //console.log(data.data);
          $scope.slider = data.data
      });

      //Que hacemos
      contenidoFactory.ServiceContenido('fcm/que-hacemos-org/', 'GET', '{}').then(function (data) {
          //$scope.quehacemos = data.data
          $scope.color = ['#37B34A', '#FBAE25', '#E34A26', '#A51840', '#372A7C', '#26A9E0'];
          for (var i = 0; i < data.data.length; i++) {
              $scope.hacemoss.push({
                  descripcion: data.data[i].descripcion,
                  imagen: data.data[i].imagen,
                  texto: data.data[i].texto,
                  color: $scope.color[i]
              })
          }
          console.log($scope.hacemoss);
      });

      //Vacantes Cubiertas
      contenidoFactory.ServiceContenido('fcm/vacantes-cubiertas/', 'GET', '{}').then(function (data) {
          console.log(data.data);
          $scope.utimasvacantes = data.data;
      });

  }]);
