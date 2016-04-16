
angular.module('StockDeal.fourniseurs',['ui.router'])
    .config(function($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('four-list', {
                url: '/four-list',
                views: {
                    'four-list-view': {
                        templateUrl: 'src/fournisseur/fournisseurs-list.html',
                        }}
    })
            .factory('Fourni',['$http','API', '$q', function($http,API,$q){
                var factory = {
                    list: function(){
                        var deferred = $q.defer();
                        $http.get(API.adminApi + '/fourni')
                            .success(function(data){
                                deferred.resolve(data);
                            }).error(function(err){
                            deferred.reject(err);
                        })
                        return deferred.promise;
                    },
                    update: function(id){
                        var deferred = $q.defer();
                        $http.put(API.adminApi + '/fourni/'+id)
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
    });