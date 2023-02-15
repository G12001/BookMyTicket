import mongoose from "mongoose";

const bookingsSchema = mongoose.Schema({
  movie: {
    type: mongoose.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  date: {
    type: Date,
    required: [true, "Please add a date"],
  },
  seatNumber: {
    type: Number,
    required: [true, "Please add a seatNumber"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Booking", bookingsSchema);
