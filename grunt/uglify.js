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
      'release/js/globalnav.js': [
        'src/js/globalnav.js',
        'bower_components/cookieconsent/build/cookieconsent.min.js',
        'src/js/init-cookieconsent.js'
      ],
      'release/js/globalnav-noanalytics.js': [
        'src/js/globalnav-noanalytics.js',
        'bower_components/cookieconsent/build/cookieconsent.min.js',
        'src/js/init-cookieconsent.js'
      ],
      'release/js/epfl-cookie-consent.js': [
        'bower_components/cookieconsent/build/cookieconsent.min.js',
        'src/js/init-cookieconsent.js'
      ]
    }
  }
};
