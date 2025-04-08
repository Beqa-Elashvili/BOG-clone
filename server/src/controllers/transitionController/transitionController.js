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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fromUserId, toUserId, amount } = req.body;
    if (!fromUserId || !toUserId || !amount) {
        return res
            .status(400)
            .json({ error: "fromUserId, toUserId, amount, and status are required" });
    }
    try {
        const fromUser = yield prisma_1.default.user.findUnique({
            where: { id: fromUserId },
        });
        const toUser = yield prisma_1.default.user.findUnique({
            where: { id: toUserId },
        });
        if (!fromUser || !toUser) {
            return res.status(404).json({ error: "One or both users not found" });
        }
        if (amount > fromUser.balance) {
            return res.status(400).json({ error: "Insufficient balance" });
        }
        const transaction = yield prisma_1.default.transaction.create({
            data: {
                amount,
                status: "completed",
                fromUserId,
                toUserId,
            },
        });
        const updatedFromUser = yield prisma_1.default.user.update({
            where: { id: fromUserId },
            data: {
                balance: fromUser.balance - amount,
            },
        });
        const updatedToUser = yield prisma_1.default.user.update({
            where: { id: toUserId },
            data: {
                balance: toUser.balance + amount,
            },
        });
        return res.status(201).json({
            transaction,
            updatedFromUser,
            updatedToUser,
        });
    }
    catch (error) {
        console.error("Error creating transaction:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createTransaction = createTransaction;
