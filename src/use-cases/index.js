// Import all dependencies
const Joi = require("joi");
const moment = require("moment");
const nodemailer = require("nodemailer");

const config = require("../config");
const mongoDB = require("../data-access");
const zoom = require("../external-apis/zoom");
const messagepro = require("../external-apis/messagepro");

// Make nodemailer instance
const transporter = nodemailer.createTransport({
	service: config.nodemailer.service,
	host: config.nodemailer.host,
	auth: {
		user: config.nodemailer.user,
		pass: config.nodemailer.pass,
	},
});

// Import all common use cases
const makeSendEmail = require("./send-email");
const sendEmail = makeSendEmail({
	transporter,
	Joi,
});

const makeSendText = require("./send-text");
const sendText = makeSendText({
	messagepro,
	Joi,
});

const makeCreateZoomMeeting = require("./create-zoom-meeting");
const createZoomMeeting = makeCreateZoomMeeting({
	Joi,
	zoom,
	moment,
});

const makeCreateMeeting = require("./create-meeting");
const createMeeting = makeCreateMeeting({
	createZoomMeeting,
	sendEmail,
	sendText,
	mongoDB,
	config,
	Joi,
});

const makeHandleZoomWebhook = require("./handle-zoom-webhook");
const handleZoomWebhook = makeHandleZoomWebhook({});

// Export all use cases
module.exports = {
	createZoomMeeting,
	createMeeting,
	sendEmail,
	handleZoomWebhook,
	sendText,
};
