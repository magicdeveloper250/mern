const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: Array,
    default: ["user"],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", userSchema);
