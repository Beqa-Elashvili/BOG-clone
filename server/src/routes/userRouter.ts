import { Router, Request } from "express";
import {
  createUser,
  loginUser,
  getUserByEmail,
  authenticateToken,
  getUserById,
} from "../controllers/usersController";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/email/:email", getUserByEmail);
router.get("/userId/:userId", getUserById);

router.get("/protectedRoute", authenticateToken, (req, res) => {
  res.json({
    message: "This is protected data",
    user: (req as Request & { user?: any }).user,
  });
});

export default router;
