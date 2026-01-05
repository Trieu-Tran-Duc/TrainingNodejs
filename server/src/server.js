require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/database");

connectDB().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
}).catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
