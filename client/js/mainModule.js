var dutchAuction = angular.module('dutchAuctionApp', ['ngRoute', 'LocalStorageModule', 'app.services', 'app.controllers']);
dutchAuction.config(['$routeProvider', '$provide', function ($routeProvider) {
    $routeProvider
        .when('/',
                    {
                        redirectTo: '/Login'
                    })
        .when('/Error',
                    {
                        templateUrl: 'views/error.html'
                    })
        .when('/Login',
                    {
                        templateUrl: 'views/login.html',
                        controller: 'LoginCtrl'
                    })
        .when('/Game',
                    {
                        templateUrl: 'views/game.html',
                        controller: 'GameCtrl'
                    })
        .when('/Stats',
                    {
                        templateUrl: 'views/stats.html',
                        controller: 'StatsCtrl'
                    })
         .when('/Dashboard',
                    {
                        templateUrl: 'views/dashboard.html',
                        controller: 'DashboardCtrl'
                    })
        .when('/Users',
                    {
                        templateUrl: 'views/users.html',
                        controller: 'UsersCtrl'
                    });
}]);

dutchAuction.run([
    'authService', function (authService) {
    }
]);