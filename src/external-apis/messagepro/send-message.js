module.exports = ({ axios, config }) => {
	return async ({ apiKey, from, to, text }) => {
		const headers = {
			apiKey,
			"Content-Type": "application/json",
		};

		const body = {
			from,
			to,
			body: text,
		};

		return axios({
			method: "post",
			baseURL: `${config.messagepro.baseUrl}`,
			url: `/smsmms/v3/messages`,
			headers,
			data: body,
		})
			.then(function (response) {
				if (response.status === 200) {
					return response.data;
				} else {
					return response;
				}
			})
			.catch((error) => {
				throw new Error(error.message);
			});
	};
};
