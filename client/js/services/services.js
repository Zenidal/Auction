var baseUrl = "http://localhost:1337/";


angular.module('app.services', ['ngResource'])
    .factory('getGameStateService', [
        '$resource', function ($resource) {
            return $resource(baseUrl + "GetGameState", {}, {

            });
        }
    ])
    .factory('setCurrentStateService', [
        '$resource', function ($resource) {
            return $resource(baseUrl + "SetCurrentState", {}, {

            });
        }
    ])
    .factory('userService', [
        '$resource', function ($resource) {
            return $resource(baseUrl + "GetUser", {}, {

            });
        }
    ])
    .factory('createGameService', [
        '$resource', function ($resource) {
            return $resource(baseUrl + "CreateGame", {}, {

            });
        }
    ])
    .factory('stopGameService', [
        '$resource', function ($resource) {
            return $resource(baseUrl + "StopGame", {}, {

            });
        }
    ])
    .factory('statsService', [
        '$resource', function ($resource) {
            return $resource(baseUrl + "GetStats", {}, {

            });
        }
    ])
    .factory('buyProductService', [
        '$resource', function ($resource) {
            return $resource(baseUrl + "BuyProduct", {}, {

            });
        }
    ])
    .factory('startGameService', [
        '$resource', function ($resource) {
            return $resource(baseUrl + "StartGame", {}, {

            });
        }
    ])
    .factory('getMService', [
        '$resource', function ($resource) {
            return $resource(baseUrl + "GetM", {}, {

            });
        }
    ])
    .factory('getSessionService', [
        '$resource', function ($resource) {
            return $resource(baseUrl + "GetSession", {}, {

            });
        }
    ])
    .factory('getUsersService', [
        '$resource', function ($resource) {
            return $resource(baseUrl + "GetUsers", {}, {
            });
        }
    ])
    .factory('authService', [
        '$http', '$q', '$rootScope',
        function ($http, $q, $rootScope) {
            var authServiceFactory = {};
            var authentication = {
                isAuth: false,
                id: 0,
                role: undefined,
                name: undefined,
                money: 0,
            };

            var login = function (loginData) {
                var data = "name=" + loginData.name + "&role=" + loginData.role;
                var deferred = $q.defer();
                $http.get(baseUrl + "Login" + '?' + data.toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, data: data }).success(function (response) {

                    authentication.isAuth = true;
                    authentication.id = response;
                    authentication.role = loginData.role;
                    authentication.name = loginData.name;
                    authentication.money = loginData.money;
                    $rootScope.authentication = authentication;
                    deferred.resolve(response);

                }).error(function (err, status) {
                    logOut();
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            var logOut = function () {
                authentication.isAuth = false;
                authentication.id = 0;
                authentication.role = undefined;
                authentication.name = undefined;
                authentication.money = 0;
                $rootScope.authentication = authentication;
            };

            authServiceFactory.login = login;
            authServiceFactory.logOut = logOut;
            authServiceFactory.authentication = authentication;

            return authServiceFactory;
        }
    ]);