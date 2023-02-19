import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";
import path from "path";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

// database connection
connectDB();

// middlewares

app.use(express.json());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

// Serve client
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "./", "client", "build", "index.html"))
);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
