/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 */
module.exports = {
  options: {
    compress: {
      drop_console: true
    }
  },
  release: {
    files: {
      'js/globalnav.js': [
        'src/js/globalnav.js',
        'bower_components/cookieconsent/build/cookieconsent.min.js',
        'src/js/init-cookieconsent.js'
      ],
      'js/globalnav-noanalytics.js': [
        'src/js/globalnav-noanalytics.js',
        'bower_components/cookieconsent/build/cookieconsent.min.js',
        'src/js/init-cookieconsent.js'
      ],
      'js/epfl-cookie-consent.js': [
        'bower_components/cookieconsent/build/cookieconsent.min.js',
        'src/js/init-cookieconsent.js'
      ]
    }
  }
};
