const path = require("path");
const express = require("express");
require("colors");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));

// Serve Frontend
// if (process.env.NODE_ENV === "production") {
//   // Set build folder as static
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   // FIX: below code fixes app crashing on refresh in deployment
//   app.get("*", (_, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
//   });
// } else {
//   app.get("/", (_, res) => {
//     res.status(200).json({ message: "Welcome to the Support Desk API" });
//   });
// }

const PORT = process.env.PORT || 8000;

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`.blue.bold));
