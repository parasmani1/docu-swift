import express from 'express';
import fs from 'fs';
import docxPdf from 'docx-pdf';
import { encrypt } from 'node-qpdf2';
import { promisify } from 'util';
import { upload } from '../config/multerConfig.js';
import { conversionLimiter } from '../config/rateLimiters.js';

const router = express.Router();
const docxPdfPromise = promisify(docxPdf);
const unlinkAsync = promisify(fs.unlink);

router.post('/convert', conversionLimiter, upload.single('file'), async (req, res) => {
    
    try {
        const file = req.file;
        const password = req.body.password;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            await unlinkAsync(file.path);
            return res.status(400).json({ error: 'Uploaded file is not a DOCX file' });
        }

        const pdfPath = `${file.path}.pdf`;
        const protectedPdfPath = `${file.path}_protected.pdf`;
        
        // Convert DOCX to PDF
        await docxPdfPromise(file.path, pdfPath);

        if (password) {
            
            // Encrypt the PDF
            const encryptOptions = {
                input: pdfPath,
                output: protectedPdfPath,
                password: password,
                keyLength: 256,
                restrictions: {
                    print: 'full',
                }
            };

            await encrypt(encryptOptions);

            // Remove the unprotected PDF
            await unlinkAsync(pdfPath);

            // Send the protected PDF
            res.download(protectedPdfPath, 'converted.pdf', async (err) => {
                if (err) {
                    console.error('Error sending protected file:', err);
                    return res.status(500).json({ error: 'Error sending file' });
                }
            });
        } else {
            // If no password protection requested, send the unprotected PDF
            res.download(pdfPath, 'converted.pdf', async (err) => {
                if (err) {
                    console.error('Error sending unprotected file:', err);
                    return res.status(500).json({ error: 'Error sending file' });
                }
            });
        }
    } catch (error) {
        console.error('Conversion/encryption error:', error);
        res.status(500).json({ 
            error: 'Conversion or encryption failed',
            details: error.message 
        });
    }
});

export default router;