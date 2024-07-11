const mongoose = require("mongoose");

const connectDb = () => {
  return mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log("catch error", err);
    });
};

module.exports = connectDb;
