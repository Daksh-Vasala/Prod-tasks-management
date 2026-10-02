import express from "express";
import welcomeRouteCallback from "./welcome";

import authRoutes from "../features/auth/auth.routes";

import tasksRoutes from "../features/tasks/task.routes";

import userRoutes from "../features/users/user.routes";

const router = express.Router();

router.get("/", welcomeRouteCallback);
router.use("/auth", authRoutes);
router.use("/tasks", tasksRoutes);
router.use("/users", userRoutes);

export default router;
