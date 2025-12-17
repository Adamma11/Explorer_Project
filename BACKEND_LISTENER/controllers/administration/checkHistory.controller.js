const CheckHistory = require('../../models/administration/checkHistory.model');
const User = require('../../models/administration/user.model'); // Optional if you want usernames

exports.getCheckHistory = async (req, res) => {
  try {
    const { caseId, componentId } = req.params;

    const history = await CheckHistory.find({ caseId, componentId })
      .populate('modifiedBy', 'name email') // Optional: populate who made the change
      .sort({ modifiedOn: -1 }); // Most recent first

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving check history', error: err.message });
  }
};

