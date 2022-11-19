const express = require("express");
const Review = require("../models/ReviewsInfo");

// ADMIN GET ALL REPORT
const viewallReview = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate("createdBy");;
    res
      .status(200)
      .json({ success: true, data: { reviews, nbHits: reviews.length } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET A SINGLE RECORD
const viewaReview = async (req, res) => {
    const reviewId = req.params.id

    try {
      const review = await Review.findById(reviewId);
      res
        .status(200)
        .json({ success: true, data: { review, nbHits: review.length } });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

// ADD A REMARK
const remark = async (req, res) => {
  const reviewId = req.params.id
  const newRemark = ({
    comment: req.body.comment
  })
  try {
    const remark = await Review.findByIdAndUpdate(reviewId, newRemark, {
      new:true,
      runValidators:true
    });
    res
      .status(200)
      .json({ success: true, data: { remark, nbHits: remark.length } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
module.exports = {
  viewallReview,
  viewaReview,
  remark
};
