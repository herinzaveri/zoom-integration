const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const router = require("./src/routes");

app.use("/", router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
