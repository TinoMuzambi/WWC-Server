const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Setup
const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
