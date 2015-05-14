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

    .controller('UsersCtrl', ['$scope', '$location', 'authService', 'getUsersService', '$interval',
        function ($scope, $location, authService, getUsersService, $interval) {
            if (!authService.authentication.isAuth) {
                $location.path('/Login');
            } else {
                $scope.currentUser = authService.authentication;

                var usersListInterval = $interval(function () {
                    if ($scope.refreshUsersListTime == 0) {
                        $scope.refreshUsersList();
                    } else {
                        $scope.refreshUsersListTime--;
                    }
                }, 1000);

                $scope.refreshUsersList = function () {
                    $scope.refreshUsersListTime = 3;
                    $scope.usersList = getUsersService.query();
                }

                $scope.refreshUsersList();
                $scope.$on('$destroy', function () {
                    $interval.cancel(usersListInterval);
                });
            }
        }]);

