const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
	policyNumber: {
		type: String,
	},
	phoneNumber: {
		type: String,
	},
	emailId: {
		type: String,
	},
	meetingURL: {
		type: String,
	},
	providerMeetingId: {
		type: String,
	},
	meetingId: {
		type: String,
	},
	password: {
		type: String,
	},
});

const Data = mongoose.model("datas", dataSchema);

module.exports = Data;
