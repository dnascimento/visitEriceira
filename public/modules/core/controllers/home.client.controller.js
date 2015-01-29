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



core.directive('hasOwlCarousel', function() {
	return {
		restrict: 'A',
		link: function($scope, $element) {
			$scope.$watch('dishes', function(value) {
				$scope.owl = $($element).children('.owl-carousel').owlCarousel({
					lazyLoad: true,
					items: 3,
					loop: false,
					margin: 10
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








core.controller('HomeController',
	function($scope, Authentication,$timeout) {
		// This provides Authentication context.
		$scope.authentication = Authentication;


		//service - start
		$scope.percent = 65;
		$scope.options = {
			size: 140,
			rotate: 0,
			lineWidth:10,
			animate: 1000,
			barColor: '#55738F',
			trackColor: 'transparent',
			scaleColor:false,
			lineCap: 'butt'
		};

		$scope.services = [
			{
				percent: 90,
				img : 'service1.png',
				imgOpen : 'service1open.jpg',
				href: 'http://google.com',
				title: 'Surf',
				description: '7 Waves in the 2nd World Surf Reserve'
			},
			{
				percent: 80,
				img : 'service2.png',
				imgOpen : 'service2open.jpg',
				href: 'http://google.com',
				title: 'Beach',
				description: '11 Beaches within 5km'
			},
			{
				percent: 65,
				img : 'service3.png',
				imgOpen : 'service3open.jpg',
				href: 'http://google.com',
				title: 'Food',
				description: 'Fresh Fish and Seafruits'
			}
		];

		// service - end

		$scope.promotions = [
			{
				href: '#',
				color: 'red',
				img: 'drink.png',
				text: 'Drink <span class="and">&</span> Eat'
			},
			{
				href: '#',
				color: 'blue',
				img: 'surfist.png',
				text: 'Fun'
			},
			{
				href: '#',
				color: 'yellow',
				img: 'sleep.png',
				text: 'Sleep'
			},
			{
				href: '#',
				color: 'green',
				img: 'map.png',
				text: 'Getting here'
			}
		];



		$scope.dishes = [
			{
				img : 'bacalhau_bras.jpg',
				sponsor : 'avatar.jpg',
				href : '#',
				name : 'Bacalhau à Brás',
				description: 'codfish'
			},
			{
				img : 'pastel.jpg',
				sponsor : 'avatar.jpg',
				href : '#',
				name : 'Bacalhau à Brás',
				description: 'codfish'
			},
			{
				img : 'sardinhas.jpg',
				sponsor : 'avatar.jpg',
				href : '#',
				name : 'Bacalhau à Brás',
				description: 'codfish'
			},
			{
				img : 'sopa_rica.jpg',
				sponsor : 'avatar.jpg',
				href : '#',
				name : 'Bacalhau à Brás',
				description: 'codfish'
			},
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
