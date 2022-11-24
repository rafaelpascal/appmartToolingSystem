const express = require("express");
const Notification = require("../models/remarkNotification");
const User = require("../models/Auth");
const Report = require("../models/ReviewsInfo");
const Remark = require("../models/Remark");

// CREATE NOTIFICATION
const createNotification = async (req, res) => {
  try {
    const reportId = req.body.report;
    const userId = req.body.createdBy;
    const remarkId = req.body.remark;
    const idReport = await Report.findById(reportId);
    const idUser = await User.findById(userId);
    const idRemark = await Remark.findById(remarkId);
    // console.log(idUser);
    const newNotification = new Notification({
      report: idReport,
      createdBy: idUser,
      remark: idRemark,
    });
    const noti = await newNotification.save();
    res.status(200).json({
      success: true,
      data: { noti, nbHits: noti.length },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = {
  createNotification,
};
