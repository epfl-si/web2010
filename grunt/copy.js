/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
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
          'img/**',
          'js/**',
          'templates/**',
          'tools/**',
          '*.shtml',
          'favicon.ico',
          'package.json',
          'robots.txt',
        ],
        dest: 'release/',
      },
    ],
  },
};
