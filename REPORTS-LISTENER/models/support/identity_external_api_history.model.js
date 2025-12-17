const mongoose = require('mongoose');


const IdentityExternalApiHistorySchema = new mongoose.Schema({
    caseId: {
        type: String,
        // required: true,
    },
    checkVerification: {
        type: String,
        // required: true,
    },
    success: {
        type: Boolean,
        // required: true,
    },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifiedOn: { type: Date, default: Date.now }
});

const IdentityExternalApiHistoryModel = mongoose.model('IdentityExternalApiHistory', IdentityExternalApiHistorySchema);

module.exports = IdentityExternalApiHistoryModel;