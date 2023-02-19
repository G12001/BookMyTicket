import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getAdminById } from "../api-helpers/api-helpers";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminProfile = () => {
  const navigate = useNavigate();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  if (!isAdminLoggedIn) {
    navigate("/");
  }
  const [admin, setAdmin] = useState();

  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((error) => console.log(error));
  }, []);

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
            Email : {admin?.email}
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
          Added Movies
        </Typography>
        <Box
          margin={"auto"}
          display="flex"
          flexDirection={"column"}
          width="80%"
        >
          <List>
            {admin &&
              admin?.addedMovies?.map((movie, index) => (
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
                    Movie : {movie?.title}
                  </ListItemText>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminProfile;
