'use strict';

/**
 * @ngdoc overview
 * @name tcsGruntApp
 * @description
 * # tcsGruntApp
 *
 * Main module of the application.
 */
angular
  .module('tcsGruntApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngMaterial',
    'rzModule',
    'vAccordion',
    'permission',
    'permission.ui',
    'xeditable',
    'ngImgCrop',
    'ngPagination',
    'jkAngularRatingStars',
    'textAngular'
  ])
  .constant('API_PATH', 'http://138.197.87.134:8002/api/')
  .constant('API_PATH_MEDIA', 'http://138.197.87.134:8002')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $qProvider, $httpProvider)
  {
      //$httpProvider.defaults.headers.common = {};
      //$httpProvider.defaults.headers.post = {};
      //$httpProvider.defaults.headers.put = {};
      //$httpProvider.defaults.headers.patch = {};
      //$httpProvider.defaults.headers.get = {};

      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            //data: {
            //    permissions: {
            //        only: ['ANONIMO'],
            //        redirectTo: 'login'
            //    }
            //}
        })
        .state('configuracion', {
            url: '/configuracion',
            templateUrl: 'views/configuracion.html',
            controller: 'ConfiguracionPostulanteCtrl'
        })
        .state('perfilorganizacion', {
            url: '/perfilorganizacion',
            templateUrl: 'views/perfilorganizacion.html',
            controller: 'PerfilOrganizacionesCtrl',
            data: {
                permissions: {
                    only: ['ORGANIZACION'],
                    redirectTo: '/'
                }
            }
        })
        .state('publicacionesoferta', {
            url: '/publicacionesoferta',
            templateUrl: 'views/publicacionesoferta.html',
            controller: 'OfertasCtrl'
        })
        .state('misofertaspublicadas', {
            url: '/misofertaspublicadas',
            templateUrl: 'views/misofertaspublicadas.html',
            controller: 'MainCtrl'
        })
        .state('verpostulantes', {
            url: '/verpostulantes/:id',
            templateUrl: 'views/verpostulantes.html',
            controller: 'VerPostulantesCtrl'
        })
        .state('perfilpostulante', {
            url: '/perfilpostulante',
            templateUrl: 'views/perfilpostulante.html',
            controller: 'PerfilPostulanteCtrl'
        })
      .state('organizaciones', {
          url: '/organizaciones/:scrollTo',
          templateUrl: 'views/organizaciones.html',
          controller: 'OrganizacionesCtrl',
          onEnter: function ($location, $stateParams, $anchorScroll, $timeout) {
              $timeout(function () {
                  $location.hash($stateParams.scrollTo);
                  $anchorScroll()
              }, 200)
          }
      })
      .state('clientes', {
          url: '/clientes',
          templateUrl: 'views/clientes.html',
          controller: 'ClientesCtrl'
      })
      .state('quienessomos', {
          url: '/quienessomos/:scrollTo',
          templateUrl: 'views/quienessomos.html',
          controller: 'QuienesSomosCtrl',
          onEnter: function ($location, $stateParams, $anchorScroll, $timeout) {
              $timeout(function () {
                  $location.hash($stateParams.scrollTo);
                  $anchorScroll()
              }, 200)
          }
      })
      .state('configuracionorganizacion', {
          url: '/configuracionorganizacion',
          templateUrl: 'views/configuracionorganizacion.html',
          controller: 'ConfiguracionOrganizacionCtrl'
      })
      .state('ingresa', {
          url: '/ingresa/:user',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
      })
      .state('registro', {
          url: '/registro/:user',
          templateUrl: 'views/registro.html',
          controller: 'RegistroCtrl'
      })
      .state('vacante', {
          url: '/vacante/:id',
          templateUrl: 'views/vacante.html',
          controller: 'VacanteCtrl'
      })
      .state('faq', {
          url: '/faq',
          templateUrl: 'views/FAQ.html',
          controller: 'FaqCtrl'
      })
      .state('blog', {
          url: '/blog',
          templateUrl: 'views/blog.html',
          controller: 'MainCtrl'
      })
       .state('comofunciona', {
           url: '/comofunciona/:scrollTo',
           templateUrl: 'views/comofunciona.html',
           controller: 'ComoFuncionaCtrl',
           onEnter: function ($location, $stateParams, $anchorScroll, $timeout) {
               $timeout(function () {
                   $location.hash($stateParams.scrollTo);
                   $anchorScroll()
               }, 200)
           }
       })
      .state('perfilpublicopostulante', {
          url: '/perfilpublicopostulante',
          templateUrl: 'views/perfilpublicopostulante.html',
          controller: 'PerfilPostulanteCtrl'
      })
      .state('perfilpublicoorganizacion', {
          url: '/perfilpublicoorganizacion/:id',
          templateUrl: 'views/perfilpublicoorganizacion.html',
          controller: 'PerfilPublicoOrganizacionesCtrl'
      })
      .state('viewoferta', {
          url: '/viewoferta/:id',
          templateUrl: 'views/viewoferta.html',
          controller: 'ViewOfertasCtrl'
      })
      .state('perfilcompartidopostulante', {
          url: '/perfilcompartidopostulante/:id',
          templateUrl: 'views/perfilcompartidopostulante.html',
          controller: 'PerfilCompartidoPostulanteCtrl'
      })
      .state('misvacantes', {
          url: '/misvacantes',
          templateUrl: 'views/misvacantes.html',
          controller: 'MisVacanteCtrl'
      })
      .state('politicasdeprivacidad', {
          url: '/politicasdeprivacidad',
          templateUrl: 'views/politicasdeprivacidad.html',
          controller: 'MisVacanteCtrl'
      })
      .state('recuperarcontrasena', {
          url: '/recuperarcontrasena',
          templateUrl: 'views/recuperarcontrasena.html',
          controller: 'LoginCtrl'
      })
      .state('vacanterecibida', {
          url: '/vacanterecibida',
          templateUrl: 'views/vacanterecibida.html',
          controller: 'AboutCtrl'
      })
      .state('postulacionrecibida', {
          url: '/postulacionrecibida',
          templateUrl: 'views/postulacionrecibida.html',
          controller: 'AboutCtrl'
      })
      .state('mispostulaciones', {
          url: '/mispostulaciones',
          templateUrl: 'views/mispostulaciones.html',
          controller: 'MisPostulacionesCtrl'
      })
      .state('graciasregistropostulante', {
          url: '/graciasregistropostulante',
          templateUrl: 'views/graciasregistropostulante.html',
          controller: 'AboutCtrl'
      })
      .state('graciasregistroorganizacion', {
          url: '/graciasregistroorganizacion',
          templateUrl: 'views/graciasregistroorganizacion.html',
          controller: 'AboutCtrl'
      })
      .state('perfil', {
          url: '/perfil/:user',
          templateUrl: 'views/perfil.html',
          controller: 'PerfilCtrl'
      })
      .state('perfilo', {
          url: '/perfilo/:user',
          templateUrl: 'views/perfilo.html',
          controller: 'PerfilOCtrl'
      })
      .state('politicasantidiscriminacion', {
          url: '/politicasantidiscriminacion',
          templateUrl: 'views/politicasantidiscriminacion.html',
          controller: 'AboutCtrl'
      })
      .state('comofuncionahead', {
          url: '/comofuncionahead',
          templateUrl: 'views/comofuncionahead.html',
          controller: 'ComoFuncionaCtrl'
      })
      
      $qProvider.errorOnUnhandledRejections(false);
      $locationProvider.html5Mode(true);

     
  })
  .run(function ($rootScope, $location, $window, PermRoleStore, contenidoFactory, editableOptions) {

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

          //console.log(toState.name);
          var sesion = contenidoFactory.session();
          switch(toState.name) {
              case "configuracionorganizacion":
                  if (!sesion) {
                          $window.location.assign('/login');
                     }
                  break;
              case "misofertaspublicadas":
                  if (!sesion) {
                      $window.location.assign('/login');
                  }
                  break;
              case "perfilpostulante":
                  if (!sesion) {
                      $window.location.assign('/login');
                  }
                  break;
              default:
                  ""
          }
          //if (toState.name == 'quienessomos' && !sesion) {
          //    $window.location.assign('/#!/main');
          //}

      });

      PermRoleStore.defineManyRoles({
          'ANONIMO': function () {
              if (contenidoFactory.role() == null) {
                  return true;
              }
              return false;
          },
          'POSTULANTE': function () {
              if (contenidoFactory.role() == "POSTULANTE") {
                  return true;
              }
              return false;

          },
          'ORGANIZACION': function () {
              if (contenidoFactory.role() == "ORGANIZACION") {
                  return true;
              }
              return false;

          }
      });

  });



