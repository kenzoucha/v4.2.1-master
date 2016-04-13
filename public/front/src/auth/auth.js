angular.module('StockDeal.auth',['ui.router','ngMessages'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('login',{
                url: '/login',
                views: {
                    'login-view': {
                        templateUrl: 'src/auth/page-login.html',
                        controller: function($scope,Auth,toaster,$timeout,$state,$rootScope){
                            $scope.user = {};
                            $scope.login = function(){
                                $rootScope.navShow = false;
                                $scope.loader = true;
                                $timeout(function(){
                                    Auth.login($scope.user)
                                        .then(function(data){
                                            $scope.loader = false;
                                            $state.transitionTo('account');
                                        }, function(error){
                                            $scope.loader = false;
                                            console.log(error);

                                        })
                                },3000);
                            }
                        }
                    }
                }
            })
            .state('register',{
                url: '/register',
                views: {
                    'register-view': {
                        templateUrl: 'src/auth/page-register.html',
                        controller: function ($scope,Auth,$interval) {
                            $scope.register = function(){
                                if($scope.form.$valid){
                                    $scope.loader = true;
                                    Auth.register($scope.user).then(function(data){
                                        $scope.loader = false;
                                        $scope.info = data;
                                        $interval(function(){
                                            $scope.info = false;
                                        },5000)
                                        $scope.user = {};
                                    }, function(error){
                                        console.log(error);
                                    })
                                }
                            }
                        }
                    }
                }
            })
            .state('account',{
                url: '/account',
                views: {
                    'account-view': {
                        templateUrl: 'src/auth/page-account.html',
                        resolve: {
                            "currentAuth": ["Auth",function(Auth){
                                return Auth.session();
                            }]
                        },
                        controller: function ($scope,currentAuth,Auth,$state,$rootScope) {
                                $rootScope.navShow = true;
                                $scope.user = currentAuth.user;
                            $scope.logout= function(){
                                 Auth.logout().then(function(data){
                                     $rootScope.navShow = false;
                                    console.log(data);
                                     $state.transitionTo('login');
                                 }, function(error){
                                    console.log(error);
                                 });
                            }
                        }
                    }
                }
            })





        .state('edit',{
            url: '/profile',
            views: {
                'profile-view': {

                    templateUrl: 'src/auth/profile.edit.html',
                    resolve: {
                        "currentAuth": ["Auth",function(Auth){
                            return Auth.session();
                            console.log('hhhh');
                        }]
                    },
                    controller: function ($scope,currentAuth,Auth,$state,$rootScope,categories) {
                        console.log('hhhh');
                        $scope.categories = categories.all();
                            }
            }
        }});


    });
