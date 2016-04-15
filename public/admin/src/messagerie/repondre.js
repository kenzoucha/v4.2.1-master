/**
 * Created by Kenza on 15/04/2016.
 */
angular.module('StockDeal.messagerie',['ui.router'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('repondre', {
                url: '/repondre',
                views: {
                    'repondre-view': {

                        templateUrl: 'src/messagerie/repondre.html',

                    }
                }
            })
    });