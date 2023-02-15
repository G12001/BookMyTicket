import express from "express";
import {
  getAllUsers,
  signUp,
  updateUser,
  deleteUser,
  loginUser,
  getUserBookings,
  getUser,
} from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.post("/signup", signUp);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", loginUser);
userRouter.get("/bookings/:id", getUserBookings);

export default userRouter;
