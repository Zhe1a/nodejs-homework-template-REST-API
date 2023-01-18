const { Schema, model } = require("mongoose");

const contact = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});
const Contacts = model("contact", contact);

module.exports = Contacts;
