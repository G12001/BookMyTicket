import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import Movie from "../models/Movie.js";

export const addMovie = async (req, res) => {
  const extractedToken = req.headers.authorization.split(" ")[1];

  if (!extractedToken && extractedToken?.trim() === "") {
    return res.status(400).json({ message: "Token not found" });
  }

  let adminId;

  // verify token
  jwt.verify(extractedToken, process.env.JWT_SECRET, (error, data) => {
    if (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    adminId = data.id;
  });

  // create new movie
  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body;

  if (!title || !description || !posterUrl) {
    return res.status(400).json({ message: "Please add all fields" });
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

    if (!movie) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await movie.save({ session });
    adminUser.addedMovies.push(movie);
    await adminUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  res.status(200).json({ message: "Movie added successfully", movie });
};

export const getMovies = async (req, res) => {
  let movies;

  try {
    movies = await Movie.find();
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  res.status(200).json({ movies });
};

export const getMovie = async (req, res) => {
  let movie;

  try {
    movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  res.status(200).json({ movie });
};
