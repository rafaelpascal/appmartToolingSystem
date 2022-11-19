const mongoose = require("mongoose");

const replySchema = mongoose.Schema(
  {
    remarkId: {
      type: mongoose.Types.ObjectId,
      ref: "Remark",
    },
    replyBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reply: {
      type: String,
      required: [true, "Category is Requires"],
    },
    date: { 
      type: Date, 
      default: Date.now 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", replySchema);
