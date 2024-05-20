import express from "express";
import { createTask, deleteTask, updateTask } from "../controllers/data.controller";

const router = express.Router();

router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;