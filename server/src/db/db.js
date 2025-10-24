const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.log("MongoDB Connection error: ", error);
    });
};

module.exports = connectDB;
