const express = require("express");
const Remark = require("../models/Remark");
const user = require("../models/Auth");
const report = require("../models/ReviewsInfo");

const remark = async (req, res) => {
  // get the id of the report as a param from which u can get the created by
  const reportid = req.params.id;
  const userId = req.user.id;
  // find the user
  const UserId = await user.findById(userId);
  const newRemark = new Remark({
    reportid: reportid,
    remarkBy: UserId,
    comment: req.body.comment,
    replybutton: req.body.replybutton,
  });
  try {
    const remark = await (await newRemark.save()).populate("reportid");
    res.status(200).json({
      success: true,
      data: {
        remark,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// USER GET ALL HIS/HER REMARK USING THE REPORT HE CREATED
const getremark = async (req, res) => {
  try {
    const remarks = await Remark.find({ reportid: req.params.id })
      .populate("reportid")
      .populate("remarkBy").populate("replyofRemark");
    res.status(200).json({
      success: true,
      data: {
        remarks,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// USER GET A REMARK USING THE REPORT HE CREATED ID
const getaremark = async (req, res) => {
  const id = req.params.id;
  try {
    const remarks = await Remark.findById(id)
      .populate("reportid")
      .populate("remarkBy");
    res.status(200).json({
      success: true,
      data: {
        remarks,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// USER GET ALL HIS/HER REMARK USING THE REPORT HE CREATED ID
const Admingetremark = async (req, res) => {
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

const deletearemark = async (req, res) => {
  // Delete a remark
  const id = req.params.id;
  try {
    const remarks = await Remark.findById(id);
    console.log(remarks);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  remark,
  getremark,
  Admingetremark,
  responseremark,
  getaremark,
  deletearemark,
};
