const axios = require("axios");
const config = require("../../config");

const makeCreateMeeting = require("./create-meeting");
const createMeeting = makeCreateMeeting({ axios, config });

module.exports = Object.freeze({
	createMeeting,
});
