const express = require("express");
const eventRoutes = require("./routes/eventRoute");
const userRoutes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoute");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  });

app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is listening port : ${port}`);
});
