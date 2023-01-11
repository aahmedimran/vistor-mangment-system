const mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isVarifed: { type: Boolean, default: false },
  role: { type: String, required: true },
  otp: { type: String }
}, {
  timestamps: true
})
// const userModel = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema)