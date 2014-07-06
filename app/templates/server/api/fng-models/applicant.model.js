'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApplicantSchema = new Schema({
  surname: {type:String, required:true, index:true},
  forename: {type:String, index:true}<% if(filters.uiDate) { %>,
  dateOfBirth: {type:Date}<% } %><% if(filters.jqUpload) { %>,
  photo: {type: String, form: {type: 'fileuploader', collection:'files'}}<% } %><% if(filters.ckeditor) { %>,
  whyApplied: {type: String, form: {type: 'textarea', editor: 'ckEditor'}}<% } %>,
status: {type: String, default:'Pending', enum:['Pending','Rejected','Shortlist']<% if(filters.select2) { %>, form: {select2: {}}<% } %>}
});

var Applicant = mongoose.model('Applicant', ApplicantSchema);

module.exports = Applicant;
