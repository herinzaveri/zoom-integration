module.exports = {
	mongoDB: {
		mongoURI: "mongodb+srv://herin:herin@cluster0.c55xh.mongodb.net/ZoomIntegration?retryWrites=true&w=majority",
	},
	nodemailer: {
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		user: "chaitanyaranaa02@gmail.com",
		pass: "Chait.0211",
	},
	zoom: {
		baseUrl: "https://api.zoom.us",
		oauthUrl: "https://zoom.us/oauth",
		clientId: "",
		clientSecret: "",
		redirectUrl: "",
		jwtToken: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjFSREhRSEVZUlQ2VEdUZEZFWndwRHciLCJleHAiOjE2NDczMjI3MDcsImlhdCI6MTY0NjcxNzkwOH0.fNZZHzZYp9Aj4BuLvKrd29L1Bu0Q0WZF-guY_XeGgYM",
	},
	messagepro: {
		baseUrl: "https://msgapi.MessagePro.com",
		apiKey: "",
	},
};
