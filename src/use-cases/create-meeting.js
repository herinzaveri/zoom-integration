module.exports = ({ createZoomMeeting, sendEmail, sendText, mongoDB, config, Joi }) => {
	return async ({ policyNumber, phoneNumber, emailId }) => {
		// validateInput({ policyNumber, phoneNumber, emailId });

		// get credentials
		const accessToken = config.zoom.jwtToken;

		// create zoom meeting
		const meetingDetails = await createZoomMeeting({
			accessToken,
			// topic: `Zoom Meeting for Policy Number : ${policyNumber}`,
			duration: 60,
		});

		// update in db
		// const data = {
		// 	policyNumber,
		// 	phoneNumber,
		// 	emailId,
		// 	meetingURL: meetingDetails.meetingUrl,
		// 	providerMeetingId: meetingDetails.providerConferenceId,
		// 	meetingId: meetingDetails.meetingId,
		// 	password: meetingDetails.password,
		// };
		// await mongoDB.addMeeting(data);

		// send email
		// await sendEmail({
		// 	from: config.nodemailer.user,
		// 	to: emailId,
		// 	cc: config.nodemailer.user,
		// 	subject: `Zoom Meeting for Policy Number : ${policyNumber}`,
		// 	text: `Meeting URL : ${meetingDetails.meetingUrl}\n\n` + `Meeting Id : ${meetingDetails.meetingId}\n\n` + `Password : ${meetingDetails.password}\n\n`,
		// });

		return {
			meetingURL: meetingDetails.meetingUrl,
			providerMeetingId: meetingDetails.providerConferenceId,
			meetingId: meetingDetails.meetingId,
			password: meetingDetails.password,
		};
	};

	function validateInput({ policyNumber, phoneNumber, emailId }) {
		const schema = Joi.object({
			policyNumber: Joi.string().required(),
			phoneNumber: Joi.string().required(),
			emailId: Joi.string().required(),
		});
		const { error } = schema.validate({ policyNumber, phoneNumber, emailId });
		if (error) {
			throw new Error(error.message);
		}
	}
};
