const FoundItem = require("../models/FoundItem");

// CREATE FOUND ITEM
exports.createFoundItem = async (req, res) => {
  try {
    const {
      itemName,
      brand,
      color,
      locationFound,
      dateFound,
      description,
      image,
    } = req.body;

    const newItem = new FoundItem({
      userId: req.user.id,
      itemName,
      brand,
      color,
      locationFound,
      dateFound,
      description,
      image,
    });

    await newItem.save();

    res.status(201).json({ msg: "Found item reported successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
