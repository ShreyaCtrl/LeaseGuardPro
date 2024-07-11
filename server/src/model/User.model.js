const { Schema, model } = require("mongoose");

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  account_type: {
    type: String,
    enum: ["Creator", "Authorizer", "Admin"],
    required: true,
  },
});

const UsersModel = model("Users", UsersSchema);
module.exports = UsersModel;