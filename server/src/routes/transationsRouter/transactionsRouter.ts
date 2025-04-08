import express from "express";
import { createTransaction } from "../../controllers/transitionController/transitionController";

const router = express.Router();

router.post("/transaction", createTransaction);

export default router;
