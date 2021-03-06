'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'visit-ericeira';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils', 'uiGmapgoogle-maps','easypiechart','duScroll','akoenig.deckgrid'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
;
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
;
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core', ['easypiechart']);
;
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');;
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);;
'use strict';

angular.module('core').controller('HeaderController',
	["$scope", "Authentication", "Menus", function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}]
);
;
'use strict';

var core = angular.module('core');


core.config(["uiGmapGoogleMapApiProvider", function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		//    key: 'your api key',
		v: '3.17',
		libraries: 'weather,geometry,visualization'
	});
}]);



core.controller('HomeController',
	["$scope", "Authentication", "$timeout", "uiGmapGoogleMapApi", function($scope, Authentication,$timeout,uiGmapGoogleMapApi) {
		// This provides Authentication context.
		$scope.authentication = Authentication;


		//service (3 round balls) - start
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

		var servicesDir = '/modules/core/img/services/';
		$scope.services = [
			{
				percent: 90,
				img : servicesDir+'service1.png',
				imgOpen : servicesDir+'service1open.jpg',
				href: '#surf_lessons',
				title: 'Surf',
				description: '7 Waves in the 2nd World Surf Reserve'
			},
			{
				percent: 80,
				img : servicesDir+'service2.png',
				imgOpen : servicesDir+'service2open.jpg',
				href: '#spots',
				title: 'Beach',
				description: '11 Beaches within 5km'
			},
			{
				percent: 65,
				img : servicesDir+'service3.png',
				imgOpen : servicesDir+'service3open.jpg',
				href: '#food',
				title: 'Food',
				description: 'Fresh Fish and Seafruits'
			}
		];
		// service - end


		var menuImgDir = '/modules/core/img/menu/';
		$scope.menu = [
			{
				href: '#food',
				color: 'red',
				img: menuImgDir+'drink.png',
				text: 'Drink <span class="and">&</span> Eat'
			},
			{
				href: '#surf_lessons',
				color: 'blue',
				img: menuImgDir+'surfist.png',
				text: 'Fun'
			},
			{
				href: '#housing',
				color: 'yellow',
				img: menuImgDir+'sleep.png',
				text: 'Sleep'
			},
			{
				href: '#guide',
				color: 'green',
				img: menuImgDir+'map.png',
				text: 'Getting here'
			}
		];


		var dishesDir = '/modules/core/img/dishes/';
		var dishesDirSponsors = '/modules/core/img/dishes/sponsors/';
		$scope.dishes = [
			{
				img : dishesDir+'bacalhau_bras.jpg',
				sponsor : dishesDirSponsors+'avatar.jpg',
				href : '#',
				name : 'Bacalhau à Brás',
				description: 'É um facto estabelecido de que um leitor é distraído pelo conteúdo legível de uma página quando analisa a sua mancha gráfica. Logo, o uso de Lorem Ipsum leva a uma distribuição '
			},
			{
				img : dishesDir+'pastel.jpg',
				sponsor : dishesDirSponsors+'avatar.jpg',
				href : '#',
				name : 'Bacalhau à Brás',
				description: 'É um facto estabelecido de que um leitor é distraído pelo conteúdo legível de uma página quando analisa a sua mancha gráfica. Logo, o uso de Lorem Ipsum leva a uma distribuição '
			},
			{
				img : dishesDir+'sardinhas.jpg',
				sponsor : dishesDirSponsors+'avatar.jpg',
				href : '#',
				name : 'Bacalhau à Brás',
				description: 'É um facto estabelecido de que um leitor é distraído pelo conteúdo legível de uma página quando analisa a sua mancha gráfica. Logo, o uso de Lorem Ipsum leva a uma distribuição '
			},
			{
				img : dishesDir+'sopa_rica.jpg',
				sponsor : dishesDirSponsors+'avatar.jpg',
				href : '#',
				name : 'Bacalhau à Brás',
				description: 'É um facto estabelecido de que um leitor é distraído pelo conteúdo legível de uma página quando analisa a sua mancha gráfica. Logo, o uso de Lorem Ipsum leva a uma distribuição '
			},
			{
				img : dishesDir+'bacalhau_bras.jpg',
				sponsor : dishesDirSponsors+'avatar.jpg',
				href : '#',
				name : 'Bacalhau à Brás',
				description: 'É um facto estabelecido de que um leitor é distraído pelo conteúdo legível de uma página quando analisa a sua mancha gráfica. Logo, o uso de Lorem Ipsum leva a uma distribuição '
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
			$scope.map = { center: { latitude: 38.99, longitude: -9.4223438 }, zoom: 13 , options: { mapTypeId: google.maps.MapTypeId.SATELLITE, scrollwheel: false, draggable:false}};
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
			imgs : ['tour1.png','tour2.jpg','tour1.png'],
			description: 'Continuing along Empa Beach, which is bordered by a small cliff, 300 metres to the north we find Pedra Branca’s twin beach and a wave called Reef. This right is formed from a very flat reef shelf which starts on land and gets deeper as it stretches NW. This is another regular, dangerous wave that has a very short, fast take-off zone followed by a barrel that ends exactly on the exposed shelf on the surface on the inside. It only works with N to NW swells at mid tide',
			type: {'Type': 'Rapid, powerful barrel right', 'Type of seabed':'Reef', 'Tide conditions' :'Mid tide', 'Sweel conditions' : 'NW/N', 'Wind conditions':'SE to NE', 'Consistency': '++', 'Break angle' : '35º', 'Length of break line': '30 to 70 meters', 'Wave height':'0.5 to 1.5 meters', 'Type of break': 'Plunging', 'Level' : '6'}
		};

		var ribeira = {
			name: 'Ribeira D\'Ilhas',
			imgs : ['tour1.png','tour2.jpg','tour1.png'],
			description: 'If we walk 500 metres north, we come across the most memorable and cosmopolitan of all the waves in the reserve. Located in a valley with a sandy beach in the centre where a stream flows into the sea, it is shaped like a natural amphitheatre, which is perfect for surfing events. It is no surprise that it was the venue for the first national and international championships in Portugal. Ribeira d`Ilhas is a long pointbreak right, meaning that the waves follow the contour of the shore, which receives all types of swells and works in all kinds of tide. It is the most consistent wave in the region. Ribeira d’Ilhas and its W/NW swells can provide rights up to 200 metres long. It is a very valuable, competitive wave as it allows surfers very different levels of approach.',
			type: {'Type': 'Long right', 'Type of seabed':'Rocks and reef', 'Tide conditions' :'All tides', 'Sweel conditions' : 'All (best on W/NW)', 'Wind conditions':'Any quadrand (best from SE to NE)', 'Consistency': '+ + + + +', 'Break angle' : '55º', 'Length of break line': '150 to 300 meters', 'Wave height':'0.5 to 3.5 meters', 'Type of break': 'Progressive/Plunging', 'Level' : '4'}
		};

		$scope.waves = {
			'reef' : reef,
			'ribeira' : ribeira
		};


		$scope.filters = ['ALL', 'Surf', 'Ericeira', 'Nearby'];

		$scope.gallery = [
			{img: 'img1.jpg', title:'Surf 1', filter: 'Surf'},
			{img: 'img2.jpg', title:'Surf 1', filter: 'Surf'},
			{img: 'img3.jpg', title:'Ericeira 1', filter: 'Ericeira'},
			{img: 'img4.jpg', title:'Ericeira 2', filter: 'Ericeira'},
			{img: 'img5.jpg', title:'Nearby 1', filter: 'Nearby'},
			{img: 'img6.jpg', title:'Nearby 2', filter: 'Nearby'},
		]


	}]
);
;
'use strict';

angular.module('core').
    directive('bannerSponsors', function(){
        return  {
            restrict: 'E',
            replace: true,
            templateUrl: '/modules/core/views/sponsors.view.html',
            scope:{
                sponsors : '='
            }
        };
    });

;
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
;
'use strict';

angular.module('core').
    directive('fancyboxer', function(){
        return  {
            restrict: 'A',
            scope:{
                sponsors : '='
            },
            link: function($scope,element) {
                var refs = $(element).find('a').addClass('fancybox-thumbs');
                refs.attr('rel','fancybox-thumbs');

                var openFancyBox = function () {
                    $(element).parent().find('a.fancybox-thumbs').fancybox({
                        prevEffect: 'none',
                        nextEffect: 'none',

                        closeBtn: true,
                        arrows: true,
                        nextClick: true,

                        helpers: {
                            thumbs: {
                                width: 50,
                                height: 50
                            }
                        }
                    });
                }
                refs.bind('click', openFancyBox);
            }
        };
    });

;
'use strict';

var core = angular.module('core');

core.filter('galleryFilter',function() {
    return function (items, filter) {
        if(filter == 'ALL'){
            return items;
        }
        return items.filter(function(item){
            return item.filter === filter;
        });
    }
});

core.directive('gallery',function(){
    return{
        restrict : 'AE', //attribute element
        replace: true,
        templateUrl: '/modules/core/views/gallery.view.html',
        scope: {
            filters: '=',
            album: '='
        },

        controller: ["$scope", "$filter", function($scope,$filter){
            $scope.selectedFilter = $scope.filters[0];


            $scope.selectFilter = function($selectedFilter){
                $scope.selectedFilter = $selectedFilter;
            }
        }]
    };
});
;
'use strict';

var core = angular.module('core');


core.directive('slider',["$interval", "$window", function($interval,$window){
    return{
        restrict : 'AE', //attribute element
        replace: true,
        templateUrl: '/modules/core/views/slider.view.html',
        scope: {
            slides: '=',
            speed: '@',
            dir : '@',
            width: '@',
            height: '@'
        },

        controller: ["$scope", function($scope){
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
        }],
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
}]);
;
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);;
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);;
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);;
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);;
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);;
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);;
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);;
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);