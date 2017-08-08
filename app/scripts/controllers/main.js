'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('MainCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$interpolate', 'API_PATH', '$window', function ($scope, API_PATH_MEDIA, contenidoFactory, $interpolate, API_PATH, $window) {

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
      $scope.idiomaLocal = $window.localStorage.idioma;
      $scope.text = "";

      $scope.Indicators = "";
      $scope.Wrapper = "";
      $scope.IndicatorsEsp = "";
      $scope.WrapperEsp = "";
      $scope.IndicatorsIn = "";
      $scope.WrapperIn = "";

      //console.log($scope.idiomaLocal);
      

      $scope.calcular = function () {

          if ($window.localStorage.idioma == 'es_MX') {
              $scope.idiomaLocal = 'es_MX';
              $scope.Indicators = $scope.IndicatorsEsp;
              $scope.Wrapper = $scope.WrapperEsp;
          }
          else {
              $scope.idiomaLocal = 'en_EN';
              $scope.Indicators = $scope.IndicatorsIn;
              $scope.Wrapper = $scope.WrapperIn;
          }
          $scope.fastfacts = $scope.fastfacts;
          $scope.ofertas = $scope.ofertas;
          $scope.quehacemos = $scope.quehacemos;
          $scope.comofunciona = $scope.comofunciona;
          
      }

      $scope.$watch($scope.calcular);

      //Carrousel
      carrousel();
      function carrousel() {
          contenidoFactory.ServiceContenido('fcm/sliders/', 'GET', '{}').then(function (data) {
              //(data);             

              $scope.IndicatorsEsp += '<ol class="carousel-indicators">';
              for (var i = 0; i < data.data.length; i++) {
                  switch (i) {
                      case 0:
                          $scope.IndicatorsEsp += '<li data-target="#myCarousel" data-slide-to="' + i + '" class="active"></li>'
                          $scope.WrapperEsp += '<div class="item active">' +
                                            '<img src="' + API_PATH_MEDIA + data.data[i].imagen + '" />' +
                                            '<div class="carousel-caption">' +
                                            '<span class="negrita hidden-xs">' + data.data[i].mensaje + '</span>' +
                                            '</div>' +
                                            '<div class="carousel-caption-boton">' +
                                            '<a href="/quienessomos/manifiesto#manifiesto" class="btn btn-lg btn-primary btn-banner hidden-xs hidden-sm">' + data.data[i].mensaje_boton + '</a>' +
                                            '<a href="/quienessomos/manifiesto#manifiesto" class="btn btn-xs btn-primary btn-banner hidden-lg hidden-md">' + data.data[i].mensaje_boton + '</a>' +
                                            '</div>' +
                                            '</div>';
                          break;
                      default:
                          $scope.IndicatorsEsp += '<li data-target="#myCarousel" data-slide-to="' + i + '"></li>'
                          $scope.WrapperEsp += '<div class="item">' +
                                            '<img src="' + API_PATH_MEDIA + data.data[i].imagen + '" />' +
                                            '<div class="carousel-caption">' +
                                            '<span class="negrita hidden-xs">' + data.data[i].mensaje + '</span>' +
                                            '</div>' +
                                            '<div class="carousel-caption-boton">' +
                                            '<a href="/quienessomos/manifiesto#manifiesto" class="btn btn-lg btn-primary btn-banner hidden-xs hidden-sm">' + data.data[i].mensaje_boton + '</a>' +
                                            '<a href="/quienessomos/manifiesto#manifiesto" class="btn btn-xs btn-primary btn-banner hidden-lg hidden-md">' + data.data[i].mensaje_boton + '</a>' +
                                            '</div>' +
                                            '</div>';
                  }

              }

              $scope.IndicatorsIn += '<ol class="carousel-indicators">';
              $scope.IndicatorsIn += '<ol class="carousel-indicators">';
              for (var i = 0; i < data.data.length; i++) {
                  switch (i) {
                      case 0:
                          $scope.IndicatorsIn += '<li data-target="#myCarousel" data-slide-to="' + i + '" class="active"></li>'
                          $scope.WrapperIn += '<div class="item active">' +
                                            '<img src="' + API_PATH_MEDIA + data.data[i].imagen + '" />' +
                                            '<div class="carousel-caption">' +
                                            '<span class="negrita hidden-xs">' + data.data[i].mensaje_en + '</span>' +
                                            '</div>' +
                                            '<div class="carousel-caption-boton">' +
                                            '<a href="/quienessomos/manifiesto#manifiesto" class="btn btn-lg btn-primary btn-banner hidden-xs hidden-sm">' + data.data[i].mensaje_boton_en + '</a>' +
                                            '<a href="/quienessomos/manifiesto#manifiesto" class="btn btn-xs btn-primary btn-banner hidden-lg hidden-md">' + data.data[i].mensaje_boton_en + '</a>' +
                                            '</div>' +
                                            '</div>';
                          break;
                      default:
                          $scope.IndicatorsIn += '<li data-target="#myCarousel" data-slide-to="' + i + '"></li>'
                          $scope.WrapperIn += '<div class="item">' +
                                            '<img src="' + API_PATH_MEDIA + data.data[i].imagen + '" />' +
                                            '<div class="carousel-caption">' +
                                            '<span class="negrita hidden-xs">' + data.data[i].mensaje_en + '</span>' +
                                            '</div>' +
                                            '<div class="carousel-caption-boton">' +
                                            '<a href="/quienessomos/manifiesto#manifiesto" class="btn btn-lg btn-primary btn-banner hidden-xs hidden-sm">' + data.data[i].mensaje_boton_en + '</a>' +
                                            '<a href="/quienessomos/manifiesto#manifiesto" class="btn btn-xs btn-primary btn-banner hidden-lg hidden-md">' + data.data[i].mensaje_boton_en + '</a>' +
                                            '</div>' +
                                            '</div>';
                  }

              }

              $scope.IndicatorsEsp += '</ol>';
              $scope.IndicatorsIn += '</ol>';
          });
      }

      //Fast Facts
      contenidoFactory.ServiceContenido('fcm/fast-facts/', 'GET', '{}').then(function (data) {
          $scope.fastfacts = data.data;
      });

      //Ofertas destacadas
      contenidoFactory.ServiceContenido('openings/', 'GET', '{}').then(function (data) {

          //console.log(data.data.results.length);
          var content = [];
          var text = [];
          for (var i = 0; i < data.data.results.length; i++) {
              //console.log(content[i]);
              $scope.ofertas.push({
                  company_logo: data.data.results[i].company_logo,
                  name: data.data.results[i].name,
                  company: data.data.results[i].company,
                  activities: htmlToPlaintext(data.data.results[i].activities),
                  keep_company_alias: data.data.results[i].keep_company_alias,
                  alternate_company_alias: data.data.results[i].alternate_company_alias,
                  alternate_company_description: data.data.results[i].alternate_company_description,
                  id: data.data.results[i].id
              });
              //$scope.ofertas.push(content[i]);
          }

          console.log($scope.ofertas);
      });

      function htmlToPlaintext(text) {
          return text ? String(text).replace(/<[^>]+>/gm, '') : '';
      }

      //Que hacemos
      contenidoFactory.ServiceContenido('fcm/que-hacemos/', 'GET', '{}').then(function (data) {
          //console.log(data);
          $scope.quehacemos = data.data;
      });

      //Como funciona
      contenidoFactory.ServiceContenido('fcm/como-funciona/', 'GET', '{}').then(function (data) {
          //console.log(data.data);
          $scope.comofunciona = data.data;
      });

      //Registro profesional
      contenidoFactory.ServiceContenido('fcm/reg-pro/', 'GET', '{}').then(function (data) {
          $scope.regpro = data.data;
          //console.log(data);
      });

      //Registro organizacion
      contenidoFactory.ServiceContenido('fcm/reg-org/', 'GET', '{}').then(function (data) {
          //console.log(data);
          $scope.regorg = data.data;
      });

      //Nuestros aliados
      contenidoFactory.ServiceContenido('fcm/aliados/', 'GET', '{}').then(function (data) {
          //.log(data.data);
          $scope.aliados = data.data;
      });

      //Carrousel Clientes
      contenidoFactory.ServiceContenido('fcm/clientes/', 'GET', '{}').then(function (data) {
          //.log(data.data);
          $scope.Wrapper_slider1 = data.data;

      });

      //Blog
      contenidoFactory.ServiceContenido('fcm/blog/', 'GET', '{}').then(function (data) {
          //console.log(data);
          $scope.text = data.data[0].descripcion;
          $scope.blog = data.data;

      });

  }]);
