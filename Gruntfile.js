module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      app: {
        script: './index.js'
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      server: {
        src: [
          'server/spec/spec.js'
        ]
      },
      client: {
        src: [
          'client/spec/spec.js'
        ]
      }
    },

    watch: {
     server: {
        files: ['./server/**/*.js',
        './Gruntfile.js', './index.js'],
        tasks: ['build']
      },
      client: {
        files: ['./client/**/*'],
        tasks: ['build:client']
      }
    },
	  concat: {
	    vendors: {
	      src: [
	        './node_modules/jquery/dist/jquery.min.js',
	        './node_modules/underscore/underscore-min.js'
	      ],
	      dest: './dist/vendors.js'
	    },
      clientJS: {
        src: ['./client/app.js'],
        dest: './dist/client.js'
      },
      clientHTML: {
        src: ['./client/index.html'],
        dest: './dist/built.html'
      }
	  },
    copy: {
      text: {
        files: [
          {expand: true, cwd: 'client/text', src: ['**'], dest: 'dist/text/'}
        ]
      }
    },
    jshint: {
      options: {
        force: 'true',
        jshintrc: true
      },

      server: {
        files: {
          src: ['./server/**/*.js']
        }
      },
      client: {
        files: {
          src: ['./client/**/*.js', '!./client/text/socket.io.js']
        }
      }
    }




	});


  grunt.registerTask('default', [
    'mochaTest',
    'jshint',
    'build',
    'spawnWatch',
    'nodemon'
  ]);

  grunt.registerTask('spawnWatch', function (target) {
    var watch = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'watch'
    });
    watch.stdout.pipe(process.stdout);
    watch.stderr.pipe(process.stderr);
  });



	grunt.registerTask('build', [
    'mochaTest:server',
    'jshint:server',
    'concat',
    'copy'
	]);
  grunt.registerTask('build:client', [
    'mochaTest:client',
    'jshint:client',
    'concat:clientJS', 
    'concat:clientHTML',
    'copy:text' 
  ]);
	/*grunt.registerTask('shellTask', [
    'shell'
	]);*/


};
