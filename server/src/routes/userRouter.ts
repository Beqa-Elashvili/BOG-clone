import { Router } from "express";
import { createUser, loginUser } from "../controllers/usersController";

const router = Router();

router.post("/register", createUser);

// Login user route
router.post("/login", loginUser);

export default router;
