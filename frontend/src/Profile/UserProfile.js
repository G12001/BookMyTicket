import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  deleteBooking,
  getUserBookings,
  getUserDtails,
} from "../api-helpers/api-helpers";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [bookings, setBookings] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    getUserBookings()
      .then((res) => setBookings(res.bookings))
      .catch((error) => console.log(error));
  }, [bookings]);

  useEffect(() => {
    getUserDtails()
      .then((res) => setUser(res.user))
      .catch((error) => console.log(error));
  }, []);

  const navigate = useNavigate();
  const handleDelete = (id) => {
    deleteBooking(id)
      .then(() => navigate("/user-profile"))
      .catch((error) => console.log(error));
  };

  return (
    <Box display={"flex"} width={"100%"}>
      <Fragment>
        <Box
          display={"flex"}
          justifyContent="center"
          flexDirection={"column"}
          alignItems="center"
          width={"30%"}
          padding={3}
          gap={2}
        >
          <AccountCircleIcon
            sx={{ fontSize: "10rem", textAlign: "center", ml: 2 }}
          />
          <Typography
            padding={1}
            paddingLeft={2}
            paddingRight={2}
            width="auto"
            textAlign={"center"}
            border={"1px solid #ccc"}
            borderRadius={5}
          >
            Name : {user?.name}
          </Typography>
          <Typography
            padding={1}
            paddingLeft={2}
            paddingRight={2}
            width="auto"
            textAlign={"center"}
            border={"1px solid #ccc"}
            borderRadius={5}
          >
            Email : {user?.email}
          </Typography>
        </Box>
      </Fragment>

      <Box display={"flex"} width={"70%"} flexDirection="column">
        <Typography
          variant="h3"
          fontFamily={"verdana"}
          textAlign="center"
          padding={2}
        >
          Bookings
        </Typography>
        <Box
          margin={"auto"}
          display="flex"
          flexDirection={"column"}
          width="80%"
        >
          <List>
            {bookings &&
              bookings?.map((booking, index) => (
                <ListItem
                  sx={{
                    bgcolor: "#00d386",
                    color: "white",
                    textAlign: "center",
                    margin: 1,
                  }}
                  key={index}
                >
                  <ListItemText
                    sx={{ margin: 1, width: "auto", textAlign: "left" }}
                  >
                    Movie : {booking?.movie?.title}
                  </ListItemText>
                  <ListItemText
                    sx={{ margin: 1, width: "auto", textAlign: "left" }}
                  >
                    Date : {new Date(booking?.date).toDateString()}
                  </ListItemText>
                  <ListItemText
                    sx={{ margin: 1, width: "auto", textAlign: "left" }}
                  >
                    Seat : {booking?.seatNumber}
                  </ListItemText>
                  <IconButton
                    onClick={() => handleDelete(booking?._id)}
                    color="error"
                  >
                    <DeleteForeverIcon color="red" />
                  </IconButton>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
