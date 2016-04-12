angular.module('StockDeal.directives',[])
    .directive('passwordConfirm',function(){
        return {
            restrict: 'A',
            scope: {
                password: '=passwordConfirm'
            },
            require: '?ngModel',
            link: function(scope, element, attrs,ctrl){
                ctrl.$validators.confirm = function(modelValue){
                    if(ctrl){
                        if(scope.password){
                            return modelValue === scope.password;
                        }
                    }
                }
            }
        }
    })
    .directive('alertContainer',function($interval){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/directories/partials/template-alert.html',
            scope: {
                info: '='
            },
            link: function(scope, element, attrs){
            }
        }
    })