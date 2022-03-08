module.exports = ({ transporter, Joi }) => {
	return async ({ from, to, cc, subject, text }) => {
		validateInput({ from, to, cc, subject, text });

		return await transporter.sendMail({
			from,
			to,
			cc,
			subject,
			text,
		});
	};

	function validateInput({ from, to, cc, subject, text }) {
		const schema = Joi.object({
			from: Joi.string().required(),
			to: Joi.string().required(),
			cc: Joi.string().allow(null),
			subject: Joi.string().required(),
			text: Joi.string().required(),
		});
		const { error } = schema.validate({ from, to, cc, subject, text });
		if (error) {
			throw new Error(error.message);
		}
	}
};
