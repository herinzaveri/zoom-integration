module.exports = ({ axios, config }) => {
	return async ({ accessToken, topic, startDateTime, duration, timezone, agenda }) => {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		};

		const body = {
			topic,
			start_time: startDateTime,
			duration,
			timezone,
			agenda,
			settings: {
				auto_recording: "cloud",
			},
		};

		return axios({
			method: "post",
			baseURL: `${config.zoom.baseUrl}`,
			url: `/v2/users/me/meetings`,
			headers,
			data: body,
		})
			.then(function (response) {
				if (response.status === 201) {
					return response.data;
				} else {
					return response;
				}
			})
			.catch((error) => {
				if (error.message === "Request failed with status code 401") {
					throw new Error("Unauthorized Access. Please reconfigure the selected zoom account");
				}
				throw new Error(error.message);
			});
	};
};
