'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
  .controller('PerfilOrganizacionesCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$stateParams', '$window', 'Images', '$mdToast', function ($scope, API_PATH_MEDIA, contenidoFactory, $stateParams, $window, Images, $mdToast) {

      $scope.datosgenerales = [{}];
      $scope.API_PATH_MEDIA = API_PATH_MEDIA;
      $scope.id = $window.localStorage.id_company;
      $scope.isImage = true;
      $scope.servicess = [];
      $scope.myImage = '';
      $scope.myCroppedImage = '';
      $scope.crop = false;
      $scope.IsCiudad = true;
      $scope.currentLocation = window.location.host;

      compania();
      function compania() {
          contenidoFactory.ServicePerfil('companies/' + $window.localStorage.id_company + '/', 'GET', '{}').then(function (data) {
              $scope.company = data;
              console.log($scope.company);
              for (var i = 0; i < $scope.company.services.length; i++)
              {
                  $scope.servicess.push($scope.company.services[i].id);
              }
              //console.log($scope.servicess);
          });
      }

      //Imagen
      //$scope.setFile = function (element) {
      //    $scope.isImage = false;
      //    console.log(element.files[0]);
      //    $scope.currentFile = element.files[0];
      //    $scope.userAvatar = element.files[0];
      //    var reader = new FileReader();

      //    reader.onload = function (event) {
      //        $scope.image_source = event.target.result;
      //        //console.log($scope.image_source);
      //        $scope.$apply();

      //    }
      //    // when the file is read it triggers the onload event above.
      //    reader.readAsDataURL(element.files[0]);
      //}

      var handleFileSelect = function (evt) {
          $scope.crop = true;
          var file = evt.currentTarget.files[0];
          //$scope.userAvatar = evt.delegateTarget.files[0];
          var reader = new FileReader();
          reader.onload = function (evt) {
              //console.log(evt);
              $scope.$apply(function ($scope) {
                  $scope.myImage = evt.target.result;
                  $scope.userimg = evt.target.result.split(',')
                  $scope.userAvatar = $scope.userimg[1];
                  $scope.userExtencion = evt.target.result.split(',');
                  $scope.tipoimg = $scope.userExtencion[0].split('/')[1].split(';')[0];

                  //console.log($scope.userExtencion[0].split('/')[1].split(';')[0]);
              });
          };
          reader.readAsDataURL(file);
      };
      angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

      $scope.setimagen = function () {
          $scope.crop = false;
          $scope.isImage = false;
      }

      $scope.setimagencancelar = function () {
          $scope.crop = false;
          $scope.isImage = true;
      }


      //Paises
      contenidoFactory.ServiceContenido('catalogs/countries/?format=json', 'GET', '{}').then(function (data) {
          $scope.paises = data.data;

          contenidoFactory.ServiceContenido('catalogs/countries/' + paisId + '/states/?format=json', 'GET', '{}').then(function (data) {
              //console.log(data.data);
              $scope.estados = data.data;

          });

      });

      //Tipo
      contenidoFactory.ServiceContenido('catalogs/company-types/?format=json', 'GET', '{}').then(function (data) {
          $scope.tipos = data.data;

      });

      $scope.updatecompany = function (ev) {
          //console.log(ev);
          if ($scope.userAvatar != undefined)
          {
              contenidoFactory.ServicePerfil('companies/edit/logo/', 'PUT', {
                  "image": $scope.myCroppedImage.split(',')[1],
                  "extension": $scope.tipoimg

              }).then(function (data) {
                  console.log(data);

              });
          }
          console.log($scope.company.city);
          if ($scope.company.city == undefined || $scope.company.city == "") {
              $scope.company.city = "";
          }
          //contenidoFactory.ServicePerfil('users/' + $window.localStorage.id_user + '/edit/', 'PUT', {
          //    "first_name": "",
          //    "last_name": $scope.user.name

          //}).then(function (data) {
          //    console.log(data);

          //});

          contenidoFactory.ServicePerfil('companies/' + $window.localStorage.id_company + '/edit/profile/', 'PUT', {
              //"NIT": $scope.company.NIT,
              "name": $scope.company.name,
              "contact_name": $scope.company.contact_name,
              "contact_email": $scope.company.contact_email,
              "contact_phone_number": $scope.company.contact_phone_number,
              "contact_cellphone_number": $scope.company.contact_cellphone_number,
              "services": $scope.servicess,
              "other": "-",
              "company_type": $scope.company.tipo,
              "website": $scope.company.website,
              "country": $scope.user.pais,
              "city": $scope.company.city,
              //"show_profile_basic_info": $scope.company.show_profile_basic_info,
              "social_facebook": $scope.company.social_facebook,
              "social_twitter": $scope.company.social_twitter,
              "social_linkedin": $scope.company.social_linkedin,
              //"show_profile_social_info": $scope.company.show_profile_social_info,
              "description": $scope.company.description,
              "our_impactinfo": $scope.company.our_impactinfo,
              "billing_name": $scope.company.billing_name,
              "billing_number": $scope.company.billing_number,
              "billing_address": $scope.company.billing_address,
              "billing_country": $scope.company.billingpais,
              "billing_city": $scope.company.billing_city,
              "billing_phone_number": $scope.company.billing_phone_number,
              "custom_url": $scope.company.custom_url
          }).then(function (data) {
              if (data.name != undefined) {
                  contenidoFactory.mensaje(ev, "Tus datos se han actualizado correctamente");
              }
              //$mdToast.show($mdToast.simple().content("Tus datos se han actualizado correctamente").parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
          });
      }

      $scope.existeurl = function (ev) {
          console.log();
          var _url = $scope.user.custom_url.toString().toLowerCase();
          console.log(_url);
          contenidoFactory.ServicePerfil('candidates/custom-url/exists/', 'POST', {
              "custom_url": _url,

          }).then(function (data) {
              if (data.exists == true) {
                  //$mdToast.show($mdToast.simple().content("La url que escribiste ya esta en uso").parent($("#toast-container")).hideDelay(6000).theme('error-toast'));
                  contenidoFactory.mensaje(ev, "La url que escribiste ya esta en uso");
              }
          });
      }

      $scope.selectEstado = function () {
          //console.log("OK");
          $scope.estados = [{}];
          //$scope.company.city = "";
          contenidoFactory.ServiceContenido('catalogs/countries/' + $scope.user.pais + '/states/?format=json', 'GET', '{}').then(function (data) {
              //console.log(data.data);
              $scope.estados = data.data;

              if ($scope.estados == "") {
                  $scope.IsCiudad = false;
                  //$scope.user.city = "";
                  //if ($scope.user.city != "") {
                  //    $scope.user.city = $scope.user.city;
                  //}
                  //else {

                  //}
              }
              else {
                  $scope.IsCiudad = true;
              }
          });
      }

      $scope.selectEstadosss = function () {
          console.log("OKkl");
      }

  }]);