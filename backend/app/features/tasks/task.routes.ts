import express from "express";
import * as taskController from "./task.controller";
import { verifyToken } from "@/app/middlewares/auth.middleware";

const router = express.Router();

router.use(verifyToken);

router.post("/", taskController.createTask);
router.get("/:id", taskController.getTaskById);
router.get("/", taskController.getTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
