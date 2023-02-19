import { Box, Typography } from "@mui/material";
import React from "react";
import MovieItem from "./MovieItem";
import { getAllMovies } from "../../api-helpers/api-helpers";
import { useState, useEffect } from "react";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Box margin="auto" marginTop={4}>
      <Typography
        bgcolor="#900C3F"
        color="white"
        margin="auto"
        variant="h4"
        textAlign="center"
        padding={2}
        width="40%"
      >
        All Movies
      </Typography>

      <Box
        margin="auto"
        marginTop={5}
        display="flex"
        justifyContent="center"
        width="100%"
        flexWrap="wrap"
      >
        {movies &&
          movies.map((item, index) => (
            <MovieItem
              key={index}
              id={item._id}
              title={item.title}
              releaseDate={item.releaseDate}
              posterUrl={item.posterUrl}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Movies;
