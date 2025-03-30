"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const router = (0, express_1.Router)();
router.post("/register", usersController_1.createUser);
router.post("/login", usersController_1.loginUser);
router.get("/email/:email", usersController_1.getUserByEmail);
router.get("/protectedRoute", usersController_1.authenticateToken, (req, res) => {
    res.json({
        message: "This is protected data",
        user: req.user,
    });
});
exports.default = router;
