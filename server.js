const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// CONNECT DB
connectDB();

// MIDDLEWARE (THIS MUST BE BEFORE ROUTES)
app.use(cors());
app.use(express.json()); // 🔥 VERY IMPORTANT

// ROUTES
app.use("/api/auth", authRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("FindIt Backend Running 🚀");
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
