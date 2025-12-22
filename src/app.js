require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger");
const { authenRoutes } = require("./routes");

const app = express();
app.use(express.json());

app.use("/api", authenRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
