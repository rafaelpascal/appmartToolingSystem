const mongoose = require("mongoose");

const remarkSchema = mongoose.Schema({
  reportid: {
    type: mongoose.Types.ObjectId,
    ref: "Report",
  },
  remarkBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  replyofRemark: {
    type: Array,
  },
  comment: {
    type: String,
    required: [true, "Category is Requires"],
  },
  replybutton: {
    type: String,
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
},{timestamps: true});

module.exports = mongoose.model("Remark", remarkSchema);
