angular.module('StockDeal',[
    'StockDeal.auth',
    'StockDeal.factories',
    'StockDeal.directives',
    'ui.router',
    'ngMessages',
    'toaster'
])
    .run(["$rootScope","$state", function($rootScope, $state){
        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error){
            if(error.status === 401){
                $state.go('login');
            }
        });
    }])
    .constant('API',{
        frontApi: '/api/front'
    })
    .config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('home',{
                url: '/',
                views: {
                    'home-view': {
                        template: 'Welcome to my website'
                    }
                }
            });
        $urlRouterProvider.otherwise('login');
    })