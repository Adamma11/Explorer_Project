// models/checkHistory.model.js
const mongoose = require('mongoose');

const CheckHistorySchema = new mongoose.Schema({
  caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
  componentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Component', required: true },
  modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  modifiedOn: { type: Date, default: Date.now },
  modifiedFields: [
    {
      field: String,
      oldValue: mongoose.Schema.Types.Mixed,
      newValue: mongoose.Schema.Types.Mixed
    }
  ]
});

module.exports = mongoose.model('CheckHistory', CheckHistorySchema);

