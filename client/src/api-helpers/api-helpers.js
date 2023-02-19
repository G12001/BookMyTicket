import axios from "axios";

export const getAllMovies = async () => {
  let err;
  const res = await axios
    .get("/movie")
    .catch((error) => (err = error?.response?.data?.message));

  if (res?.status !== 200) {
    throw new Error(err);
  }

  const data = await res?.data;
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
    .catch((error) => {
      err = error.response.data.message;
    });

  if (res?.status !== 200) {
    throw new Error(err);
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
    .catch((error) => {
      err = error?.response?.data?.message;
    });

  if (res?.status !== 200) {
    throw new Error(err);
  }

  const resdata = await res?.data;
  return resdata;
};

export const getMovieDtails = async (id) => {
  let err;
  const res = await axios.get(`/movie/${id}`).catch((error) => {
    err = error?.response?.data?.message;
  });

  if (res?.status !== 200) {
    throw new Error(err);
  }

  const data = await res?.data;
  return data;
};

export const newBooking = async (data) => {
  let err;
  const res = await axios
    .post("/booking", {
      movie: data.movie,
      date: data.date,
      seatNumber: data.seatNumber,
      user: localStorage.getItem("userId"),
    })
    .catch((error) => {
      err = error?.response?.data?.message;
    });

  if (res.status !== 200) {
    throw new Error(err);
  }

  const resData = await res?.data;
  return resData;
};

export const getUserBookings = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`user/bookings/${id}`).catch((error) => {
    throw new Error(error);
  });

  if (res.status !== 200) {
    throw new Error("Something went wrong");
  }

  const resData = await res?.data;
  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axios.delete(`/booking/${id}`).catch((error) => {
    throw new Error(error);
  });

  if (res?.status !== 200) {
    throw new Error("Something went wrong");
  }

  const resData = await res?.data;
  return resData;
};

export const getUserDtails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/${id}`).catch((error) => {
    throw new Error(error);
  });

  if (res?.status !== 200) {
    throw new Error("Something went wrong");
  }

  const resData = await res?.data;
  return resData;
};

export const addMovie = async (data) => {
  let err;
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
    .catch((error) => {
      err = error?.response?.data?.message;
    });

  if (res?.status !== 200) {
    throw new Error(err);
  }

  const resData = res.data;
  return resData;
};

export const getAdminById = async () => {
  const id = localStorage.getItem("adminId");

  const res = await axios.get(`/admin/${id}`).catch((error) => {
    throw new Error(error);
  });

  if (res?.status !== 200) {
    throw new Error("Something went wrong");
  }

  const resData = await res?.data;
  return resData;
};
