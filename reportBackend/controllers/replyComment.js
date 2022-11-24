const express = require("express");
const replyComment = require("../models/replyComment");
const user = require("../models/Auth");
// const report = require("../models/ReviewsInfo");
// const socketio = require("socket.io");


const commentreply = async (req, res) => {
  // get the id of the report as a param from which u can get the created by
  const replyid = req.params.id;
  const userId = req.user.id;
  // find the user
  const UserId = await user.findById(userId);
  const newReply = new replyComment({
    replyid: replyid,
    replyByid: UserId,
    commentReply: req.body.commentReply,
    // replybutton: req.body.replybutton,
  });
  try {
    const reply = await (await newReply.save()).populate("replyid");
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

const getcommentreplys = async (req, res) => {
  // GET REPORT BASED ON THE PERSON THE REPORTED

  try {
    const replys = await replyComment.find()
      .populate("replyid")
      .populate("replyByid");
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

const getacommentremark = async (req, res) => {
  // GET REPORT BASED ON THE PERSON THE REPORTED
  const id = req.params.id
  try {
    const remarks = await replyComment.findById(id)
      .populate("remarkid")
      .populate("replyByid");
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
    commentreply,
    getcommentreplys,
    getacommentremark,
};
