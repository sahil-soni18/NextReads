import Book from "@/models/Books.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { filename } = req.query;
    if (!filename) {
        return res.status(400).json({ error: 'Filename is required' });
    }

    const MetaData = await Book.findOne( {
        where: {
            title: filename,
        }
    })

    const fileMetadata = {
        title: MetaData?.title,
        author: MetaData?.author,
        description: MetaData?.description,
        publishYear: MetaData?.publishYear,
    };

    res.status(200).json(fileMetadata);
}
