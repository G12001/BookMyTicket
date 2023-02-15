import express from "express";
import { addMovie, getMovies, getMovie } from "../controllers/movie-controller.js";

const movieRouter = express.Router();

movieRouter.get("/", getMovies);
movieRouter.get("/:id", getMovie);
movieRouter.post("/", addMovie);

export default movieRouter;
