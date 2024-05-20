import express from "express";
import { createUser, deleteUser, updateUser, userLogin } from "../controllers/user.controller";
import { jwtAuth } from "../middleware/jwt";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", userLogin);
router.put("/:id", jwtAuth, updateUser);
// router.get("/", getAllUser);
// router.get("/:id", findAUser);
router.delete("/:id", jwtAuth, deleteUser);

export default router;