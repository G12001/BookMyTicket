import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios.get("/movie").catch((error) => console.log(error));

  if (res?.status !== 200) {
    return console.log("No data");
  }

  const data = await res.data;
  return data;
};

export const sendUserAuthRequest = async (data, signup) => {
  let err;
  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((error) => (err = error.response.data.message));

  if (res?.status !== 200 && res?.status !== 201) {
    console.log(err);
  }
  const resdata = await res?.data;
  return resdata;
};

export const sendAdminAuthRequest = async (data) => {
  let err;
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((error) => (err = error.response.data.message));

  if (res?.status !== 200) {
    console.log(err);
  }

  const resdata = await res?.data;
  return resdata;
};

export const getMovieDtails = async (id) => {
  let err;
  const res = await axios
    .get(`/movie/${id}`)
    .catch((error) => (err = error.response.data.message));

  if (res.status !== 200) {
    console.log(err);
  }

  const data = await res.data;
  return data;
};

export const newBooking = async (data) => {
  const res = await axios
    .post("/booking", {
      movie: data.movie,
      date: data.date,
      seatNumber: data.seatNumber,
      user: localStorage.getItem("userId"),
    })
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    console.log("Something went wrong");
  }

  const resData = await res.data;
  return resData;
};

export const getUserBookings = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`user/bookings/${id}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    console.log("Something went wrong");
  }

  const resData = await res.data;
  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/booking/${id}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    console.log("Something went wrong");
  }

  const resData = await res.data;
  return resData;
};

export const getUserDtails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/user/${id}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    console.log("Something went wrong");
  }

  const resData = await res.data;
  return resData;
};

export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movie",
      {
        title: data.title,
        description: data.description,
        posterUrl: data.posterUrl,
        releaseDate: data.releaseDate,
        actors: data.actors,
        featured: data.featured,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((error) => console.log(error));

  if (res.status !== 201) {
    console.log("Something went wrong");
  }
};

export const getAdminById = async () => {
  const id = localStorage.getItem("adminId");

  const res = await axios
    .get(`/admin/${id}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    console.log("Something went wrong");
  }

  const resData = await res.data;
  return resData;
};
