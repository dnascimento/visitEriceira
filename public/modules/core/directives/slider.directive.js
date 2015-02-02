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
            dir : '@'
        },

        controller: function($scope){
            $scope.slideIndex = 0;
            $scope.images = [];
            //add first image
            $scope.images.push({ src : $scope.dir + $scope.slides[$scope.slideIndex]});

            //set interval to load next image
            $interval(function(){
                $scope.images = [];
                $scope.slideIndex = ($scope.slideIndex + 1) % $scope.slides.length;
                $scope.images.push({ src : $scope.dir + $scope.slides[$scope.slideIndex]});
            },$scope.speed);
        },
        link: function ($scope,element,attrs){

            var resize = function(windowWidth) {
                if($(element).children().length == 0){
                    return 0;
                }
                var naturalWidth = $(element).attr("width");
                var naturalHeight = $(element).attr("height");

                var newHeight = Math.round(windowWidth * (naturalHeight/naturalWidth));
                console.log(newHeight);
                $(element).height(newHeight);
            };

            resize();

            $scope.$watch(function(){
                return $window.innerWidth;
            }, resize);
        }
    };
});
