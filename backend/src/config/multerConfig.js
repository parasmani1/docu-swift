import multer from 'multer';
import path from 'path';

const __dirname = path.resolve();
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const upload = multer({
    dest: path.join(__dirname, 'uploads/'),
    limits: { fileSize: MAX_FILE_SIZE }
});

export const MAX_FILE_SIZE_MB = MAX_FILE_SIZE / (1024 * 1024);