/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 */
module.exports = {
  release: {
    files: [
      {
        expand: true,
        cwd: 'src/css/',
        src: ['*.css', '!cookie.css', '!epfl.css'],
        dest: 'release/css/',
      },
      {
        'release/css/epfl.css': [
          'src/css/epfl.css',
          'bower_components/cookieconsent/build/cookieconsent.min.css',
          'src/css/cookie.css'
        ],
        'release/css/epfl-cookie-consent.css': [
          'bower_components/cookieconsent/build/cookieconsent.min.css',
          'src/css/cookie.css'
        ],
      },
    ]
  }
};
