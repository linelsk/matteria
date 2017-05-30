'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('MainCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', function ($scope, API_PATH_MEDIA, contenidoFactory) {

      $scope.fastfacts = [{}];
      $scope.ofertas = [{}];
      $scope.quehacemos = [{}];
      $scope.comofunciona = [{}];
      $scope.regpro = [{}];
      $scope.regorg = [{}];
      $scope.aliados = [{}];
      $scope.clientes = [{}];
      $scope.Wrapper_slider1 = [{}];
      $scope.blog = [{}];
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;

      $scope.text = "";

      //botones
      $scope.href = function (obj) {
          console.log(obj);
      }

      //Carrousel
      contenidoFactory.ServiceContenido('fcm/sliders/', 'GET', '{}').then(function (data) {
          console.log(data)
          $scope.Indicators = "";
          $scope.Wrapper = "";

          $scope.Indicators += '<ol class="carousel-indicators">';          
          for(var i = 0; i<data.data.length; i++)
          {
              switch(i) {
                  case 0:
                      $scope.Indicators += '<li data-target="#myCarousel" data-slide-to="' + i + '" class="active"></li>'
                      $scope.Wrapper += '<div class="item active">' +
                                        '<img src="' + API_PATH_MEDIA + data.data[i].imagen + '" />' +
                                        '<div class="carousel-caption">' +
                                        '<span class="negrita hidden-xs">' + data.data[i].mensaje + '</span>' +
                                        '</div>' +
                                        '<div class="carousel-caption-boton">' +
                                        '<a href="/quienessomos/manifiesto#manifiesto" class="btn btn-lg btn-primary btn-banner">' + data.data[i].mensaje_boton + '</a>' +
                                        '</div>' +
                                        '</div>';
                      break;
                  default:
                      $scope.Indicators += '<li data-target="#myCarousel" data-slide-to="' + i + '"></li>'
                      $scope.Wrapper += '<div class="item">' +
                                        '<img src="' + API_PATH_MEDIA + data.data[i].imagen + '" />' +
                                        '<div class="carousel-caption">' +
                                        '<span class="negrita hidden-xs">' + data.data[i].mensaje + '</span>' +
                                        '</div>' +
                                        '<div class="carousel-caption-boton">' +
                                        '<a href="/quienessomos/manifiesto#manifiesto" class="btn btn-lg btn-primary btn-banner">' + data.data[i].mensaje_boton + '</a>' +
                                        '</div>' +
                                        '</div>';
              }
                                  
          }
          
          $scope.Indicators += '</ol>';

          console.log($scope.Indicators);
      });

      //Fast Facts
      contenidoFactory.ServiceContenido('fcm/fast-facts/', 'GET', '{}').then(function (data) {

          $scope.fastfacts = data.data;
      });

      //Ofertas destacadas
      contenidoFactory.ServiceContenido('fcm/ofertas-destacadas/', 'GET', '{}').then(function (data) {
          //console.log(data.data);
          $scope.ofertas = data.data;
      });

      //Que hacemos
      contenidoFactory.ServiceContenido('fcm/que-hacemos/', 'GET', '{}').then(function (data) {
          $scope.quehacemos = data.data[0].imagen;
      });

      //Como funciona
      contenidoFactory.ServiceContenido('fcm/como-funciona/', 'GET', '{}').then(function (data) {
          $scope.comofunciona = data.data[0].imagen;
      });

      //Registro profesional
      contenidoFactory.ServiceContenido('fcm/reg-pro/', 'GET', '{}').then(function (data) {
          $scope.regpro = data.data;
      });

      //Registro organizacion
      contenidoFactory.ServiceContenido('fcm/reg-org/', 'GET', '{}').then(function (data) {
          $scope.regorg = data.data;
      });

      //Nuestros aliados
      contenidoFactory.ServiceContenido('fcm/aliados/', 'GET', '{}').then(function (data) {
          console.log(data.data);
          $scope.aliados = data.data;
      });

      //Carrousel Clientes
      contenidoFactory.ServiceContenido('fcm/clientes/', 'GET', '{}').then(function (data) {;
          console.log(data.data);
          $scope.Wrapper_slider1 = data.data;

      });

      //Blog
      contenidoFactory.ServiceContenido('fcm/blog/', 'GET', '{}').then(function (data) {;
          $scope.text = data.data[0].descripcion;
          $scope.blog = data.data;

      });

  }]);
