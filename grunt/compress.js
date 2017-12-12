/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 */
module.exports = function(grunt, options) {
  'use strict';

  return {
    release: {
      options: {
        archive: 'release/' + options.package.name + '-v' +
          options.package.version + '-release.tgz',
      },
      files: [
        {
          expand: true,
          cwd: 'release/',
          src: ['**',],
          dest: '.',
        },
      ],
    }
  }
};
