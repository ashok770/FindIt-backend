const express = require("express");
const router = express.Router();

const { createFoundItem } = require("../controllers/foundItemController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createFoundItem);

module.exports = router;
