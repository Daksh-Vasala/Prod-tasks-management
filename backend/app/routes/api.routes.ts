import express from "express";
import welcomeRouteCallback from "./welcome";

import authRoutes from "../features/auth/auth.routes";

import tasksRoutes from "../features/tasks/task.routes";

const router = express.Router();

router.get("/", welcomeRouteCallback);
router.use("/auth", authRoutes);
router.use("/tasks", tasksRoutes);

export default router;
