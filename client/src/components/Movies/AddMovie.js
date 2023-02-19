import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMovie } from "../../api-helpers/api-helpers";
import { toast } from "react-toastify";
import { errorActions } from "../../store";

const labelProps = {
  mt: 1,
  mb: 1,
};

const AddMovie = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, message } = useSelector((state) => state.error);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  if (!isAdminLoggedIn) {
    navigate("/");
  }
  useEffect(() => {
    if (isError === true) {
      toast.error(message);

      dispatch(errorActions.reset());
    }
  }, [isError, message, dispatch]);

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");

  const inputHandler = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addActor = () => {
    setActors((prev) => [...prev, actor]);
    setActor("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie({ ...inputs, actors })
      .then((res) => navigate("/admin-profile"))
      .catch((error) => dispatch(errorActions.setMessage(error.message)));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          padding={10}
          width={"50%"}
          margin="auto"
          display="flex"
          flexDirection="column"
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            Add New Movie
          </Typography>
          <FormLabel sx={labelProps}>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={inputHandler}
            name="title"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={inputHandler}
            name="description"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Poster URL</FormLabel>
          <TextField
            value={inputs.posterUrl}
            onChange={inputHandler}
            name="posterUrl"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Release Date</FormLabel>
          <TextField
            value={inputs.releaseDate}
            type={"date"}
            onChange={inputHandler}
            name="releaseDate"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Actors</FormLabel>
          <Box display={"flex"}>
            <TextField
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              name="actors"
              variant="standard"
              margin="normal"
            />
            <Button onClick={addActor}>Add</Button>
          </Box>
          <FormLabel sx={labelProps}>Featured</FormLabel>
          <Checkbox
            onClick={(e) =>
              setInputs((prev) => ({ ...prev, featured: e.target.checked }))
            }
            checked={inputs.featured}
            name="featured"
            sx={{ mr: "auto" }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#2b2d42",
              margin: "auto",
              width: "30%",
              ":hover": { bgcolor: "#121217" },
            }}
            type="submit"
          >
            Add New Movie
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddMovie;
