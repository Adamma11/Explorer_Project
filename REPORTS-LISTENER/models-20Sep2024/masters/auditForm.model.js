const mongoose = require('mongoose');
const AuditFormSchema = mongoose.Schema({
    branch: { type: String },
    componentType: { type: String },
    client: { type: String },
    caseId: { type: String },
    digitizedRecordDate: { type: Date },
    analyst: { type: String },
    parameter1: { type: String },
    parameter2: { type: String },
    parameter3: { type: String },
    parameter4: { type: String },
    parameter5: { type: String },
    check: { type: String },
    status: { type: String },
    compilance: { type: String },
    error: { type: String },
    secondaryError: { type: String },
    tertiaryError: { type: String },
    errorcategory: { type: String },
    severity: { type: String },
    comment: { type: String },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifiedOn: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('AuditForm', AuditFormSchema)