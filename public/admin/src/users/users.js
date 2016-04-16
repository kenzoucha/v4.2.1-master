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
angular.module('StockDeal.fournisseurs.service',[])
    .factory('fournisseurs',['$resource','API', function($resource,API){
        var Fourni = $resource(API.adminApi + '/fourni/:_id',null,{
            'update': {method: 'PUT', params: {_id: '@_id'}}
        });
        var factory = {};
        factory.all = function(){
            return Fourni.query();
        }
        factory.get = function(id){
            return Fourni.get(id);
        }
        factory.fourni = Fourni;

        return factory;


    }]);
