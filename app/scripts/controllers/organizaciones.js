'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
    .controller('OrganizacionesCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$window', '$stateParams', '$location', function ($scope, API_PATH_MEDIA, contenidoFactory, $window, $stateParams, $location) {

      $scope.slider = [{}];
      $scope.quehacemos = [{}];
      $scope.utimasvacantes = [{}];
      $scope.descripcioquienesomos = "";
      $scope.tituloquienesomos = "";
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;
      $scope.hacemoss = [];
      $scope.ver = true;
      $scope.idiomaLocal = $window.localStorage.idioma;
      $scope.dialog = false;

      console.log($location.path().split("/")[$location.path().split("/").length - 1]);
      //console.log($stateParams.idioma);
      //if ($location.path().split("/")[$location.path().split("/").length - 1] == 'en') {
      //    $window.localStorage.idioma = 'en_EN';
      //    $scope.idiomaLocal = 'en_EN';
      //    $window.location.assign('/#!/en');
      //}
      //else {
      //    $window.localStorage.idioma = 'es_MX';
      //    $scope.idiomaLocal = 'es_MX';
      //    $window.location.assign('/#!/es');
      //}

      $scope.calcular = function () {

          if ($window.localStorage.idioma == 'es_MX') {
              $scope.idiomaLocal = 'es_MX';
              //$location.path('/organizaciones/top/es').replace();
          }
          else {
              $scope.idiomaLocal = 'en_EN';
              //$location.path('/organizaciones/top/en').replace();
          }
          $scope.slider = $scope.slider;
          $scope.hacemoss = $scope.hacemoss;          
      }

      $scope.$watch($scope.calcular);

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
                  descripcion_en: data.data[i].descripcion_en,
                  imagen: data.data[i].imagen,
                  texto: data.data[i].texto,
                  texto_en: data.data[i].texto_en,
                  color: $scope.color[i]
              })
          }
          //console.log($scope.hacemoss);
      });

      //Vacantes Cubiertas
      contenidoFactory.ServiceContenido('fcm/vacantes-cubiertas/', 'GET', '{}').then(function (data) {
          //console.log(data.data);
          $scope.utimasvacantes = data.data;
      });

      //Modal
      contenidoFactory.ServiceContenido('catalogs/company-services/?format=json', 'GET', '{}').then(function (data) {
        $scope.modal.services = data.data
        //_dataservicio = data.status;
        if (data.status == '-1' || data.status == '500' || data.status == '400') {
            _data = contenidoFactory.mensaje(ev, "Algo salio mal, por favor vuele a cargar la página");
        };
    });

    $scope.modal = {
        "name": "",
        "email": "",
        "phone_number": "",
        "services": [],
        "comments": ""
    }

    //$scope.postula = function (ev) {
    //    ventana();
    //};

    $scope.postula = function (ev) {
        $scope.dialog = true;

        $(function () {
            $("#dialog-confirm").dialog({
                open: function (event, ui) {
                    $(".ui-dialog-titlebar-close", ui.dialog).hide();
                    $(".ui-dialog-titlebar", ui.dialog).hide();
                    //$('body').css('overflow', 'hidden');
                },
                show: {
                    effect: "fade",
                    duration: 100
                },
                hide: {
                    effect: "fade",
                    duration: 100
                },
                resizable: false,
                height: "auto",
                width: 800,
                modal: true,
                buttons: [
                    {
                        text: 'Enviar',
                        open: function () { $(this).addClass('md-primary md-confirm-button md-button md-autofocus md-ink-ripple md-default-theme') }, //will append a class called 'b' to the created 'OK' button.
                        click: function () {
                            if ($scope.modal.name != "" && $scope.modal.email) {
                                $scope.isClick = true;
                                $(this).dialog("close");
                                $('body').css('overflow', 'scroll');
                                $scope.dialog = false;

                                contenidoFactory.ServicePerfil('contact-services/', 'POST', {
                                    "name": $scope.modal.name,
                                    "email": $scope.modal.email,
                                    "phone_number": $scope.modal.phone_number,
                                    "services": $scope.modal.servicios,
                                    "comments": $scope.modal.comments
                                }).then(function (data) {
                                    console.log(data);
                                    $(this).dialog("close");
                                    //$('body').css('overflow', 'scroll');
                                    $scope.dialog = false;
                                    contenidoFactory.mensaje(ev, "Datos enviados");
                                });
                            }
                        }
                    },
                    {
                        text: "Cerrar", //md-primary md-cancel-button md-button md-ink-ripple md-default-theme
                        open: function () { $(this).addClass('md-primary md-cancel-button md-button md-ink-ripple md-default-theme') }, //will append a class called 'b' to the created 'OK' button.
                        click: function () {                               
                            $(this).dialog("close");
                            //$('body').css('overflow', 'scroll');
                            $scope.dialog = false;
                            //console.log($scope.modal.servicios);
                        }
                    }
                ]
            });
        });
    }

  }]);
