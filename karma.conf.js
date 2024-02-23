// // Karma configuration
// // Generated on Wed Feb 21 2024 10:49:33 GMT+0000 (heure moyenne de Greenwich)

// module.exports = function(config) {
//   config.set({

//     // base path that will be used to resolve all patterns (eg. files, exclude)
//     basePath: '',


//     // frameworks to use
//     // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
//     frameworks: ['jasmine'],


//     // list of files / patterns to load in the browser
//     files: [
//     ],


//     // list of files / patterns to exclude
//     exclude: [
//     ],


//     // preprocess matching files before serving them to the browser
//     // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
//     preprocessors: {
//     },


//     // test results reporter to use
//     // possible values: 'dots', 'progress'
//     // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
//     reporters: ['progress'],


//     // web server port
//     port: 9876,


//     // enable / disable colors in the output (reporters and logs)
//     colors: true,


//     // level of logging
//     // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
//     logLevel: config.LOG_INFO,


//     // enable / disable watching file and executing tests whenever any file changes
//     autoWatch: true,


//     // start these browsers
//     // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
//     browsers: ['Chrome'],


//     // Continuous Integration mode
//     // if true, Karma captures browsers, runs the tests and exits
//     singleRun: false,

//     // Concurrency level
//     // how many browser instances should be started simultaneously
//     concurrency: Infinity
//   })
// }

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/gestion-note-g3'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['Chrome'],
    restartOnFileChange: true
  });
};
