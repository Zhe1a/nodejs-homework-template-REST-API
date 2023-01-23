const { Schema, model } = require("mongoose");
const emailRegExp = /[\w-]+@([\w-]+\.)+[\w-]+/;

// console.log(url);
// const photoSchema = new Schema({
//   content: {
//     type: Buffer,
//     require: true,
//   },
//   mediaType: {
//     type: String,
//     require: true,
//   },
// });

const user = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegExp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    avatarURL: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", user);

module.exports = User;
