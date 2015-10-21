'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
<% if(filters.jqUpload) { %>var jqUploads = require('fng-jq-upload');<% } %>

var ApplicantSchema = new Schema({
  surname: {type:String, required:true, index:true},
  forename: {type:String, index:true}<% if(filters.uiDate) { %>,
  dateOfBirth: {type:Date}<% } %><% if(filters.jqUpload) { %>,
  photo: {type: [new Schema(jqUploads.FileSchema)], form: { directive: 'fng-jq-upload-form', fngJqUploadForm:{sizeLimit:524288, autoUpload:true, single:true, width: 100, height: 100 }}}<% } %><% if(filters.ckeditor) { %>,
  whyApplied: {type: String, form: {type: 'textarea', editor: 'ckEditor'}}<% } %>,
  status: {type: String, default:'Pending', enum:['Pending','Rejected','Shortlist']<% if(filters.select2) { %>, form: {select2: {}}<% } %><% if(filters.uiSelect) { %>, form: {size: 'small', directive: 'fng-ui-select', fngUiSelect:{theme: "bootstrap"}}<% } %>}
});

var Applicant;
var modelName = 'Applicant';

try {
  Applicant = mongoose.model(modelName);
} catch(e) {
  Applicant = mongoose.model(modelName, ApplicantSchema);
}

module.exports = Applicant;
