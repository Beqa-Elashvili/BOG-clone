"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.getUserById = exports.getUserByEmail = exports.loginUser = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma")); // Adjust the import based on your project structure
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, phoneNumber, personalNumber } = req.body;
    if (!email || !password || !name || !phoneNumber || !personalNumber) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const existingUser = yield prisma_1.default.user.findFirst({
            where: {
                OR: [{ email }, { phoneNumber }, { personalNumber }],
            },
        });
        if (existingUser) {
            return res.status(400).json({
                error: "User with this email, phone number, or personal number already exists",
            });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                phoneNumber,
                personalNumber,
                balance: 55000,
                points: 17500,
            },
        });
        const token = generateToken(user.id);
        return res.status(201).json({
            id: user.id,
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
            personalNumber: user.personalNumber,
            createdAt: user.createdAt,
            balance: user.balance,
            points: user.points,
            token,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const token = generateToken(user.id);
        return res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
            personalNumber: user.personalNumber,
            createdAt: user.createdAt,
            token,
        });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.loginUser = loginUser;
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const { password } = user, userData = __rest(user, ["password"]);
        return res.status(200).json(userData);
    }
    catch (error) {
        console.error("Error retrieving user by email:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getUserByEmail = getUserByEmail;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ error: "Email is required" });
    }
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const { password } = user, userData = __rest(user, ["password"]);
        return res.status(200).json(userData);
    }
    catch (error) {
        console.error("Error retrieving user by email:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getUserById = getUserById;
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(403).json({ error: "Access denied, no token provided" });
        return;
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ error: "Invalid or expired token" });
            return;
        }
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
