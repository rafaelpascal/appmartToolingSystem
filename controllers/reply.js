const express = require("express");
const Reply = require("../models/Reply");
const user = require("../models/Auth");
// const report = require("../models/ReviewsInfo");
// const socketio = require("socket.io");

const reply = async (req, res) => {
  // get the id of the report as a param from which u can get the created by
  const remarkid = req.params.id;
  const userId = req.user.id;
  // find the user
  const UserId = await user.findById(userId);
  const newReply = new Reply({
    remarkId: remarkid,
    replyBy: UserId,
    reply: req.body.reply,
  });
  try {
    const reply = await (await newReply.save()).populate("remarkId");
    res.status(200).json({
      success: true,
      data: {
        reply,
        //   message: "User Deactivated Successfully",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// USER GET ALL HIS/HER REMARK USING THE REPORT HE CREATED ID

const getreplys = async (req, res) => {
  // GET REPORT BASED ON THE PERSON THE REPORTED

  try {
    const replys = await Reply.find({ remarkid: req.params.id })
      .populate("remarkId")
      .populate("replyBy");
    res.status(200).json({
      success: true,
      data: {
        replys,
        //   message: "User Deactivated Successfully",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// USER GET ALL HIS/HER REMARK USING THE REPORT HE CREATED ID

const deletearemark = async (req, res) => {
  // GET REPORT BASED ON THE PERSON THE REPORTED
  const id = req.params.id;
  try {
    const remarks = await Reply.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      data: {
        remarks,
        message: "Comment Deleted Successfully",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// USER GET ALL HIS/HER REMARK USING THE REPORT HE CREATED ID
const Admingetremark = async (req, res) => {
  // GET REPORT BASED ON THE PERSON THE REPORTED

  try {
    const remarks = await Remark.find({ remarkBy: req.params.id });
    res.status(200).json({
      success: true,
      data: {
        remarks,
        //   message: "User Deactivated Successfully",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// RESPOND TO A REMARK
const responseremark = async (req, res) => {
  const remarkId = req.params.id;

  try {
    const remarks = await Remark.findByIdAndUpdate(remarkId, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("reportid")
      .populate("remarkBy");
    res.status(200).json({
      success: true,
      data: {
        remarks,
        //   message: "User Deactivated Successfully",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  reply,
  getreplys,
  deletearemark,
};
