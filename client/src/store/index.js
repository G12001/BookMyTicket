import { configureStore, createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    isError: false,
    message: "",
  },
  reducers: {
    setMessage(state, action) {
      state.isError = true;
      state.message = action.payload;
    },

    reset(state) {
      state.isError = false;
      state.message = "";
    },
  },
});

export const errorActions = errorSlice.actions;

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;

const adminSlice = createSlice({
  name: "admin",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("adminId");
      localStorage.removeItem("token");
      state.isLoggedIn = false;
    },
  },
});

export const adminActions = adminSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer,
    error: errorSlice.reducer,
  },
});
