module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.initConfig({
		jshint : {
			files : ['Gruntfile.js', 'scripts/**/*.js']
		},
		less : {
			development : {
				options : {
					compress : true,
					yuicompress : true,
					optimization : 2
				},
				files : {
					"css/main.css" : "less/main.less" // destination file and source file
				}
			}
		}
	});
	grunt.registerTask('default', ['jshint', 'less']);
};