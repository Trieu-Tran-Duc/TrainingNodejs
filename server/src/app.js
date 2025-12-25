require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const errorHandler = require("./middleware/globalErrorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger");
const { 
    authenRoutes,
    userRoutes 
} = require("./routes");

const app = express();
app.use(helmet(
    {
        contentSecurityPolicy: false,
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authenRoutes);
app.use("/api/user", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

module.exports = app;
