const axios = require("axios");
const config = require("../../config");

const makeSendMessage = require("./send-message");
const sendMessage = makeSendMessage({ axios, config });

module.exports = Object.freeze({
	sendMessage,
});
