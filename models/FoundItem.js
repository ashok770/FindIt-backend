const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  itemName: String,
  brand: String,
  color: String,
  locationFound: String,
  dateFound: Date,
  description: String,

  image: {
    type: String, // URL (for now simple)
  },

  status: {
    type: String,
    default: "unclaimed",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FoundItem", foundItemSchema);
