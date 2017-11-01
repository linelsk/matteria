'use strict';

/**
 * @ngdoc function
 * @name tcsGruntApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tcsGruntApp
 */
angular.module('tcsGruntApp')
    .controller('HeaderCtrl', ['$scope', 'API_PATH_MEDIA', 'contenidoFactory', '$window', '$http', '$translate', '$location', '$stateParams', function ($scope, API_PATH_MEDIA, contenidoFactory, $window, $http, $translate, $location, $stateParams) {
        $scope.API_PATH_MEDIA = API_PATH_MEDIA;
        $scope.avatar = $window.localStorage.avatar;
        $scope.nombre = $window.localStorage.nombre;
        $scope.classs = 'cargador'

        if ($window.localStorage.idioma == undefined) {
            $scope.idiomaLocal = $window.localStorage.idioma = 'es_MX';
        }

        if ($location.path() == '/en') {
            //console.log($location.path());
            $window.localStorage.idioma = 'en_EN';
            $scope.idiomaLocal = 'en_EN';
            //$window.location.assign('/#!/en');
        }
        else {
            //console.log($location.path());
            $window.localStorage.idioma = 'es_MX';
            $scope.idiomaLocal = 'es_MX';
            //$window.location.assign('/#!/es');
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
            console.log(key);
            //$window.localStorage.idioma = key;

            if (key == "es_MX") {
                $location.path($location.path().replace("/en", "/es")).replace();
            }
            else {
                $location.path($location.path().replace("/es", "/en")).replace();
            }
        };
        //$window.localStorage.idioma = data.token;
        //$scope.idioma = "es_MX";
        
        $scope.calcularHeader = function () {
            //console.log($stateParams.idioma);
            if ($location.path().split("/")[$location.path().split("/").length - 1] == 'en') {
                $window.localStorage.idioma = 'en_EN';
               
            }
            else {
                $window.localStorage.idioma = 'es_MX';
                
            }

            if ($window.localStorage.idioma == 'es_MX') {
                $scope.idiomaLocal = 'es_MX';
                //$scope.idioma_cambio = "es";
                $scope.lg = $window.localStorage.es;
                //var string = [];
                //string = $location.path().split('/');
                //console.log(string);
                $location.path($location.path().replace("/en", "/es")).replace();
                //$scope.idioma_cambio = "es";
                //$location.path($location.path().replace("/", "/es")).replace();
                ////console.log(string.replace("en", "es"));
                ////console.log($location.path().split('/')[$location.path().split('/').length - 1]);

            }
            else {
                $scope.idiomaLocal = 'en_EN';
                $scope.lg = $window.localStorage.en;
                //$scope.idioma_cambio = "en";
                $location.path($location.path().replace("/es", "/en")).replace();
                //$scope.idioma_cambio = "en";
                //$location.path($location.path().replace("/", "/en")).replace();
                //var string = $location.path();
                //var string = [];
                //string = $location.path().split('/');
                //console.log(string);
                //$location.path('en').replace();
                ////console.log(string.replace("es", "en"));
                //$location.path(string.replace("es", "en")).replace();
            }


        }

        $scope.$watch($scope.calcularHeader);

        function CargarImagenes() {
            $(".post-carga").each(function () {
                $(this).attr('src', $(this).data('src')).on('load', function () {
                    $(this).fadeIn();
                });
            })
        }

    }]);
