import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import Bookings from "../models/Bookings.js";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected error" });
  }

  return res.status(200).json({ users });
};

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(400).json({ message: "Invalid inputs" });
  }

  let user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = bcryptjs.hashSync(password);

  try {
    user = new User({ name, email, password: hashedPassword });
    user = await user.save();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected error" });
  }

  return res.status(201).json({ id: user._id });
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;

  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(400).json({ message: "Invalid inputs" });
  }

  const hashedPassword = bcryptjs.hashSync(password);

  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected error" });
  }

  return res.status(200).json({ message: "User updated successfully" });
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected error" });
  }

  res.status(200).json({ message: "User removed successfully" });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.trim() === "") {
    res.status(400).json({ message: "Invalid inputs" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not Found" });
  }

  const isPasswordCorrect = bcryptjs.compareSync(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Please enter correct password" });
  }

  return res
    .status(200)
    .json({ message: "Login successfully", id: existingUser._id });
};

export const getUserBookings = async (req, res, next) => {
  const id = req.params.id;

  let bookings;
  try {
    bookings = await Bookings.find({ user: id }).populate("movie");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!bookings) {
    return res.status(500).json({ message: "Unable to get movies" });
  }

  return res.status(200).json({ bookings });
};

export const getUser = async (req, res) => {
  const id = req.params.id;

  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!user) {
    return res.status(500).json({ message: "Unable to get movies" });
  }

  return res.status(200).json({ user });
};
