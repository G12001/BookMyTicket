import express from "express";
import {
  signUp,
  loginUser,
  getUserBookings,
  getUser,
} from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.get("/:id", getUser);
userRouter.post("/signup", signUp);
userRouter.post("/login", loginUser);
userRouter.get("/bookings/:id", getUserBookings);

export default userRouter;
