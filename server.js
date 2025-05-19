const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const passport = require("passport");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

require("./middleware/passportAuth")(passport); // configure passport

const connectDB = require("./config/db");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(limiter);
app.use(helmet());
app.use(cookieParser("cookieSecret"));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
app.use("/uploads", express.static("uploads"));

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
