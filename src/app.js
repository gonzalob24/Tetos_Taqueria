"use strict";

const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, "../templates/views");

// app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.set("views", viewsPath);

app.use(express.static("./"));

app.get("/", (req, res) => {
	const fl = path.join(__dirname, "/templates/views/index.html");
	res.render("index.html");
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
