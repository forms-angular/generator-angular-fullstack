'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/<%= _s.slugify(appname) %>-dev'
  },

  seedDB: true
};
