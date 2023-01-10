const app = require('./app')

const { MangoClient } = require("mangodb");
const db = MangoClient(process.env.MANGO_URI);

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
