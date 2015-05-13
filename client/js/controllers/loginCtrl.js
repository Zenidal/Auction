var loginCtrl = angular.module('app.loginCtrl', ['ngCookies'])
        .controller('LoginCtrl', ['$scope', '$http', '$cookieStore', '$location',
            function ($scope, $http, $cookieStore, $rootScope, $location) {
                $scope.submit = submit;

                function submit() {
                    $http({method: 'GET',
                        url: 'http://auction/Auction/server/server_name', //server url
                        params: {'username': $scope.user_name, 'role': $scope.role}})
                            .success(function (data) {
                                $cookieStore.put('username', data.username);
                            })
                            .error(function () {
                                $location.path = '/Error';
                            });
                }
            }]);

