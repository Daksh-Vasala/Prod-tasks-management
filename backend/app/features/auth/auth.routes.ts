import express from "express";
import * as authController from "./auth.controller";
import { verifyToken } from "@/app/middlewares/auth.middleware";
import { validate } from "@/app/middlewares/validate";
import { registerSchema } from "./auth.validation";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", validate(registerSchema), authController.register);
router.get("/me", verifyToken, authController.getMe);
router.patch("/me", verifyToken, authController.getMe);
router.patch("/me/password", verifyToken, authController.updatePassword);

export default router;
