import path from 'path';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function GET (req: NextApiRequest, res: NextApiResponse) {
    
    const { filename } = req.query;
    if (!filename) {
        return res.status(400).json({ error: 'Filename is required' });
    }

    const filePath = path.join(process.cwd(), 'files', filename as string);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }


    // Serve the PDF file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
}
