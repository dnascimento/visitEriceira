'use strict';

var core = angular.module('core');

core.directive('slider',function($interval){
	return{
		restrict : 'AE', //attribute element
		replace: true,
		templateUrl: '/modules/core/views/slider.view.html',
		scope: {
			slides: '=',
			speed: '@'
		},

		controller: function($scope){
			$scope.currentIndex = 0;
			$scope.images = [];

			for(var i = 0; i < $scope.slides.length; i++){
				$scope.images[i] = { src : $scope.slides[i], visible: false };
			}
			$scope.images[$scope.currentIndex].visible = true; // hide current image

			$interval(function(){
				$scope.images[$scope.currentIndex].visible = false; // hide current image
				$scope.currentIndex = ++$scope.currentIndex % $scope.slides.length;
				$scope.images[$scope.currentIndex].visible = true; // show next image

			},$scope.speed);
		}
	};
});

core.controller('HomeController',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.services = [
			{
				percentage: 90,
				img : 'service1open.jpg',
				href: 'http://google.com',
				title: 'Surf Ericeira',
				description: 'world surf reserver'
		}
		];
	}
);
