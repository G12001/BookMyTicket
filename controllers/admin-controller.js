import Admin from "../models/Admin.js";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  let admin;
  try {
    admin = await Admin.findOne({ email });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  if (admin) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = bcryptjs.hashSync(password);

  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
    res.status(200).json({ admin });
  } catch (error) {
    return res.status(400).json({ message: "Invalid user data" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  if (!existingAdmin) {
    return res.status(400).json({ message: "user not found" });
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

  res.status(200).json({ token, id: existingAdmin._id });
};

export const getAdminDtails = async (req, res, next) => {
  let admin;
  const id = req.params.id;

  try {
    admin = await Admin.findById(id).populate("addedMovies");
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  res.status(200).json({ admin });
};
