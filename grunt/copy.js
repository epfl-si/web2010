/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017-2019.
 */
module.exports = {
  release: {
    files: [
      {
        expand: true,
        src: [
          'config_apache/**',
          'css/**',
          'errors/**',
          'images/**',
          'img/**',
          'js/**',
          'templates/**',
          'tools/**',
          '*.shtml',
          'favicon.ico',
          'robots.txt',
          'index.html',
        ],
        dest: 'release/',
      },
    ],
  },
};
