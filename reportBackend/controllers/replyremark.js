const express = require("express");
const replyRemark = require("../models/replyRemark");
const user = require("../models/Auth");
// const report = require("../models/ReviewsInfo");
// const socketio = require("socket.io");


const remarkreply = async (req, res) => {
  // get the id of the report as a param from which u can get the created by
  const remarkid = req.params.id;
  const userId = req.user.id;
  // find the user
  const UserId = await user.findById(userId);
  const newReply = new replyRemark({
    remarkid: remarkid,
    replyByid: UserId,
    replyRemark: req.body.replyRemark,
    // replybutton: req.body.replybutton,
  });
  try {
    const reply = await (await newReply.save()).populate("remarkid");
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

const getremarkreplys = async (req, res) => {
  // GET REPORT BASED ON THE PERSON THE REPORTED

  try {
    const replys = await replyRemark.find()
      .populate("remarkid")
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

const getaremark = async (req, res) => {
  // GET REPORT BASED ON THE PERSON THE REPORTED
  const id = req.params.id
  try {
    const remarks = await replyRemark.findById(id)
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
    remarkreply,
    getremarkreplys,
    getaremark,
};
