import express from "express";
import { jwtAuth } from "../middleware/jwt";
import taskRoutes from "../routes/data.routes";
import userRoutes from "../routes/user.routes";

const router = express.Router();

router.use("/api/user", userRoutes);
router.use("/api/task", jwtAuth, taskRoutes);


export default router;