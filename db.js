const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MANGO_URI, { dbName: "db-contacts" })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
