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
			$scope.slideIndex = 0;
			$scope.images = [];

			$scope.images.push({ src : $scope.slides[$scope.slideIndex]});

			$interval(function(){
				$scope.images = [];
				$scope.slideIndex = ($scope.slideIndex + 1) % $scope.slides.length;
				$scope.images.push({ src : $scope.slides[$scope.slideIndex]});
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

		$scope.promotions = [
			{
				href: '#',
				color: 'red',
				img: 'drink.png',
				text: 'Drink <span class="and">&</span> Eat'
			}
		];

		$scope.dishes = [
			{
				img : 'bacalhau_bras.jpg',
				sponsor : 'avatar.jpg',
				href : '#',
				name : 'Bacalhau à Brás',
				description: 'codfish'
			}
		];
	}
);
