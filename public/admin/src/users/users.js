angular.module('StockDeal.users',['ui.router'])
    .config(function($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('users', {
                url: '/users',
                authenticate: true,
                abstract: true,
                resolve: {
                    'listUser': function(User){
                        return User.list();
                    }
                },
                views: {
                    'home-view': {
                        templateUrl: 'templates/main.html'
                    }
                }
            })
            .state('users.list', {
                url: '',
                authenticate: true,
                views: {
                    'list-view': {
                        templateUrl: 'src/users/users.list.html',
                        controller: function ($scope,listUser,User) {
                            $scope.users = listUser;
                            $scope.activate = function(id,$index){
                                User.update(id).then(function(snipshot){
                                    $scope.users.splice($index,1);
                                    $scope.users.push(snipshot.user);
                                }, function(error){
                                    console.log(error);
                                });
                            }
                        }
                    }
                }
            })
    })
    .factory('User',['$http','API', '$q', function($http,API,$q){
        var factory = {
            list: function(){
                var deferred = $q.defer();
                $http.get(API.adminApi + '/user')
                    .success(function(data){
                        deferred.resolve(data);
                    }).error(function(err){
                        deferred.reject(err);
                    })
                return deferred.promise;
            },
            update: function(id){
                var deferred = $q.defer();
                $http.put(API.adminApi + '/user/'+id)
                    .success(function(data){
                        deferred.resolve(data);
                    }).error(function(err){
                        deferred.reject(err);
                    })
                return deferred.promise;
            }
        };
        return factory;
    }]);