require("dotenv").config();

const connectDB = require("./config/db");

(async () => {
  await connectDB();

  const express = require("express");
  const cors = require("cors");

  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Test Route
  app.get("/", (req, res) => {
    res.send("FindIt Backend Running 🚀");
  });

  // PORT
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
