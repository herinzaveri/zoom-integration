const Joi = require("joi");

// Import use cases
const useCases = require("../use-cases");

// Import all controllers
const makeCreateMeetingAction = require("./create-meeting");
const createMeetingAction = makeCreateMeetingAction({
	createMeeting: useCases.createMeeting,
	Joi,
});

const makeHandleZoomWebhookAction = require("./handle-zoom-webhook");
const handleZoomWebhookAction = makeHandleZoomWebhookAction({
	handleZoomWebhook: useCases.handleZoomWebhook,
	Joi,
});

// Export all controllers
module.exports = {
	createMeetingAction,
	handleZoomWebhookAction,
};
