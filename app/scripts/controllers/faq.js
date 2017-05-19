﻿'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('FaqCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', 'filterFilter', function ($scope, API_PATH_MEDIA, contenidoFactory, filterFilter) {

      $scope.candidatos = [{}];
      $scope.organizaciones = [{}];
      $scope.faq = [{}];
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;

      //faq
      contenidoFactory.ServiceContenido('fcm/faq/', 'GET', '{}').then(function (data) {
          
          for (var x = 0; x < data.data.length; x++) {
              if (data.data[x].categoria == "Candidatos") {
                  console.log(data.data[x]);
                  $scope.candidatos.push(data.data[x]);
              }
              else {
                  $scope.organizaciones.push(data.data[x]);
              }
          }

          $scope.candidatos.splice(0, 1);
          $scope.organizaciones.splice(0, 1);
      });
  }]);