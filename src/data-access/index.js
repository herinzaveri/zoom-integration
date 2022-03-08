const mongoose = require("mongoose");

const Data = require("./models/data");
const config = require("../config");

const connectFunction = async () => {
	conn = await mongoose.connect(config.mongoDB.mongoURI);

	console.log("connected to mongoDB successfully");
};

connectFunction();

const addMeeting = async (args) => {
	const data = new Data(args);

	await data.save();
};

module.exports = {
	addMeeting,
};
