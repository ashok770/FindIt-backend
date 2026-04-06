const Claim = require("../models/Claim");
const LostItem = require("../models/LostItem");
const bcrypt = require("bcryptjs");

// CREATE CLAIM + VERIFY
exports.createClaim = async (req, res) => {
  try {
    const { lostItemId, foundItemId, answers } = req.body;

    const lostItem = await LostItem.findById(lostItemId);
    if (!lostItem) {
      return res.status(404).json({ msg: "Lost item not found" });
    }

    // VERIFY ANSWERS
    let correct = 0;

    for (let i = 0; i < lostItem.secretQuestions.length; i++) {
      const isMatch = await bcrypt.compare(
        answers[i],
        lostItem.secretQuestions[i].answer,
      );

      if (isMatch) correct++;
    }

    // DECIDE RESULT
    if (correct < lostItem.secretQuestions.length) {
      return res.status(400).json({
        msg: "Verification failed ❌",
      });
    }

    // CREATE CLAIM
    const claim = new Claim({
      lostItemId,
      foundItemId,
      claimerId: req.user.id,
      status: "verified",
    });

    await claim.save();

    res.json({
      msg: "Claim verified successfully ✅",
      claim,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
