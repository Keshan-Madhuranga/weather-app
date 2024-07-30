const express = require("express");
const routes = require("./api/routes/main");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

app.use("*", async (req, res) => {
  res.status(404).json({
    status_code: 404,
    error_code: "not_found",
  });
});

module.exports = app;
