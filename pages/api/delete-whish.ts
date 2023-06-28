import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../prisma/client";

interface QueryParameters {
  id: string | string[];
}

const DeleteWhish = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const query: Partial<QueryParameters> = req.query;
    try {
      await prisma.whishlist.delete({
        where: { id: parseInt(query.id as string) },
      });
      res.status(200).json({ success: true, data: { meta: "Remove row" } });
    } catch (e) {
      res.status(500).json({ success: false, data: { meta: "failed" } });
    }
  }
};

export default DeleteWhish;
