require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");



// Database
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Hey from server" });
});



app.listen(3000, () => {
  console.log("Server is running.");
});
