'use strict';

var _ = require('lodash');
var Applicant = require('./applicant.model');

// Get list of applicants
exports.index = function(req, res) {
  Applicant.find(function (err, applicants) {
    if(err) { return handleError(res, err); }
    return res.json(200, applicants);
  });
};

// Get a single applicant
exports.show = function(req, res) {
  Applicant.findById(req.params.id, function (err, applicant) {
    if(err) { return handleError(res, err); }
    if(!applicant) { return res.send(404); }
    return res.json(applicant);
  });
};

// Creates a new applicant in the DB.
exports.create = function(req, res) {
  Applicant.create(req.body, function(err, applicant) {
    if(err) { return handleError(res, err); }
    return res.json(201, applicant);
  });
};

// Updates an existing applicant in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Applicant.findById(req.params.id, function (err, applicant) {
    if (err) { return handleError(err); }
    if(!applicant) { return res.send(404); }
    var updated = _.merge(applicant, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, applicant);
    });
  });
};

// Deletes a applicant from the DB.
exports.destroy = function(req, res) {
  Applicant.findById(req.params.id, function (err, applicant) {
    if(err) { return handleError(res, err); }
    if(!applicant) { return res.send(404); }
    applicant.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}