'use strict';

var core = angular.module('core');


core.directive('slider',function($interval,$window){
    return{
        restrict : 'AE', //attribute element
        replace: true,
        templateUrl: '/modules/core/views/slider.view.html',
        scope: {
            slides: '=',
            speed: '@',
            width: '@',
            height: '@',
            preview: '@'
        },

        controller: function($scope){
            $scope.slideIndex = 0;
            $scope.images = [];
            //add first image
            $scope.images.push($scope.slides[$scope.slideIndex]);

            //set interval to load next image
            $interval(function(){
                $scope.images = [];
                $scope.slideIndex = ($scope.slideIndex + 1) % $scope.slides.length;
                $scope.images.push($scope.slides[$scope.slideIndex]);
            },$scope.speed);
        },
        link: function ($scope,element,attrs){
            var resize = function(windowWidth) {
                if($(element).children().length == 0){
                    return 0;
                }
                var naturalWidth = $scope.width;
                var naturalHeight = $scope.height;

                var newHeight = Math.round(windowWidth * (naturalHeight/naturalWidth));
                $(element).height(newHeight);
            };

            resize();

            $scope.$watch(function(){
                return $window.innerWidth;
            }, resize);
        }
    };
});
