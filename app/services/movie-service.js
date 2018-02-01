angular.module('myApp').service('MovieService', function ($http, $rootScope, $window, CONSTANTS) {

    var getById = function (id) {
        return $http.get(CONSTANTS.API_URL + '/movie/' + id).then(function (response) {
            return response.data;
        });
    };

    return {
        getById: getById
    };
});