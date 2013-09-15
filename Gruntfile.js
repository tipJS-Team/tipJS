/**
 * User: javarouka
 * Date: 13. 7. 27
 * Time: 오후 5:18
 */

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

  var destinationName = '<%= pkg.name %>',
      sources = [
        'tipJS/tipJS.2.0.0.dev.js'
      ],
      buildDirPath = "build/",
      banner = "/*\n <%= pkg.name %> - OpenSource Javascript MVC Framework ver.2.0.0\n" +
        " Copyright 2013.08 SeungHyun PAEK, Hanghee, Yi\n" +
        " Dual licensed under the MIT or GPL Version 2 licenses\n" +
        " HomePage: http://www.tipjs.com\n" +
        " Contact: http://www.tipjs.com/contact\n" +
        " license: MIT, GPL V2\n" +
        " create date: <%= grunt.template.today('yyyy-mm-dd') %> */";

  var cleanPaths = [ "test/tipJS" ];

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
      examples: {
        src: sources,
        dest: 'examples/' + destinationName + '.min.js'
      },
      test: {
        src: sources,
        dest: 'test/' + destinationName + '.min.js'
      }
    },
    watch: {
      scripts: {
        files: sources,
        options: {
          interrupt: true
        }
      }
    },
    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:9001/test.html'
          ]
        }
      }
    },
    connect: {
      options: {
        hostname: 'localhost'
      },
      live: {
        options: {
          port: 9000,
          base: "examples",
          middleware: function(connect, options) {
            return [
              function(req, res, next) {
                console.log('accept from ' + req.url);
                next();
              },
              connect.static(options.base)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          base: "test"
        }
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

  grunt.registerTask('server',
    ['uglify:examples', 'connect:live', 'watch']);

  grunt.registerTask('test',
    ['clean:test', 'copy:test', 'connect:test', 'qunit', 'clean:test']);

  grunt.registerTask('build',
    ['clean:build', /*'jshint',*/ 'connect', 'qunit', 'uglify:build']);
};
