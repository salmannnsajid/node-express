const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(port);
});
