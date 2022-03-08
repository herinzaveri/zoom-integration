module.exports = ({ createMeeting, Joi }) => {
	return async (req, res) => {
		const { policyNumber, phoneNumber, emailId } = req.body;

		try {
			validateInput({ policyNumber, phoneNumber, emailId });

			const response = await createMeeting({ policyNumber, phoneNumber, emailId });

			return res.send(response);
		} catch (err) {
			return res.status(400).send(err.message);
		}
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
