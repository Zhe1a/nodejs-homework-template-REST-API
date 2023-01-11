const app = require('./app')
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.MANGO_URI;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log("Database connection successful");
    });
  })
.catch(err =>
    console.log(`Server not running. Error message: ${err.message}`),
    // process.exit(1),
  );