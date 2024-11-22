import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { generalLimiter, conversionLimiter } from './config/rateLimiters.js';
import { cleanupOldFiles } from './utils/cleanup.js';
import conversionRoutes from './routes/conversion.js';
import {
    multerErrorHandler,
    fileNotUploadedHandler,
    unsupportedFileTypeHandler,
    generalErrorHandler
} from './handlers/errorHandlers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors());
app.use(generalLimiter);
app.use(conversionLimiter);

app.use('/api', conversionRoutes);
app.use(multerErrorHandler);
app.use(fileNotUploadedHandler);
app.use(unsupportedFileTypeHandler);
app.use(generalErrorHandler);

const uploadsDir = path.join(__dirname, 'uploads/');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

setInterval(cleanupOldFiles, 60 * 60 * 1000);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
