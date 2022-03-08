module.exports = ({ handleZoomWebhook, Joi }) => {
	return async (req, res) => {
		validateInput({ webhookObject: req.body });

		handleZoomWebhook({ webhookObject: req.body });

		return res.send("Ok");
	};

	function validateInput({ webhookObject }) {
		const schema = Joi.object({
			webhookObject: Joi.object(),
		});
		const { error } = schema.validate({ webhookObject });
		if (error) {
			throw new Error(error.message);
		}
	}
};
