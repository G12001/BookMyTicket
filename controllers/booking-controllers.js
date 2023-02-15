import mongoose from "mongoose";
import Bookings from "../models/Bookings.js";
import Booking from "../models/Bookings.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const newBooking = async (req, res) => {
  const { movie, date, seatNumber, user } = req.body;

  let existingMovie;
  let existingUser;

  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!existingUser) {
    return res.status(400).json("Unable to process");
  }

  if (!existingMovie) {
    return res.status(400).json("Unable to process");
  }

  let booking;
  try {
    booking = new Booking({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });

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
    return res.status(500).json({ message: error.message });
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable to book movie" });
  }

  res.status(200).json({ booking });
};

export const getBookingById = async (req, res, next) => {
  const id = req.params.id;

  let booking;
  try {
    booking = await Bookings.findById(id);
  } catch (error) {
    return res.ststus(500).json({ message: error.message });
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable to get data" });
  }

  return res.status(200).json({ booking });
};

export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;

  let booking;
  try {
    booking = await Bookings.findByIdAndRemove(id).populate("user movie");
    const session = await mongoose.startSession();
    await session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);
    await booking.user.save({ session });
    await booking.movie.save({ session });
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable to delete" });
  }

  return res
    .status(200)
    .json({ message: "Successfully deleted", id: req.params.id });
};
