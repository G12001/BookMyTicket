import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";
import Carousel from "react-material-ui-carousel";
import MovieItem from "./Movies/MovieItem";
import { errorActions } from "../store";

const Homepage = () => {
  const dispatch = useDispatch();
  const { isError, message } = useSelector((state) => state.error.isError);
  useEffect(() => {
    if (isError === true) {
      toast.error(message);
    }
  }, [isError, message, dispatch]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((error) => dispatch(errorActions.setMessage(error.message)));
  }, [dispatch]);

  const featuredMovies = movies?.filter((movie) => movie.featured === true);

  const navigate = useNavigate();

  const handleChange = (id) => {
    navigate(`/booking/${id}`);
  };

  return (
    <Box width="100%" height="100%" margin="auto" marginTop={2}>
      <Box margin="auto" width="90%" height="60vh" padding={4}>
        <Carousel>
          {featuredMovies &&
            featuredMovies.map((movie, index) => (
              <Box
                height="50vh"
                width="100%"
                key={index}
                overflow="hidden"
                onClick={() => handleChange(movie?._id)}
              >
                <img
                  src={movie?.posterUrl}
                  height="100%"
                  width={"100%"}
                  alt={movie?.title}
                />
              </Box>
            ))}
        </Carousel>
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
