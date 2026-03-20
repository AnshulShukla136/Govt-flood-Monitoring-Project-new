require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const waterRoutes = require("./routes/waterRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/water", waterRoutes);
app.use("/api/stats", statsRoutes);

app.use((err,req,res,next)=>{
  console.error(err);
  res.status(500).json({success:false,message:"Server Error"});
});

app.listen(process.env.PORT, ()=>{
  console.log("Server Running on Port", process.env.PORT);
});
