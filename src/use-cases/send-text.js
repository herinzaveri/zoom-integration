module.exports = ({ messagepro, Joi }) => {
	return async ({ from, to, text, apiKey }) => {
		validateInput({ from, to, text, apiKey });

		return await messagepro.sendMessage({ from, to, text, apiKey });
	};

	function validateInput({ from, to, text, apiKey }) {
		const schema = Joi.object({
			from: Joi.string().required(),
			to: Joi.string().required(),
			text: Joi.string().required(),
			apiKey: Joi.string().required(),
		});
		const { error } = schema.validate({ from, to, text, apiKey });
		if (error) {
			throw new Error(error.message);
		}
	}
};
