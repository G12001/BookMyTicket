import express from "express";
import {
  newBooking,
  getBookingById,
  deleteBooking,
} from "../controllers/booking-controllers.js";

const bookingsRouter = express.Router();

bookingsRouter.post("/", newBooking);
bookingsRouter.get("/:id", getBookingById);
bookingsRouter.delete("/:id", deleteBooking);

export default bookingsRouter;
