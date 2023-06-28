import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../prisma/client";

interface WhishCreate {
  title: string;
  titleLink: string;
  userId: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const newWhish: WhishCreate =
      typeof req.body == "string" ? JSON.parse(req.body) : req.body;

    try {
      const whish = await prisma.whishlist.create({
        data: {
          title: newWhish.title,
          link: newWhish.titleLink,
          userId: newWhish.userId,
        },
      });
      res.status(200).json({ whish });
    } catch (e) {
      res.status(500).json(e);
    }
  }
  if (req.method === "GET") {
    res.status(400).json({ error: "This method is not valid for this route" });
  }
}
