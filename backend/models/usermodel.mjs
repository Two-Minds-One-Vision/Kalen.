// const mongoose = require("mongoose");
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // validate: [validators.notEmpty, 'Name is empty']
  },
  username: {
    type: String,
    required: true,
    unique: true,
    // validate: [validators.notEmpty, 'Username is empty']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: [validators.notEmpty, 'Email is empty']
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
