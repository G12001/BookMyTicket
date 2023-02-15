import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  actors: [{ type: String, required: true }],
  releaseDate: {
    type: Date,
    required: [true, "Please add a release date"],
  },
  posterUrl: {
    type: String,
    required: [true, "Please add a poster url"],
  },
  featured: {
    type: Boolean,
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

export default mongoose.model("Movie", movieSchema);
