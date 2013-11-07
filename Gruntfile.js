var LIVERELOAD_PORT = 35279,
  liveReloadSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });

module.exports = function(grunt) {

  var destinationName = '<%= pkg.name %>',
    sources = [
      'tipJS/tipJS.dev.js'
    ],
    testHostURL = 'localhost',
    livePort = 9000,
    testPort = 9001,
    buildDirPath = "build/",
    banner = "/*\n <%= pkg.name %> - OpenSource Javascript MVC Framework ver.<%= pkg.version %>\n" +
      " Copyright 2013.08 tipJS-Team\n" +
      " Dual licensed under the MIT or GPL Version 2 licenses\n" +
      " Author: SeungHyun PAEK, Hanghee Yi, Juntai Park, Yun Jung Bu\n" +
      " HomePage: http://tipjs-team.github.io/tipJS/\n" +
      " GitHub: https://github.com/tipJS-Team/tipJS\n" +
      " License: MIT, GPL V2\n" +
      " create date: <%= grunt.template.today('yyyy-mm-dd') %> */\n";

  var cleanPaths = [ "test/tipJS" ],
    testURLs = [
      'http://'+testHostURL+':'+testPort+'/test.html'
    ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      test: cleanPaths,
      build: cleanPaths
    },
    copy: {
      test: {
        files: [
          {src: sources, dest: 'test/'}
        ]
      },
      uglify: {
        files: [
          {expand: true, flatten: true, src: buildDirPath + destinationName + '.min.js', dest: 'examples/'}
        ]
      }
    },
    uglify: {
      options: {
        banner: banner
      },
      build: {
        src: sources,
        dest: buildDirPath + destinationName + '.min.js'
      },
      examples1: {
        src: sources,
        dest: ['examples/' + destinationName + '.min.js']
      },
      examples2: {
        src: sources,
        dest: ['examples/ImageViewerOnTab/js/extlib/' + destinationName + '.min.js']
      },
      test: {
        src: sources,
        dest: 'test/' + destinationName + '.min.js'
      }
    },
    watch: {
      files: [
        'examples/**/*.html',
        'examples/**/*.css',
        'examples/**/*.js',
        'examples/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
      ],
      options: {
        livereload: LIVERELOAD_PORT
      }
    },
    qunit: {
      all: {
        options: {
          urls: testURLs
        }
      }
    },
    connect: {
      options: {
        hostname: testHostURL
      },
      live: {
        options: {
          port: livePort,
          base: "examples",
          middleware: function(connect, options) {
            return [
              liveReloadSnippet,
              connect.static(options.base)
            ];
          }
        }
      },
      test: {
        options: {
          port: testPort,
          base: "test"
        }
      }
    },
    open: {
      server: {
        url: 'http://'+testHostURL+':<%= connect.live.options.port %>'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          window: true,
          document: true
        }
      },
      uses_defaults: sources
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('server',
    ['clean:test', 'uglify:test', 'connect:live', 'open', 'watch']);

  grunt.registerTask('test',
    ['clean:test', 'copy:test', /*'jshint',*/ 'connect:test', 'qunit']);

  grunt.registerTask('build',
    ['clean:test', 'copy:test', /*'jshint',*/ 'connect:test', 'qunit', 'uglify:build', 'copy:uglify']);
};
