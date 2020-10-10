require("dotenv").config();
const mongoose = require("mongoose");
connectionDB = () => {
  mongoose
    .connect(process.env.URI, {
      dbName: "Amongshare",
      user: process.env.USER,
      pass: process.env.PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("database connected!!");
    })
    .catch(() => {
      console.log("Failed to connect to database!!");
    });
};

module.exports = connectionDB;
