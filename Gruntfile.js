module.exports = function(grunt) {
  "use strict";
  require( 'load-grunt-tasks' )( grunt );

  grunt.initConfig({

    jsdoc: {
      src: ['lib/*.js'],
      options: {
        destination: 'doc'
      }
    },

    jscs: {
      main: [ 'bin/server.js',
              'lib/*.js'
      ],
      options: {
        config: '.jscsrc'
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'bin/server.js',
        'lib/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    jasmine_nodejs: {
      // task specific (default) options 
      options: {
        specNameSuffix: "spec.js", // also accepts an array
        helperNameSuffix: "helper.js",
        useHelpers: false,
        random: false,
        seed: null,
        //defaultTimeout: null, // defaults to 5000 
        defaultTimeout: 5000, 
        stopOnFailure: false,
        traceFatal: 2,
        // configure one or more built-in reporters 
        reporters: {
          console: {
            colors: true,        // (0|false)|(1|true)|2 
            cleanStack: 0,       // (0|false)|(1|true)|2|3 
            verbosity: 4,        // (0|false)|1|2|3|(4|true) 
            listStyle: "indent", // "flat"|"indent" 
            activity: false
          },
        },
        // add custom Jasmine reporter(s) 
        customReporters: []
      },
      'server_tests': {
        // target specific options 
        //options: {
        //    useHelpers: true
        //},
        // spec files 
        specs: [
          "test/**"
        ]
        //helpers: [
        //    "test/helpers/**"
        //]
      }
    },

    watch: {
      js: {
        files: [
          'Gruntfile.js',
          '.jshintrc',
          '.jscsrc',
          'bin/**/*.js',
        ],
        tasks: [
          'test'
        ]
      }
    }
  });

  grunt.registerTask('lint', ['jshint', 'jscs']);
  grunt.registerTask('test', ['lint', 'jasmine_nodejs']);
  grunt.registerTask('default', ['test']);
};
