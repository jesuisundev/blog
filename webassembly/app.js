const express = require("express");
const path = require("path");
const app = express();

express.static.mime.types["wasm"] = "application/wasm";

app.use(express.static(path.join(__dirname, "public")));
app.use("/", (req, res, next) => res.render("index"));

app.listen(8080);
