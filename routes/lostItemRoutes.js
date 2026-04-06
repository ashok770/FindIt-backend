const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { createLostItem } = require("../controllers/lostItemController");

router.post("/", auth, createLostItem);

module.exports = router;
