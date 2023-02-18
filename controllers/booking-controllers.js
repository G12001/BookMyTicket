import mongoose from "mongoose";
import Bookings from "../models/Bookings.js";
import Booking from "../models/Bookings.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const newBooking = async (req, res) => {
  const { movie, date, seatNumber, user } = req.body;

  if (!date || !seatNumber) {
    return res.status(400).json({ message: "Please add all fealds" });
  }

  const existingMovie = await Movie.findById(movie);
  const existingUser = await User.findById(user);

  if (!existingUser || !existingMovie) {
    return res.status(400).json({ message: "Unable to process" });
  }

  let booking;
  try {
    booking = new Booking({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });

    if (!booking) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    const session = await mongoose.startSession();
    await session.startTransaction();
    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
    await existingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  res.status(200).json({ booking });
};

export const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findById(id);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  res.status(200).json({ booking });
};

export const deleteBooking = async (req, res) => {
  const id = req.params.id;

  let booking;
  try {
    booking = await Bookings.findByIdAndRemove(id).populate("user movie");

    if (!booking) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    const session = await mongoose.startSession();
    await session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);
    await booking.user.save({ session });
    await booking.movie.save({ session });
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  res.status(200).json({ id: req.params.id });
};
