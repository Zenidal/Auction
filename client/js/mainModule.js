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
            .when('/Users',
                    {
                        templateUrl: 'views/admin.html',
                        controller: 'AdminCtrl'
                    });
}]);

dutchAuction.run([
    'authService', function (authService) {
        authService.fillAuthData();
    }
]);