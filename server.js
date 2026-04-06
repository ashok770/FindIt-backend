const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const lostItemRoutes = require("./routes/lostItemRoutes");
const foundItemRoutes = require("./routes/foundItemRoutes");
const matchRoutes = require("./routes/matchRoutes");
const claimRoutes = require("./routes/claimRoutes");

const app = express();

// CONNECT DB
connectDB();

// MIDDLEWARE (THIS MUST BE BEFORE ROUTES)
app.use(cors());
app.use(express.json()); // 🔥 VERY IMPORTANT

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/lost", lostItemRoutes);
app.use("/api/found", foundItemRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/claim", claimRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("FindIt Backend Running 🚀");
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
