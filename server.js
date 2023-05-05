require("dotenv").config();
const cors = require("cors");

const express = require('express');

const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to DB"));

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());

const supplementsRouter = require("./routes/supplements")
app.use("/supplements", supplementsRouter);

app.listen(3000, () => console.log("Server Started"));

