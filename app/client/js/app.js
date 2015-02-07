'use strict';

var app = angular.module('app', ['ngRoute', 'appControllers', 'appServices', 'appDirectives']);

var appServices = angular.module('appServices', []);
var appControllers = angular.module('appControllers', []);
var appDirectives = angular.module('appDirectives', []);

var options = {};
options.api = {};
options.api.base_url = "http://localhost:3001";


app.config(['$locationProvider', '$routeProvider', 
  function($location, $routeProvider) {
    $routeProvider.
        when('/', {
           templateUrl: 'partials/connectsvn.html',
            controller: 'SVNctrl'
           
        }).
        when('/addrepository', {
            templateUrl: 'partials/addrepository.html',
            controller: 'SVNctrl'
           
        }).
            when('/adduser', {
            templateUrl: 'partials/adduser.html',
            controller: 'SVNctrl'
        }).
            when('/connectsvn', {
            templateUrl: 'partials/connectsvn.html',
            controller: 'SVNctrl'
        }).
            when('/repositorydetails', {
            templateUrl: 'partials/repositorydetails.html',
            controller: 'SVNctrl'
        }).
            when('/userdetails', {
            templateUrl: 'partials/userdetails.html',
            controller: 'SVNctrl'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);


app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});

app.run(function($rootScope, $location, $window) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        
        if ($window.sessionStorage.svnparentpath==undefined) {
            $location.path("/connectsvn");
        }
    });
});