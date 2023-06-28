import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../prisma/client";

interface WhishFormat {
  id: number;
  title: string;
  link: string;
}

/**
 * Edit Whish endpoint
 *
 * [METHOD]: PUT
 *
 * __NOTE__: Whish format keys is optional in request body.
 * @param req
 * @param res
 */
const EditWhish = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const whish: WhishFormat =
      typeof req.body == "string" ? JSON.parse(req.body) : req.body;

    try {
      const updateWhishByUserId = await prisma.whishlist.update({
        where: {
          id: whish.id,
        },
        data: {
          title: whish.title,
          link: whish.link,
        },
      });

      res.status(200).json({
        success: true,
        data: { meta: `Put new value to whish id #${whish.id}` },
      });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
};

export default EditWhish;
