import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];

  if (!extractedToken && extractedToken?.trim() === "") {
    res.status(400).json({ message: "Token not found" });
  }

  let adminId;

  // verify token
  jwt.verify(extractedToken, process.env.JWT_SECRET, (error, data) => {
    if (error) {
      res.status(500).json({ message: error.message });
    }
    adminId = data.id;
    return;
  });

  // create new movie
  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body;

  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    res.status(400).json({ message: "Invalid inputs" });
  }

  let movie;
  try {
    movie = new Movie({
      title,
      description,
      actors,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      admin: adminId,
      posterUrl,
    });

    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await movie.save({ session });
    adminUser.addedMovies.push(movie);
    await adminUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!movie) {
    res.status(500).json({ message: "Unexpected error" });
  }

  res.status(201).json({ movie });
};

export const getMovies = async (req, res, next) => {
  let movies;

  try {
    movies = await Movie.find();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!movies) {
    res.status(500).json({ message: "request failed" });
  }

  res.status(200).json({ movies });
};

export const getMovie = async (req, res) => {
  let movie;

  try {
    movie = await Movie.findById(req.params.id);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!movie) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json({ movie });
};
