
module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);
  grunt.file.setBase('src/redturtle/patterns');
  grunt.initConfig({
    less: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded',
        },
        files: {                         // Dictionary of files
          './static/pattern.css': `./static/pattern.less`,
        },
      },
    },
    cssmin: {
      target: {
        files: {
          './static/build/redturtle-patterns-bundle-compiled.min.css': [`./libraries/slick/slick.css`, `./static/pattern.css`],
        },
      },
      options: {
        sourceMap: true,
      },
    },
    requirejs: {
      'redturtle-patterns': {
        options: {
          baseUrl: `.`,
          generateSourceMaps: true,
          preserveLicenseComments: false,
          paths: {
            jquery: 'empty:',
            'pat-base': 'empty:',
            'slick.min': `./libraries/slick/slick.min`,
            'redturtle-patterns-slider': `./static/slider/pattern`,
            'redturtle-patterns-timeline': `./static/timeline/pattern`,
            'pat-logger': 'empty:',
            'mockup-utils': 'empty:',
            'underscore': 'empty:',
          },
          wrapShim: true,
          name: `/opt/comunemodena.comnet/components/plone/src/redturtle.patterns/src/redturtle/patterns/static/bundle.js`,
          exclude: ['jquery'],
          out: `./static/build/redturtle-patterns-bundle-compiled.js`,
          optimize: 'none',
        },
      },
    },
    uglify: {
      'redturtle-patterns': {
        options: {
          sourceMap: true,
          sourceMapName: `./static/build/redturtle-patterns-bundle-compiled.js.map`,
          sourceMapIncludeSources: false,
        },
        files: {
          './static/build/redturtle-patterns-bundle-compiled.js': ['./static/build/redturtle-patterns-bundle-compiled.js'],
        },
      },
    },
    watch: {
      scripts: {
        files: [`/static/pattern.js`, `/static/bundle.js`],
        tasks: ['requirejs', 'uglify'],
        options: {
          livereload: true,
        },
      },
      css: {
        files: `/static/pattern.scss`,
        tasks: ['less', 'cssmin'],
        options: {
          livereload: true,
        },
      },
    },
  });

  grunt.registerTask('default', ['less', 'watch']);
  grunt.registerTask('compile', ['less', 'cssmin', 'requirejs', 'uglify']);

};
