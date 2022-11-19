const mongoose = require("mongoose");

const replycommentSchema = mongoose.Schema({
  replyid: {
    type: mongoose.Types.ObjectId,
    ref: "Reply",
  },
  replyByid: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  commentReply: {
    type: String,
    required: [true],
  },
//   replybutton: {
//     type: String,
//   },
},{timestamps: true});

module.exports = mongoose.model("Replycomment", replycommentSchema);
