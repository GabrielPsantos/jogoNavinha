var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/index.htm"
    })
    .when("/red", {
        templateUrl : "views/red.htm"
    })
    .when("/green", {
        templateUrl : "views/green.htm"
    })
    .when("/blue", {
        templateUrl : "views/blue.htm"
    });
});

app.run(['$rootScope',
function ($rootScope) {

   $rootScope.nomeUsuario = "";

}]);
