import { isAdmin, verifyToken } from "@/app/middlewares/auth.middleware";
import express from "express";
import {
  deactivateUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./user.controller";
import { validate } from "@/app/middlewares/validate";
import { updateUserSchema } from "./user.validation";

const router = express();

router.use(verifyToken);

router.get("/", isAdmin, getAllUsers);

router.get("/:id", getUserById);

router.patch("/:id", validate(updateUserSchema), updateUser);

router.delete("/:id", isAdmin, deactivateUser);

export default router;
