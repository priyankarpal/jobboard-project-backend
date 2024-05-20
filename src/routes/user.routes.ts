import express from "express";
import { createUser, deleteUser, findAUser, getAllUser, updateUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/", createUser);
router.put("/:id", updateUser);
router.get("/", getAllUser);
router.get("/:id", findAUser);
router.delete("/:id", deleteUser);

export default router;