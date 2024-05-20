import express from "express";
import taskRoutes from "../routes/data.routes";
import userRoutes from "../routes/user.routes";

const router = express.Router();

router.use("/api/user", userRoutes);
router.use("/api/task", taskRoutes);


export default router;