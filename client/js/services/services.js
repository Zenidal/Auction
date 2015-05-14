var baseUrl = "http://localhost:1337/";


angular.module('app.services', ['ngResource'])
    .factory('loginService', [
        '$resource', function ($resource) {
            return $resource(baseUrl + "Login", {}, {

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
                role: undefined,
                name: undefined
            };

            var login = function (loginData) {
                var data = "name=" + loginData.name + "&role=" + loginData.role;
                var deferred = $q.defer();
                $http.get(baseUrl + "Login" + '?' + data.toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, data: data }).success(function (response) {
                    
                    authentication.isAuth = true;
                    authentication.role = loginData.role;
                    authentication.name = loginData.name;
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
                authentication.role = undefined;
                authentication.name = undefined;
                $rootScope.authentication = authentication;
            }

            authServiceFactory.login = login;
            authServiceFactory.logOut = logOut;
            authServiceFactory.authentication = authentication;

            return authServiceFactory;
        }
    ]);