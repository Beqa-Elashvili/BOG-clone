import express from "express";
import {
  addOffer,
  getOffers,
} from "../../controllers/offersController/offersController";

const router = express.Router();
router.post("/offers", addOffer);
router.get("/offers", getOffers);

export default router;
