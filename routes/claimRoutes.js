const express = require("express");
const router = express.Router();

const { createClaim } = require("../controllers/claimController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createClaim);

module.exports = router;
