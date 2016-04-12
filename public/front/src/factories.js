angular.module('StockDeal.factories',[])
    .factory('Auth',['$http', '$q', 'API', function($http, $q, API){
        var factory = {
            login: function(user){
                var deferred = $q.defer();
                $http.post(API.frontApi + '/login', user)
                    .success(function(data){
                        deferred.resolve(data);
                    }).error(function(err){
                        deferred.reject(err);
                    })
                return deferred.promise;
            },
            register: function(user){
              var deferred = $q.defer();
                $http.post(API.frontApi + '/register', user)
                    .success(function(data){
                        deferred.resolve(data);
                    }).error(function(err){
                        deferred.reject(err);
                    })
                return deferred.promise;
            },
            session: function(){
                var deferred = $q.defer();
                $http.get(API.frontApi + '/session')
                    .success(function(auth){
                        deferred.resolve(auth);
                    }).error(function(error){
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            logout: function(){
                var deferred = $q.defer();
                $http.get(API.frontApi + '/logout')
                    .success(function(feedback){
                        deferred.resolve(feedback);
                    })
                    .error(function(error){
                        deferred.reject(error);
                    })
                return deferred.promise;
            }
        }
        return factory;
    }])