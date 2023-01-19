const mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isVarifed: { type: Boolean, default: false },
  role: { type: String },
  otp: { type: String },
  adminId: { type: String }
}, {
  timestamps: true
})

module.exports = mongoose.model("User", userSchema)