const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

const router = require("./src/routes");

app.get("/home", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/", router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
