/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  <% if (filters.auth) { %>app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  <% } %>
};
