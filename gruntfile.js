const path = require('path');

module.exports = function(grunt) {
  'use strict';

  grunt.file.setBase(__dirname);

  require('load-grunt-config')(grunt, {
    configPath: path.join(__dirname, 'grunt'),
  });

  const aliases = grunt.file.readYAML(path.join(__dirname, 'grunt/aliases.yml'));

  Object.entries(aliases).forEach(([taskName, taskList]) => {
    grunt.registerTask(taskName, taskList);
  });
};
