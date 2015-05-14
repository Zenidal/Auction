angular.module('app.controllers', [])

    .controller('MainCtrl', ['$scope', '$location', 'authService',
        function ($scope, $location, authService) {

            $scope.user = authService.authentication;

            $scope.logOut = function () {
                authService.logOut();
                $location.path('/Login');
            };
        }])

    .controller('LoginCtrl', ['$scope', '$location', 'authService',
        function ($scope, $location, authService) {

            $scope.submit = submit;

            function submit() {
                authService.login({ name: $scope.user_name, role: $scope.user_role }).then(function () {
                    $location.path('/Users');
                });
            }
        }])

    .controller('AdminCtrl', ['$scope', '$http','$location',
        function ($scope, $http,  $location) {

        }]);

