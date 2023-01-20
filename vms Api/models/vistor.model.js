const mongoose = require("mongoose")

let vistorSchema = new mongoose.Schema({
  vistorName: { type: String, required: true },
  meetPersonName: { type: String, required: true },
  deportment: { type: String, required: true },
  status: { type: Boolean, default: true },
  enterBy: { type: String, required: true },
}, {
  timestamps: true
})
module.exports = mongoose.model("vistor", vistorSchema)