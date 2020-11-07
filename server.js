const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

// Setup
const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const baseURL = "https://api.clashofclans.com/v1/players/%23";
app.get("/api/players/:id", (req, res) => {
	try {
		const fetchData = async () => {
			const playerID = req.params.id;
			const result = await fetch(baseURL + playerID, {
				headers: {
					Accept: "*/*",
					"content-type": "application/json; charset=utf-8",
					Authorization: "Bearer " + process.env.CLASH_KEY,
				},
			});
			const data = await result.json();
			res.status(200).send(data);
		};

		fetchData();
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

app.get("/", (req, res) =>
	res.status(200).send("Welcome to the Clash backend.")
);

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
