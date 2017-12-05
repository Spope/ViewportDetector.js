module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: true,
                report: 'gzip',
                compress: {
                    drop_console: true
                }
            },
            home: {
                files: {
                    './build/viewportdetector.min.js' : [
                        './src/viewportdetector.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('compile', ['uglify']);
}
