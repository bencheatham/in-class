module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      options: {
        reporter: 'spec'
      },
      all: {
        src: [
          '**/spec/**/*.js'
        ]
      }
    }
	});


  grunt.registerTask('default', [
    'mochaTest'
  ]);

};
