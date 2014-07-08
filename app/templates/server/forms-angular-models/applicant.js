'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApplicantSchema = new Schema({
  surname: {type:String, required:true, index:true},
  forename: {type:String, index:true},
  status: {type: String, default:'Pending', enum:['Pending','Rejected','Shortlist']}
});

var Applicant = mongoose.model('Applicant', ApplicantSchema);

module.exports = Applicant;
