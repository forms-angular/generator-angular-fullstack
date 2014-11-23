'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

<% if(filters.jqUpload) { %>
var uploadSchema = new mongoose.Schema({
  filename: String,
  size: Number
});<% } %>

var ApplicantSchema = new Schema({
  surname: {type:String, required:true, index:true},
  forename: {type:String, index:true}<% if(filters.uiDate) { %>,
  dateOfBirth: {type:Date}<% } %><% if(filters.jqUpload) { %>,
  photo: {type: [uploadSchema], form: {directive: 'fng-jq-upload-form', add:{autoUpload:true, sizeLimit:50000000}}}<% } %><% if(filters.ckeditor) { %>,
  whyApplied: {type: String, form: {type: 'textarea', editor: 'ckEditor'}}<% } %>,
  status: {type: String, default:'Pending', enum:['Pending','Rejected','Shortlist']<% if(filters.select2) { %>, form: {select2: {}}<% } %>}
});

var Applicant;
var modelName = 'Applicant';

try {
  Applicant = mongoose.model(modelName);
} catch(e) {
  Applicant = mongoose.model(modelName, ApplicantSchema);
}

module.exports = Applicant;
