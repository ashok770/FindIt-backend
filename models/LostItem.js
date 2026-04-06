const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  itemName: String,
  brand: String,
  color: String,
  locationLost: String,
  dateLost: Date,
  description: String,

  secretQuestions: [
    {
      question: String,
      answer: String, // hashed
    },
  ],

  status: {
    type: String,
    default: "open",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LostItem", lostItemSchema);
