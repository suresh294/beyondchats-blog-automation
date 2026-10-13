const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("server is running");
});

const articleRoutes = require("./routes/articleRoutes");
app.use("/api/articles", articleRoutes);

const scrapeRoutes = require("./routes/scraperoutes");
app.use("/api/scrape", scrapeRoutes);

const connectDB = require("./config/db");
const PORT = Number.parseInt(process.env.PORT || "5000", 10);

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    throw new Error("PORT must be a valid TCP port");
}

const cron = require("node-cron");
const { execFile } = require("child_process");
const path = require("path");

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Server startup failed:", error.message);
    process.exitCode = 1;
});

cron.schedule("0 0 * * *", () => {
    console.log("Running scheduled scrape job...");
    execFile(process.execPath, [path.join(__dirname, "jobs", "scrapeJob.js")], (error) => {
        if (error) console.error("Scheduled scrape job failed:", error.message);
    });
});

module.exports = app;
