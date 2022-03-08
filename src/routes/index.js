const express = require("express");
const router = express.Router();

const contollers = require("../controllers");
// const middlewares = require("../middlewares");

router.get("/", (req, res) => {
	res.send("Welcome to Zoom Integration");
});

router.post("/create-meeting", contollers.createMeetingAction);

router.post("/webhook/zoom/push", contollers.handleZoomWebhookAction);

module.exports = router;
