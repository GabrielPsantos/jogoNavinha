var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/app_angular/views/index.htm"
    })
    .when("/red", {
        templateUrl : "/app_angular/views/red.htm"
    })
    .when("/green", {
        templateUrl : "/app_angular/views/green.htm"
    })
    .when("/blue", {
        templateUrl : "/app_angular/views/blue.htm"
    });
});

app.run(['$rootScope',
function ($rootScope) {

   $rootScope.nomeUsuario = "";

}]);
