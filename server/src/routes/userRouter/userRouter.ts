import { Router, Request } from "express";
import {
  createUser,
  loginUser,
  authenticateToken,
  getUser,
} from "../../controllers/usersController/usersController";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/id/:email", getUser);

router.get("/protectedRoute", authenticateToken, (req, res) => {
  res.json({
    message: "This is protected data",
    user: (req as Request & { user?: any }).user,
  });
});

export default router;
