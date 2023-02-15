import Admin from "../models/Admin.js";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { email, password } = req.body;

  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(400).json({ message: "Please add all fields" });
  }

  let admin = await Admin.findOne({ email });

  if (admin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hashedPassword = bcryptjs.hashSync(password);

  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!admin) {
    return res.status(500).json({ message: "Unable to create admin" });
  }

  return res.status(201).json({ admin });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(400).json({ message: "Please add all fields" });
  }

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!existingAdmin) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordCorrect = bcryptjs.compareSync(
    password,
    existingAdmin.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Please enter correct password" });
  }

  const token = Jwt.sign({ id: existingAdmin.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return res.status(200).json({ token, id: existingAdmin._id });
};

export const getAdmins = async (req, res, next) => {
  let admins;

  try {
    admins = await Admin.find();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!admins) {
    return res.status(500).json({ message: "Unable to get admins" });
  }

  return res.status(200).json({ admins });
};

export const getAdminDtails = async (req, res, next) => {
  let admin;
  const id = req.params.id;

  try {
    admin = await Admin.findById(id).populate("addedMovies");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!admin) {
    return res.status(500).json({ message: "Unable to get admin" });
  }

  return res.status(200).json({ admin });
};
