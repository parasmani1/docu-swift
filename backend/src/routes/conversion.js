import express from 'express';
import fs from 'fs';
import docxPdf from 'docx-pdf';
import path from 'path';
import { upload } from '../config/multerConfig.js';
import { conversionLimiter } from '../config/rateLimiters.js';

const router = express.Router();

router.post('/convert', conversionLimiter, upload.single('file'), (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            fs.unlinkSync(file.path);
            return res.status(400).json({ error: 'Uploaded file is not a DOCX file' });
        }

        const pdfPath = `${file.path}.pdf`;

        docxPdf(file.path, pdfPath, (err) => {
            if (err) {
                fs.unlinkSync(file.path);
                return res.status(500).json({ error: 'Conversion failed' });
            }

            res.download(pdfPath, 'converted.pdf', (err) => {
                if (err) {
                    res.status(500).json({ error: 'Error sending file' });
                }
                fs.unlinkSync(file.path);
                fs.unlinkSync(pdfPath);
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;