const express= require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require("dotenv").config();

const app=express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send ("server is running");
});

// Routes
const articleRoutes = require("./routes/articleRoutes");
app.use("/api/articles", articleRoutes);

const scrapeRoutes = require("./routes/scraperoutes");
app.use("/api/scrape", scrapeRoutes);


// Connect to MongoDB
const connectDB=require("./config/db");
connectDB();

const PORT=5000;
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});

const cron = require("node-cron");
const { exec } = require("child_process");

// midnight
cron.schedule("0 0 * * *", () => {
  console.log("⏰ Running scheduled scrape job...");
  exec("node jobs/scrapeJob.js");
});
