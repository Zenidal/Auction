angular.module('app.controllers', [])
    .controller('MainCtrl', [
        '$scope', '$location', 'authService', 'userService', '$interval',
        function ($scope, $location, authService, userService, $interval) {

            $scope.user = authService.authentication;

            $interval(function () {
                if (authService.authentication.isAuth) {
                    $scope.user.money = userService.get({ id: authService.authentication.id }, function (result) {
                        $scope.user.money = result.money;
                    });
                }
            }, 1000);

            $scope.logOut = function () {
                authService.logOut();
                $location.path('/Login');
            };
        }])

    .controller('LoginCtrl', ['$scope', '$location', 'authService',
        function ($scope, $location, authService) {

            $scope.submit = submit;
            $scope.errorMessage = undefined;
            function submit() {
                authService.login({ name: $scope.user_name, role: $scope.user_role }).then(function () {
                    $location.path('/Users');
                }, function (error) {
                    $scope.errorMessage = "user already exists";
                });
            }
        }])

     .controller('StatsCtrl', ['$scope', '$location', 'authService', 'statsService',
        function ($scope, $location, authService, statsService) {
            $scope.stats = statsService.query();
        }])

     .controller('GameCtrl', ['$scope', '$location', 'authService', 'getSessionService', '$interval', 'getMService',
         'setCurrentStateService', '$timeout', 'getGameStateService', 'buyProductService',
        function ($scope, $location, authService, getSessionService, $interval, getMService,
            setCurrentStateService, $timeout, getGameStateService, buyProductService) {
            if (authService.authentication.isAuth == false) {
                $location.path('/Login');
            } else {

                $scope.buy = function () {
                    buyProductService.get({ sessionId: $scope.session.id, userId: authService.authentication.id });
                };

                var gameStateInterval = $interval(function () {
                    if ($scope.refreshGameStateTime == 0) {
                        $scope.refreshGameState();
                    } else {
                        $scope.refreshGameStateTime--;
                    }
                }, 1000);

                $scope.refreshGameState = function () {
                    $scope.refreshGameStateTime = 1;
                    getGameStateService.get(function (result) {
                        $scope.stateMessage = "The game was created";
                        $scope.gameState = result;
                        if (result.isBegin && result.isCreated && !$scope.isStarted) {
                            $scope.startGame();
                            $scope.isStarted = true;
                            $scope.stateMessage = "The game was started";
                        }
                    });
                };
                $scope.refreshGameState();

                $scope.startGame = function () {

                    var sessionInterval = $interval(function () {
                        if ($scope.refreshSessionTime == 0) {
                            $scope.refreshSession();
                        } else {
                            $scope.refreshSessionTime--;
                        }
                    }, 1000);


                    $scope.refreshSession = function () {
                        $scope.refreshSessionTime = 1;
                        getSessionService.get(function (result) {
                            $scope.session = result;
                            if (!result.id) {
                                $location.path('/Stats');
                            };
                        });
                    };

                    var mInterval = $interval(function () {
                        if ($scope.M > 0) {
                            $scope.M--;
                        }
                    }, 1000);


                    $scope.refreshM = function () {
                        getMService.get(function (result) {
                            $scope.M = result.data;
                            $timeout(function () {
                                setCurrentStateService.get({ id: $scope.session.id }, function () {
                                    $scope.refreshM();
                                });
                            }, result.data * 1000);
                        });
                    };
                    $scope.refreshSession();
                    $scope.refreshM();

                    $scope.$on('$destroy', function () {
                        $interval.cancel(sessionInterval);
                        $interval.cancel(mInterval);
                        $interval.cancel(gameStateInterval);
                    });
                };


            }
        }])

    .controller('DashboardCtrl', ['$scope', '$location', 'authService', 'stopGameService', 'startGameService',
        function ($scope, $location, authService, stopGameService, startGameService) {
            if (authService.authentication.role != 'admin') {
                $location.path('/Login');
            } else {
                $scope.stopGame = function () {
                    stopGameService.get();
                };

                $scope.startGame = function () {
                    startGameService.get();
                };
            }
        }])

    .controller('UsersCtrl', ['$scope', '$location', 'authService', 'getUsersService', '$interval', 'getGameStateService', 'createGameService',
        function ($scope, $location, authService, getUsersService, $interval, getGameStateService, createGameService) {
            if (authService.authentication.isAuth == false) {
                $location.path('/Login');
            } else {
                $scope.currentUser = authService.authentication;
                $scope.createGame = function () {
                    createGameService.get(function () {
                        $location.path('/Dashboard');
                    });
                };

                var usersListInterval = $interval(function () {
                    if ($scope.refreshUsersListTime == 0) {
                        $scope.refreshUsersList();
                    } else {
                        $scope.refreshUsersListTime--;
                    }
                }, 1000);

                var gameStateInterval = $interval(function () {
                    if ($scope.refreshGameStateTime == 0) {
                        $scope.refreshGameState();
                    } else {
                        $scope.refreshGameStateTime--;
                    }
                }, 1000);

                $scope.refreshGameState = function () {
                    $scope.refreshGameStateTime = 1;
                    getGameStateService.get(function (result) {
                        if (result.isCreated && $scope.currentUser.role === 'user') {
                            $location.path('/Game');
                        }
                    });
                };

                $scope.refreshUsersList = function () {
                    $scope.refreshUsersListTime = 3;
                    $scope.usersList = getUsersService.query();
                };

                $scope.refreshUsersList();
                $scope.refreshGameState();

                $scope.$on('$destroy', function () {
                    $interval.cancel(usersListInterval);
                    $interval.cancel(gameStateInterval);
                });
            }
        }]);

