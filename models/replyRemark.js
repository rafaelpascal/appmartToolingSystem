const mongoose = require("mongoose");

const replyremarkSchema = mongoose.Schema({
  remarkid: {
    type: mongoose.Types.ObjectId,
    ref: "Remark",
  },
  replyByid: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  replyRemark: {
    type: String,
    required: [true],
  },
//   replybutton: {
//     type: String,
//   },
},{timestamps: true});

module.exports = mongoose.model("ReplyRemark", replyremarkSchema);
