'use strict';

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
        '$http', '$q', 'localStorageService',
        function ($http, $q, localStorageService) {
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
                    console.log(localStorageService.set);
                    if (localStorageService.get('authorizationData')) {
                        localStorageService.set('authorizationData', { name: loginData.name, role: loginData.role });
                    } else {
                        localStorageService.add('authorizationData', { name: loginData.name, role: loginData.role });
                    }

                    authentication.isAuth = true;
                    authentication.role = loginData.role;
                    authentication.name = loginData.name;
                    deferred.resolve(response);

                }).error(function (err, status) {
                    logOut();
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            var logOut = function () {
                localStorageService.remove('authorizationData');
                authentication.isAuth = false;
                authentication.role = undefined;
                authentication.name = undefined;
            }

            var fillAuthData = function () {
                var authData = localStorageService.get('authorizationData');
                if (authData) {
                    authentication.isAuth = true;
                    authentication.role = authData.role;
                    authentication.name = authData.name;
                }
            }

            authServiceFactory.login = login;
            authServiceFactory.logOut = logOut;
            authServiceFactory.fillAuthData = fillAuthData;
            authServiceFactory.authentication = authentication;

            return authServiceFactory;
        }
    ]);