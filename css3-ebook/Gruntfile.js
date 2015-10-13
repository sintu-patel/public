module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	var jsFiles = grunt.file.readJSON('jsconfig/js-files.json');
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			development : {
				options: {
					paths: 'dev/less/',
					yuicompress: true
				},
				files: {
					'dev/assets/css/style.css': 'dev/less/style.less'
				}
			}
		},

		concat: {
			development : {
				options: {
					paths: 'dev/javascript'
				},
				files: {
					'dev/assets/js/javascript.js': jsFiles
				}
			}
		},

		watch: {
			less: {
				files: ['dev/less/*.less', 'dev/javascript/*.js'],
				tasks: ['less', 'concat']
			}
		}
	});
};

