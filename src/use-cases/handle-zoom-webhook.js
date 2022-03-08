module.exports = function makeHandleZoomWebhook({ videoConferencingAccountDb, activityConferenceDataDb, Joi, ValidationError, enqueueJob, kafkaConfig, devAPICall }) {
	return async function handleZoomWebhook({ webhookObject }) {
		validateInput({ webhookObject });

		if (webhookObject.event === "recording.completed") {
			const providerConferenceId = webhookObject.payload.object.id;
			const providerIdentifier = webhookObject.payload.object.host_id;

			const videoConferenceAccounts = await videoConferencingAccountDb.getAccountByProviderIdentifier({
				providerIdentifier,
			});

			for (const videoConferenceAccount of videoConferenceAccounts) {
				const videoConferenceAccountId = videoConferenceAccount.id;

				await activityConferenceDataDb.updateRecordingDataByProviderConferenceIdAndConferenceAccountId({
					providerConferenceId,
					videoConferenceAccountId,
					recordingData: {
						playURL: webhookObject.payload.object.share_url,
						downloadURL: webhookObject.payload.object.share_url,
						totalSize: webhookObject.payload.object.total_size,
						password: webhookObject.payload.object.password,
					},
				});

				const conferenceData = await activityConferenceDataDb.getConferenceDataByProviderConferenceIdAndAccountId({
					providerConferenceId,
					videoConferenceAccountId,
				});

				if (conferenceData) {
					const message = {
						linkname: videoConferenceAccount.linkname,
						activityConferenceDataId: conferenceData.id,
					};
					await enqueueJob({ topic: kafkaConfig, message, linkname: videoConferenceAccount.linkname });
				}
			}
		}

		return {};
	};

	function validateInput({ webhookObject }) {
		const schema = Joi.object({
			webhookObject: Joi.object(),
		});
		const { error } = schema.validate({ webhookObject });
		if (error) {
			throw new ValidationError(error.message);
		}
	}
};
