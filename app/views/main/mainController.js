var app = angular.module('myApp');

app.controller('MainController', function ($scope, ShoppingService, $location) {
    var vm = this;
    vm.movies = [];


    vm.getAllMovies = function () {
        ShoppingService.getAll().then(function (data) {
            vm.movies = data;
        });
    };

    vm.info = function (id) {
        $location.path('/movie/' + id);
    };

    vm.getAllMovies();
});