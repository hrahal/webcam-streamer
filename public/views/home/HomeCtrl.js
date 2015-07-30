var home = angular.module('app.view.home', []);

home.controller('HomeCtrl', [
    '$scope',
    '$http',
    function ($scope, $http) {
        $http.get('/port')
            .success(function (data) {
                console.log(data);
                $scope.port = data;
            }).error(function (err) {
                console.log(err);
            });
    }]);
