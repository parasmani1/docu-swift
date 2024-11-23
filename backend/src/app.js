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

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(generalLimiter);
// app.use(conversionLimiter);

// Serve React frontend static files
const frontendBuildPath = path.resolve(__dirname, '../public'); // Adjusted path to 'public'
app.use(express.static(frontendBuildPath));

// API routes
app.use('/api', conversionRoutes);

// Error handling middleware
app.use(multerErrorHandler);
app.use(fileNotUploadedHandler);
app.use(unsupportedFileTypeHandler);
app.use(generalErrorHandler);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads/');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Serve React frontend for non-API routes
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(frontendBuildPath, 'index.html'));
});

// Periodic cleanup of old files
setInterval(cleanupOldFiles, 60 * 60 * 1000);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
