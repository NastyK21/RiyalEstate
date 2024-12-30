import express from "express"
import { login, logout, register } from "../controllers/auth_controller.js";
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/test_controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/should-be-logged-in",verifyToken, shouldBeLoggedIn )

router.get("/should-be-admin", shouldBeAdmin)



export default router