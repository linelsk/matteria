'use strict';

angular.module('tcsGruntApp')
  .controller('LoginCtrl', ['$scope', '$http', 'API_PATH_MEDIA', 'contenidoFactory', 'API_PATH', '$window', '$mdToast', '$stateParams', function ($scope, $http, API_PATH_MEDIA, contenidoFactory, API_PATH, $window, $mdToast, $stateParams) {

      $scope.ingresa = {};
      $scope.ingresaOrganizacion = {};
      $scope.disablep = "";
      $scope.disableo = "";
      $scope.classregistro
      $scope.idiomaLocal = $window.localStorage.idioma;

      $scope.calcular = function () {

          if ($window.localStorage.idioma == 'es_MX') {
              $scope.idiomaLocal = 'es_MX';
          }
          else {
              $scope.idiomaLocal = 'en_EN';
          }
          $scope.matteria = $scope.matteria;

      }

      $scope.$watch($scope.calcular);

      if ($stateParams.user == "postulante") {
          $scope.disableo = false;
          $scope.disablep = true;
          $scope.classregistro = "col-xs-12 col-md-6 col-md-offset-3 text-left"
          //col-xs-12 col-md-6 col-md-offset-4
      }
      if ($stateParams.user == "organizacion") {
          $scope.disableo = true;
          $scope.disablep = false;
          $scope.classregistro = "col-xs-12 col-md-6 col-md-offset-3 text-left"
      }
      if ($stateParams.user == "ambos") {
          $scope.disableo = true
          $scope.disablep = true;
          $scope.classregistro = "col-xs-12 col-md-6 text-left"
      }

      $scope.entrarPostulante = function (ev) {

          contenidoFactory.login($scope.ingresa.email, $scope.ingresa.contrasena, 'candidates/login/').then(function (data) {
              //console.log(data.token);
              if (data.response == "Sesión exitosa") {
                  location.href = "/";
                  $window.localStorage.role = "POSTULANTE";
                  $window.localStorage.token = data.token;
                  $window.localStorage.avatar = data.avatar;
                  $window.localStorage.nombre = data.name;
                  $window.localStorage.id_user = data.id_user;
                  $window.localStorage.id_candidate = data.id_candidate;
              }
              else {
                  contenidoFactory.mensaje(ev, data.response);
                  //$mdToast.show($mdToast.simple().content(data.response).parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
              }
              
          });
      }

      $scope.entrarOrganizacion = function (ev) {

          contenidoFactory.login($scope.ingresaOrganizacion.email, $scope.ingresaOrganizacion.contrasena, 'companies/login/').then(function (data) {
              console.log(data);
              if (data.response == "Sesión exitosa") {                  
                  $window.localStorage.role = "ORGANIZACION";
                  $window.localStorage.token = data.token;
                  $window.localStorage.avatar = data.logo;
                  $window.localStorage.nombre = data.name;
                  $window.localStorage.id_user = data.id_user;
                  $window.localStorage.id_company = data.id_company;
                  $window.localStorage.info_candidate = data.info_candidate;

                  location.href = "/";
              }
              else {
                  //$mdToast.show($mdToast.simple().content(data.response).parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
                  contenidoFactory.mensaje(ev, data.response);
              }

          });
      }

      $scope.recuperarcontrasena = function (ev) {
          contenidoFactory.ServiceContenido('users/password/reset/', 'POST', {
              "email": $scope.ingresaOrganizacion.recuperar
          }).then(function (data) {
              console.log(data.data.response);
              if (data.data.response != undefined)
              {
                  //$mdToast.show($mdToast.simple().content("Nueva contraseña enviada correctamente").parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
                  contenidoFactory.mensaje(ev, "Si este email existe en nuestro sistema, ya te enviamos una nueva contraseña");
              }
          });
      }
  }]);
