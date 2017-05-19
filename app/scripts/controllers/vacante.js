'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('VacanteCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$stateParams', '$window', '$mdDialog', function ($scope, API_PATH_MEDIA, contenidoFactory, $stateParams, $window, $mdDialog) {

      $scope.vacante = [{}];
      $scope.compania = [{}];
      $scope.rango = [{}];
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;
      $scope.postulado = false;
      $scope.dialog = false;
      var newLine = escape("\n");
      var url = "<a href'" + window.location.href + "'>" + window.location.href + "</a>"
      $scope.vacanteurl = 'mailto:?subject=Mira esta vacante en matteria, me parece que te puede interesar.&body=' + newLine + window.location.href + newLine + '';
      $scope.role = $window.localStorage.role;

      $scope.doTheBack = function () {
          $window.history.back();
      };


      //function ventana($scope) {
      //    $scope.hide = function () {
      //        $mdDialog.hide();
      //    };

      //    $scope.cancel = function () {
      //        $mdDialog.cancel();
      //    };

      //    $scope.getsalario = function () {
      //        contenidoFactory.ServicePerfil('openings/applications/create/', 'POST', {
      //            "candidate": $window.localStorage.id_candidate,
      //            "opening": $stateParams.id,
      //            "salary_min": $scope.rango.filterdesde,
      //            "salary_max": $scope.rango.filterhasta
      //        }).then(function (data) {
      //            $window.location.href = "/postulacionrecibida";
      //        });
      //    };
      //}

      $scope.postula = function (ev) {
          if (contenidoFactory.session()) {
              if ($scope.vacante.private_salary) {
                  ventana();
              }
              else {
                  contenidoFactory.ServicePerfil('openings/applications/create/', 'POST', {

                      "candidate": $window.localStorage.id_candidate,
                      "opening": $stateParams.id,
                      "salary_min": null,
                      "salary_max": null
                  }).then(function (data) {
                      $window.location.href = "/postulacionrecibida";
                      //console.log(data);
                  });
              }
          }
          else {
              $window.location.href = "/registro/postulante";
          }
      }

      //Vacante
      contenidoFactory.ServiceContenido('openings/' + $stateParams.id + '/?format=json', 'GET', '{}').then(function (data) {
          console.log(data.data);
          $scope.vacante = data.data;
          contenidoFactory.ServiceContenido('companies/' + data.data.company_id + '/', 'GET', '{}').then(function (respuesta) {
              //console.log(respuesta.data);
              $scope.compania = respuesta.data;
          });
      });

      contenidoFactory.ServicePerfil('openings/' + $stateParams.id + '/applied/?format=json', 'GET', '{}').then(function (data) {
          $scope.postulado = data.applied;
      });

      function ventana() {
          $scope.dialog = true;

          $(function () {
              $("#dialog-confirm").dialog({
                  open: function (event, ui) {
                      $(".ui-dialog-titlebar-close", ui.dialog).hide();
                      $(".ui-dialog-titlebar", ui.dialog).hide();
                      $('body').css('overflow', 'hidden');
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
                  width: 400,
                  modal: true,
                  buttons: [
                    {
                        text: 'Enviar',
                        open: function () { $(this).addClass('md-primary md-confirm-button md-button md-autofocus md-ink-ripple md-default-theme') }, //will append a class called 'b' to the created 'OK' button.
                        click: function () {
                            contenidoFactory.ServicePerfil('openings/applications/create/', 'POST', {
                                "candidate": $window.localStorage.id_candidate,
                                "opening": $stateParams.id,
                                "salary_min": $scope.desde,
                                "salary_max": $scope.hasta
                            }).then(function (data) {
                                $window.location.href = "/postulacionrecibida";
                            });
                        }
                    },
                    {
                        text: "Cancelar", //md-primary md-cancel-button md-button md-ink-ripple md-default-theme
                        open: function () { $(this).addClass('md-primary md-cancel-button md-button md-ink-ripple md-default-theme') }, //will append a class called 'b' to the created 'OK' button.
                        click: function () {
                            $(this).dialog("close");
                            $('body').css('overflow', 'scroll');
                            $scope.dialog = false;
                        }
                    }
                  ]
              });
          });
      }
      
  }]);
