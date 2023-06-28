import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../prisma/client";

interface QueryParameters {
  user: string | string[];
}

const GetWhishes = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const query: Partial<QueryParameters> = req.query;

    try {
      if (query.user === undefined) {
        const list = await prisma.whishlist.findMany();

        res.status(200).json({ whishList: list });
      } else {
        const specificUserList = await prisma.whishlist.findMany({
          where: { userId: parseInt(query.user as string) },
          orderBy: { createdAt: "desc" },
        });

        res.status(200).json({ whishList: specificUserList });
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }
};

export default GetWhishes;
