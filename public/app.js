"use strict";
/*global angular*/

var app = angular.module('app', [
    'ui.router',
    'app.view.home'
]);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/');

    $stateProvider
        .state('app', {
            url: '',
            controller: 'AppCtrl',
            views: {
                'navbar': {
                    templateUrl: 'views/navbar/navbar.tpl.html',
                    controller: 'NavbarCtrl'
                },
                'main': {
                    templateUrl: 'views/main/main.tpl.html'
                }
            }
        })
        .state('app.home', {
            url: '/',
            templateUrl: 'views/home/home.tpl.html',
            controller: 'HomeCtrl'
        })
        .state('app.about', {
            url: '/about',
            templateUrl: 'views/about/about.tpl.html',
            controller: 'AboutCtrl'
        });
}]);

app.controller('AppCtrl', function () {
    //do something
});
