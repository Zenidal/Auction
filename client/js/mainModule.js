var dutchAuction = angular.module('dutchAuctionApp', ['ngRoute', 'app.loginCtrl', 'app.adminCtrl']);
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
                .when('/Admin',
                        {
                            templateUrl: 'views/admin.html',
                            controller: 'AdminCtrl'
                        });
    }]);