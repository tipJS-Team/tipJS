var LIVERELOAD_PORT = 35279,
  liveReloadSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
module.exports = function(grunt) {

  var testHostURL = 'localhost',
    livePort = 9000;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: [
        '**/*.html',
        '**/*.css',
        '**/*.js',
        '**/*.{png,jpg,jpeg,gif,webp,svg}'
      ],
      options: {
        livereload: LIVERELOAD_PORT
      }
    },
    connect: {
      options: {
        hostname: testHostURL
      },
      live: {
        options: {
          port: livePort,
          base: ".",
          middleware: function(connect, options) {
            return [
              liveReloadSnippet,
              connect.static(options.base)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://'+testHostURL+':<%= connect.live.options.port %>'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('server', ['connect:live', 'open', 'watch']);

};
