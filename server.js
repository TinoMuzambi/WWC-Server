const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const request = require("request")

// Setup
const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/api/player/:id", (req, res) => {
	const baseURL = "https://api.clashofclans.com/v1/players/%23" + req.params.id;
			// const result = await fetch(baseURL, {
			// 	headers: {
			// 		"content-type": "application/json; charset=utf-8",
			// 		Authorization: "Bearer " + process.env.CLASH_KEY,
			// 	},
			// });
			// const data = await result.json();
			// res.status(200).send(data);

	const options = {
		proxy: process.env.HTTP_PROXY,
		url: baseURL,
		headers: {
			"content-type": "application/json; charset=utf-8",
			Authorization: "Bearer " + process.env.CLASH_KEY,
		}
	}

	const cb = (error, response, body) => {
		console.log(response.statusCode);
		console.log(body)
		if (!error && response.statusCode == 200) {
			console.log(body)
			res.status(200).send(body)
		}
		else {
			console.log(error);
			res.status(500).send("Error yo")
		}
	}

	request(options, cb);

});

app.get("/api/clan/:id", (req, res) => {
	const baseURL = "https://api.clashofclans.com/v1/clans/%23";
	try {
		const fetchData = async () => {
			const clanID = req.params.id;
			const result = await fetch(baseURL + clanID, {
				headers: {
					Accept: "*/*",
					"content-type": "application/json; charset=utf-8",
					Authorization: "Bearer " + process.env.CLASH_KEY,
				},
				agent: new HttpProxyAgent(process.env.FIXIE_URL),
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
