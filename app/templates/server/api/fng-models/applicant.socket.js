/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Applicant = require('./applicant.model');

exports.register = function(socket) {
  Applicant.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Applicant.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('applicant:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('applicant:remove', doc);
}