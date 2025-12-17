const mongoose = require('mongoose');
const UpdateLhsAuthSchema = mongoose.Schema({
    caseId: { type: String },
    password: { type: String }
})
module.exports = mongoose.model('UpdateLhsAuth', UpdateLhsAuthSchema);

