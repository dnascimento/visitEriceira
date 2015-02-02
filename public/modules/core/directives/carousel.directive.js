'use strict';

var core = angular.module('core');


core.directive('hasOwlCarousel', function() {
    return {
        restrict: 'A',
        link: function($scope, $element) {
            $scope.$watch('dishes', function(value) {
                $scope.owl = $($element).children('.owl-carousel').owlCarousel({
                    lazyLoad: true,
                    loop: false,
                    margin: 15,
                    nav:false,
                    responsiveClass:true,
                    responsive:{
                        0:{ items:1},
                        600:{ items:3 },
                        1000:{items:4}
                    }
                });

                $scope.next = function(){
                    $scope.owl.trigger('next.owl.carousel');
                };

                $scope.prev = function(){
                    $scope.owl.trigger('prev.owl.carousel');
                };
            });
        }
    };
});
