'use strict';

var core = angular.module('core');


core.config(function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		//    key: 'your api key',
		v: '3.17',
		libraries: 'weather,geometry,visualization'
	});
});

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


core.directive('bannerSponsors', function(){
	return  {
		restrict: 'E',
		replace: true,
		templateUrl: '/modules/core/views/sponsors.view.html',
		scope:{
			sponsors : '='
		}
	};
});








core.controller('HomeController',
	function($scope, Authentication,$timeout,uiGmapGoogleMapApi) {
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



		$scope.sponsors = [
			{img : 'sponsor.jpg'}	,
			{img : 'sponsor.jpg'}	,
			{img : 'sponsor.jpg'}	,
			{img : 'sponsor.jpg'}	,
		];


		$scope.lessons = [
			{
				color: 'yellow',
				href: '#',
				img: 'lesson.jpg',
				price: '50€/h',
				title: 'Wave Surf School',
				descriptionTitle: 'Begginer',
				durationTop: '15',
				durationUnit:'DAYS',
				description: 'Surf lessons during one week. 2h per lesson. Surf suit and board included',
				icons: [
					{title: 'car', href: '#', img:'car.png'}
				]
			},
			{
				color: 'yellow',
				href: '#',
				img: 'lesson.jpg',
				price: '50€/h',
				title: 'Wave Surf School',
				descriptionTitle: 'Begginer',
				durationTop: '15',
				durationUnit:'DAYS',
				description: 'Surf lessons during one week. 2h per lesson. Surf suit and board included',
				icons: [
					{title: 'car', href: '#', img:'car.png'}
				]
			},
			{
				color: 'yellow',
				href: '#',
				img: 'lesson.jpg',
				price: '50€/h',
				title: 'Wave Surf School',
				descriptionTitle: 'Begginer',
				durationTop: '15',
				durationUnit:'DAYS',
				description: 'Surf lessons during one week. 2h per lesson. Surf suit and board included',
				icons: [
					{title: 'car', href: '#', img:'car.png'}
				]
			}
		];



		// uiGmapGoogleMapApi is a promise.
		// The "then" callback function provides the google.maps object.
		uiGmapGoogleMapApi.then(function(maps) {
			$scope.map = { center: { latitude: 38.99, longitude: -9.4223438 }, zoom: 13 , options: { mapTypeId: google.maps.MapTypeId.SATELLITE }};
			$scope.randomMarkers = [];

			var markers = [];
			var newMarker = function($latitude,$longitude,$title,$id){
				var marker = {
					latitude: $latitude,
					longitude: $longitude,
					title: $title,
					id : $id,
					show: false
				};
				marker.onClick = function() {
					marker.show = false;
					$scope.spotName = marker.title;
					$scope.wave = $scope.waves[marker.id];
				};
				return marker;
			};

			markers.push(newMarker('38.963215', '-9.417070', 'Ericeira', 'ericeira'));
			markers.push(newMarker('38.987578', '-9.419057', 'Ribeira D\'ilhas', 'ribeira'));
			markers.push(newMarker('38.996169', '-9.426985', 'Cave', 'cave'));
			markers.push(newMarker('38.979571', '-9.423903', 'Pedra Branca', 'pedra'));
			markers.push(newMarker('38.983208', '-9.422832', 'Reef', 'reef'));
			markers.push(newMarker('38.997583', '-9.426225', 'Crazy Left', 'crazy'));
			markers.push(newMarker('39.000492', '-9.427227', 'Coxos', 'coxos'));
			markers.push(newMarker('39.014289', '-9.4243127', 'São Lourenço', 's.lourenco'));



			$scope.randomMarkers = markers;
		});


		var reef = {
			name: 'Reef',
			img : 'tour1.png',
			description: 'Continuing along Empa Beach, which is bordered by a small cliff, 300 metres to the north we find Pedra Branca’s twin beach and a wave called Reef. This right is formed from a very flat reef shelf which starts on land and gets deeper as it stretches NW. This is another regular, dangerous wave that has a very short, fast take-off zone followed by a barrel that ends exactly on the exposed shelf on the surface on the inside. It only works with N to NW swells at mid tide',
			type: {'Type': 'Rapid, powerful barrel right', 'Type of seabed':'Reef', 'Tide conditions' :'Mid tide', 'Sweel conditions' : 'NW/N', 'Wind conditions':'SE to NE', 'Consistency': '++', 'Break angle' : '35º', 'Length of break line': '30 to 70 meters', 'Wave height':'0.5 to 1.5 meters', 'Type of break': 'Plunging', 'Level' : '6'}
		};

		var ribeira = {
			name: 'Ribeira D\'Ilhas',
			img : 'tour1.png',
			description: 'If we walk 500 metres north, we come across the most memorable and cosmopolitan of all the waves in the reserve. Located in a valley with a sandy beach in the centre where a stream flows into the sea, it is shaped like a natural amphitheatre, which is perfect for surfing events. It is no surprise that it was the venue for the first national and international championships in Portugal. Ribeira d`Ilhas is a long pointbreak right, meaning that the waves follow the contour of the shore, which receives all types of swells and works in all kinds of tide. It is the most consistent wave in the region. Ribeira d’Ilhas and its W/NW swells can provide rights up to 200 metres long. It is a very valuable, competitive wave as it allows surfers very different levels of approach.',
			type: {'Type': 'Long right', 'Type of seabed':'Rocks and reef', 'Tide conditions' :'All tides', 'Sweel conditions' : 'All (best on W/NW)', 'Wind conditions':'Any quadrand (best from SE to NE)', 'Consistency': '+ + + + +', 'Break angle' : '55º', 'Length of break line': '150 to 300 meters', 'Wave height':'0.5 to 3.5 meters', 'Type of break': 'Progressive/Plunging', 'Level' : '4'}
		};

		$scope.waves = {
			'reef' : reef,
			'ribeira' : ribeira
		};



	}
);
