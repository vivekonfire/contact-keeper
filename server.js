const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();

connectDB();

app.use(express.json({ extended: false, limit: "50mb" }));

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
