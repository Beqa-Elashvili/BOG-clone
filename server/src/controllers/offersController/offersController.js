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
exports.getOffers = exports.addOffer = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const addOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, mainTitle, imageUrl, metaDescription, description } = req.body;
    if (!title || !mainTitle || !imageUrl || !metaDescription || !description) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const offer = yield prisma_1.default.offer.create({
            data: {
                title,
                mainTitle,
                imageUrl,
                metaDescription,
                description,
            },
        });
        return res.status(201).json({
            id: offer.id,
            imageUrl: offer.imageUrl,
            title: offer.title,
            mainTitle: offer.mainTitle,
            metaDescription: offer.metaDescription,
            description: offer.description,
        });
    }
    catch (error) {
        console.error("Error creating offer:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.addOffer = addOffer;
const getOffers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offers = yield prisma_1.default.offer.findMany();
        return res.status(200).json(offers);
    }
    catch (error) {
        console.error("Error retrieving offers", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getOffers = getOffers;
