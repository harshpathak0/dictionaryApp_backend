const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.set("strictQuery", false);

// const mongoURI = "mongodb://localhost:27017/word_meaning";
const mongoURI = "mongodb+srv://pathakharsh9644:1K8EtlBChnwuQ16V@cluster0.cw3sl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("error", (err) => {
  console.error(`Unable to connect to database: ${mongoURI}`, err);
  process.exit(1);
});
mongoose.connection.once("connected", () => {
  console.log(`Successfully connected to the database`);
});

const routes = require("./src/routes");
app.use("/api", routes);

const port = process.env.BACKEND_PORT || 8000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});