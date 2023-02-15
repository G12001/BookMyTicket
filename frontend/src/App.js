import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Admin from "./components/Auth/Admin";
import Auth from "./components/Auth/Auth";
import Movies from "./components/Movies/Movies";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "./store";
import { useEffect } from "react";
import Booking from "./components/Bookings/Booking";
import UserProfile from "./Profile/UserProfile";
import AddMovie from "./components/Movies/AddMovie";
import AdminProfile from "./Profile/AdminProfile";

const App = () => {
  const dispatch = useDispatch();

  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movies" element={<Movies />} />
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
            </>
          )}
          {isUserLoggedIn && !isAdminLoggedIn && (
            <Route path="/user-profile" element={<UserProfile />} />
          )}
          {isAdminLoggedIn && !isUserLoggedIn && (
            <Route path="/admin-profile" element={<AdminProfile />} />
          )}
          {isUserLoggedIn && !isAdminLoggedIn && (
            <Route path="/booking/:id" element={<Booking />} />
          )}
          {isAdminLoggedIn && !isUserLoggedIn && (
            <Route path="/add" element={<AddMovie />} />
          )}
        </Routes>
      </section>
    </div>
  );
};

export default App;
