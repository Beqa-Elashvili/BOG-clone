import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export const addOffer = async (req: Request, res: Response): Promise<any> => {
  const { title, mainTitle, imageUrl, metaDescription, description } = req.body;

  if (!title || !mainTitle || !imageUrl || !metaDescription || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const offer = await prisma.offer.create({
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
  } catch (error) {
    console.error("Error creating offer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getOffers = async (req: Request, res: Response): Promise<any> => {
  try {
    const offers = await prisma.offer.findMany();
    return res.status(200).json(offers);
  } catch (error) {
    console.error("Error retrieving offers", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
