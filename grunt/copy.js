/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 */
module.exports = {
  release: {
    files: [
      {
        expand: true,
        src: [
          'css/**',
          'errors/**',
          'img/**',
          'js/**',
          'templates/**',
          'tools/**',
          '*.shtml',
          'favicon.ico',
          'robots.txt',
        ],
        dest: 'release/',
      },
    ],
  },
};
