var app = angular.module('myApp');

app.controller('MovieController', function ($scope, MovieService, $location, $routeParams) {
    var vm = this;
    var movieId = $routeParams.id;
    vm.movie = {};

    vm.getMovieById = function () {
        MovieService.getById(movieId).then(function (data) {
            vm.movie = data;
        });
    };

    vm.getMovieById();

});