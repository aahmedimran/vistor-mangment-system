const mongoose = require("mongoose")

// deportmentSchema
let deportmentSchema = new mongoose.Schema({
  deportmentName: { type: String, required: true, trim: true },
  contactPerson: { type: String, required: true },
  createdBy: { type: String, required: true }
}
  ,
  {
    timestamps: true
  },

)
module.exports = mongoose.model("deportment", deportmentSchema);