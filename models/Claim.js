const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  lostItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LostItem",
    required: true,
  },
  foundItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoundItem",
    required: true,
  },

  claimerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "verified", "rejected", "approved"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Claim", claimSchema);
