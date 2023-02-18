import express from "express";
import {
  signUp,
  login,
  getAdminDtails,
} from "../controllers/admin-controller.js";

const adminRouter = express.Router();

adminRouter.post("/signup", signUp);
adminRouter.post("/login", login);
adminRouter.get("/:id", getAdminDtails);

export default adminRouter;
