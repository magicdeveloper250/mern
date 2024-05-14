require("dotenv").config();
const path = require("path");
const express = require("express");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const app = express();
const PORT = process.env.PORT;
connectDB();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(logger);

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/posts", require("./routes/postsRouters"));
app.use("/users", require("./routes/usersRouters"));
app.use("/auth", require("./routes/authRouters"));
app.all("*", (req, resp) => {
  resp.status(404);
  if (req.accepts("html")) {
    resp.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    resp.json({ message: "404 Not found" });
  } else {
    resp.type("txt").send("404 Not found");
  }
});
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connection to the database is established");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  logEvents(
    `${err.no}\t${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
