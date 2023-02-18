import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import Bookings from "../models/Bookings.js";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = bcryptjs.hashSync(password);

  try {
    user = new User({ name, email, password: hashedPassword });
    user = await user.save();
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  res.status(200).json({ id: user._id });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordCorrect = bcryptjs.compareSync(
    password,
    existingUser?.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Please enter correct password" });
  }

  res.status(200).json({ id: existingUser._id });
};

export const getUserBookings = async (req, res, next) => {
  const id = req.params.id;

  let bookings;
  try {
    bookings = await Bookings.find({ user: id }).populate("movie");
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  res.status(200).json({ bookings });
};

export const getUser = async (req, res) => {
  const id = req.params.id;

  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  res.status(200).json({ user });
};
