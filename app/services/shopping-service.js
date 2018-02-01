angular.module('myApp').service('ShoppingService', function ($http, $rootScope, $window, CONSTANTS) {

    var getAll = function () {
        return $http.get(CONSTANTS.API_URL + '/shopping').then(function (response) {
            return response.data;
        });
    };

    return {
        getAll: getAll
    };
});