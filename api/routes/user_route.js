import express from "express"
import { login, logout, register } from "../controllers/auth_controller.js";
import { deleteUser, getUser, getUsers, updateUser , savePost ,profilePosts , getNotificationNumber } from "../controllers/user_controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers )


router.get("/profilePosts",verifyToken , profilePosts )

// router.get("/:id",verifyToken, getUser)

router.put("/:id",verifyToken, updateUser)

router.delete("/:id",verifyToken, deleteUser)

router.post("/save",verifyToken , savePost )

router.get("/profilePosts",verifyToken , profilePosts )

router.get("/notification",verifyToken , getNotificationNumber )

export default router