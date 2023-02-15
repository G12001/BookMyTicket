import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDtails, newBooking } from "../../api-helpers/api-helpers";
import { useState, useEffect } from "react";
import { Button, FormLabel, TextField, Typography, Box } from "@mui/material";

const Booking = () => {
  const id = useParams().id;
  const navigate = useNavigate();

  const [movieDtails, setMovieDtails] = useState();
  useEffect(() => {
    getMovieDtails(id)
      .then((res) => setMovieDtails(res.movie))
      .catch((error) => console.log(error));
  }, [id]);

  const [inputs, setInputs] = useState({
    seatNumber: "",
    date: "",
  });

  const inputHandler = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newBooking({ ...inputs, movie: movieDtails._id })
      .then(() => navigate("/user-profile"))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      {movieDtails && (
        <Fragment>
          <Typography
            padding={3}
            textAlign="center"
            variant="h4"
            fontFamily={"fantasy"}
          >
            Book tickets of movie: {movieDtails.title}
          </Typography>
          <Box display={"flex"} justifyContent="center">
            <Box
              display={"flex"}
              justifyContent="column"
              flexDirection={"column"}
              width="50%"
              paddingTop={3}
              marginRight="auto"
            >
              <img
                width={"80%"}
                height="300px"
                src={movieDtails.posterUrl}
                alt={movieDtails.title}
              />
              <Box width={"80%"} margin={3} padding={2}>
                <Typography paddingTop={2}>
                  {movieDtails.description}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Starrer :{" "}
                  {movieDtails?.actors?.map((actor) => " " + actor + " ")}
                </Typography>
                <Typography marginTop={1} fontWeight="bold">
                  Release Date :
                  {new Date(movieDtails.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin="auto"
                  display={"flex"}
                  flexDirection="column"
                >
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    type={"number"}
                    variant="standard"
                    margin="normal"
                    value={inputs.seatNumber}
                    onChange={inputHandler}
                  />
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type={"date"}
                    variant="standard"
                    margin="normal"
                    value={inputs.bookingDate}
                    onChange={inputHandler}
                  />
                  <Button type="submit">Book</Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
