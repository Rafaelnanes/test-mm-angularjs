var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toastr']).config(config).run(run);

function config($httpProvider, $routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'app/views/main/main.html',
            controller: 'MainController',
            controllerAs: 'vm'
        })
        .when('/movie/:id', {
            templateUrl: 'app/views/movie/movie.html',
            controller: 'MovieController',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });
}

function run($rootScope, $location, $window, CONSTANTS) {



}