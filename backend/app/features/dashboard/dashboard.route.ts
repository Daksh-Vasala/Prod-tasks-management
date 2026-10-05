import express from "express";
const router = express.Router();
import * as dashboardController from "./dashboard.controller";
import { isAdmin, verifyToken } from "@/app/middlewares/auth.middleware";

router.use(verifyToken);

router.get("/stats", isAdmin, dashboardController.dashboardStats);

export default router;
