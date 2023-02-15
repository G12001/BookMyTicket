import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";

import MovieItem from "./Movies/MovieItem";

const Homepage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((error) => console.log(error));
  }, []);

  const featuredMovies = movies?.filter((movie) => movie.featured === true);

  const navigate = useNavigate();

  const handleChange = (id) => {
    navigate(`/booking/${id}`);
  };

  // Script for slider
  let slideIndex = 1;
  let flag = true;
  showDivs(slideIndex);

  const plusDivs = (n) => {
    showDivs((slideIndex += n));
  };

  function showDivs(n) {
    let i;
    let x = document.getElementsByClassName("mySlides");
    if (n > x.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    if (flag === false) x[slideIndex - 1].style.display = "block";
    flag = false;
  }

  // setInterval(() => {
  //   plusDivs(1);
  // }, 3000);

  return (
    <Box width="100%" height="100%" margin="auto" marginTop={2}>
      <Box margin="auto" width="80%" height="60vh" padding={4}>
        {featuredMovies &&
          featuredMovies.map((movie) => (
            <>
              <button
                class="w3-button w3-black w3-display-left"
                onClick={() => plusDivs(-1)}
              >
                &#10094;
              </button>
              <img
                display={"block"}
                onClick={() => handleChange(movie._id)}
                src={movie?.posterUrl}
                alt={movie?.title}
                className="mySlides"
                width={"100%"}
                height="100%"
              />
              <button
                class="w3-button w3-black w3-display-right"
                onClick={() => plusDivs(1)}
              >
                &#10095;
              </button>
            </>
          ))}
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign="center">
          Latest Releases
        </Typography>
      </Box>
      <Box
        margin="auto"
        display="flex"
        justifyContent="center"
        width="90%"
        flexWrap="wrap"
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((item, index) => (
              <MovieItem
                key={index}
                id={item._id}
                title={item.title}
                releaseDate={item.releaseDate}
                posterUrl={item.posterUrl}
              />
            ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default Homepage;
