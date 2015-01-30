'use strict';


/**
 * CSS: The watch clientLss checks updates on modules less files. Then, invokes the task "less" which compiles all less to 'public/dist/application.css' and to 'public/dist/application.min.css'.
 * Then the clientCSS watch triggers the csslint to verify the CSS quality
 *
 * JS: The clientJS watches the changes on modules JS files and triggers the jshint to verify those files.
 * When compiled, the ngAnnotate and uglify are invoked and 'public/dist/application.js' and 'public/dist/application.min.js' are generated.
 *
 */

module.exports = function(grunt) {
	// Unified Watch Object
	var watchFiles = {
		serverViews: ['app/views/**/*.*'],
		serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
		clientViews: ['public/modules/**/views/**/*.html'],
		clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
		clientLess: ['public/modules/**/less/*.less'],
		clientCSS: ['public/dist/application.css'],
		mochaTests: ['app/tests/**/*.js']
	};



		// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			//LESS and CSS:
			clientLess: {
				files: watchFiles.clientLess,
				tasks: ['less'],
				options: {
					nospawn: true,
					livereload: true //reload on change
				}
			},
			clientCSS: {
				files: watchFiles.clientCSS,
				tasks: ['csslint'],
				options: {
					livereload: true
				}
			},

			//JS
			clientJS: {
				files: watchFiles.clientJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			serverJS: {
				files: watchFiles.serverJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			//views
			serverViews: {
				files: watchFiles.serverViews,
				options: {
					livereload: true
				}
			},
			clientViews: {
				files: watchFiles.clientViews,
				options: {
					livereload: true,
				}
			}
		},


		jshint: {    //Detect JS errors/metrics
			all: {
				src: watchFiles.clientJS.concat(watchFiles.serverJS),
				options: {
					jshintrc: true
				}
			}
		},
		csslint: { //Detect CSS errors/metrics
			options: {
				csslintrc: '.csslintrc'
			},
			all: {
				src: watchFiles.clientCSS
			}
		},
		ngAnnotate: {		//rebuild injections
			production: {
				files: {
					'public/dist/application.js': '<%= applicationJavaScriptFiles %>'
				}
			}
		},
		uglify: {		//minimize
			production: {
				options: {
					mangle: false
				},
				files: {
					'public/dist/application.min.js': 'public/dist/application.js'
				}
			}
		},
		nodemon: {	//reboot nodejs when files change
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: watchFiles.serverViews.concat(watchFiles.serverJS)
				}
			}
		},
		'node-inspector': {
			custom: {
				options: {
					'web-port': 1337,
					'web-host': 'localhost',
					'debug-port': 5858,
					'save-live-edit': true,
					'no-preload': true,
					'stack-trace-limit': 50,
					'hidden': []
				}
			}
		},
		concurrent: {
			default: ['nodemon', 'watch'],
			debug: ['nodemon', 'watch', 'node-inspector'],
			options: {
				logConcurrentOutput: true,
				limit: 10
			}
		},
		env: {
			test: {
				NODE_ENV: 'test'
			},
			secure: {
				NODE_ENV: 'secure'
			}
		},
		mochaTest: {
			src: watchFiles.mochaTests,
			options: {
				reporter: 'spec',
				require: 'server.js'
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		less: {
			production : {
				options : {
					paths : ['public/less'], //minified
					cleanCss: true,
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: [
					{'public/dist/application.min.css' : ['public/less/application.less','public/modules/**/less/*.less']}
				]
			},
			development : {
				options : {
					sourceMap : true,
					sourceMapURL: '/dist/application.css.map',
					ieCompact : true,
					dumpLineNumbers: true
				},
				files:
					{'public/dist/application.css' : ['public/less/application.less','public/modules/**/less/*.less']}
			}
		}
	});

	// Load NPM tasks
	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-contrib-less');

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// A Task for loading the configuration object
	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
		var init = require('./config/init')();
		var config = require('./config/config');

		grunt.config.set('applicationJavaScriptFiles', config.assets.js);
		grunt.config.set('applicationCSSFiles', config.assets.css);
		grunt.config.set('applicationLessFiles', config.assets.less);

	});

	// Default task(s).
	grunt.registerTask('default', ['lint', 'concurrent:default']);

	// Debug task.
	grunt.registerTask('debug', ['lint', 'concurrent:debug']);

	// Secure task(s).
	grunt.registerTask('secure', ['env:secure', 'lint', 'concurrent:default']);

	// Lint task(s).
	grunt.registerTask('lint', ['jshint', 'csslint']);

	// Build task(s).
	grunt.registerTask('build', ['lint', 'loadConfig', 'ngAnnotate', 'less', 'uglify']);

	// Test task.
	grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};
