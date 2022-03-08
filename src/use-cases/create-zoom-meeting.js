module.exports = ({ Joi, zoom, moment }) => {
	return async ({ accessToken, topic, startDateTime, duration, timezone, agenda }) => {
		validateInput({ accessToken, topic, startDateTime, duration, timezone, agenda });

		if (startDateTime && timezone) {
			startDateTime = moment(startDateTime).tz(timezone).format("YYYY-MM-DDTHH:mm:ss");
		}

		if (agenda) {
			agenda = removeHtmlTagsFromText({ text: agenda });
		}

		const zoomResponse = await zoom.createMeeting({ accessToken, topic, startDateTime, duration, timezone, agenda });

		return {
			providerConferenceId: zoomResponse.id,
			meetingId: zoomResponse.id,
			meetingUrl: zoomResponse["join_url"],
			password: zoomResponse.password,
		};
	};

	function validateInput({ accessToken, topic, startDateTime, duration, timezone, agenda }) {
		const schema = Joi.object({
			accessToken: Joi.string().required(),
			topic: Joi.string().allow(""),
			startDateTime: Joi.date().iso().allow(""),
			duration: Joi.number().integer(),
			timezone: Joi.string().allow(""),
			agenda: Joi.string().allow(""),
		});
		const { error } = schema.validate({ accessToken, topic, startDateTime, duration, timezone, agenda });
		if (error) {
			throw new Error(error.message);
		}
	}
};
