const LostItem = require("../models/LostItem");
const bcrypt = require("bcryptjs");

// CREATE LOST ITEM
exports.createLostItem = async (req, res) => {
  try {
    const {
      itemName,
      brand,
      color,
      locationLost,
      dateLost,
      description,
      secretQuestions,
    } = req.body;

    // HASH SECRET ANSWERS
    const hashedQuestions = await Promise.all(
      secretQuestions.map(async (q) => {
        const salt = await bcrypt.genSalt(10);
        const hashedAnswer = await bcrypt.hash(q.answer, salt);

        return {
          question: q.question,
          answer: hashedAnswer,
        };
      }),
    );

    const newItem = new LostItem({
      userId: req.user.id, // from JWT
      itemName,
      brand,
      color,
      locationLost,
      dateLost,
      description,
      secretQuestions: hashedQuestions,
    });

    await newItem.save();

    res.status(201).json({ msg: "Lost item reported successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
