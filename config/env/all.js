'use strict';

module.exports = {
	app: {
		title: 'Visit Ericeira',
		description: 'Tourism Ericeira: Surf & Fun',
		keywords: 'Ericeira, Mafra, Lisboa, Portugal, Surf'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/owl-carousel2/dist/assets/owl.carousel.min.css'
			],
			js: [
				'public/lib/angular.easy-pie-chart/dist/angular.easypiechart.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/owl-carousel2/dist/owl.carousel.min.js',
				'public/lib/lodash/dist/lodash.min.js',
				'public/lib/angular-google-maps/dist/angular-google-maps.min.js'
			]
		},
		css: [
			'public/dist/application.css',
		],
		less: [
			'public/modules/**/*.less'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
