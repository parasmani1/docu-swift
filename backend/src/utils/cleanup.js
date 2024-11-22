import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

export function cleanupOldFiles() {
    const uploadsDir = path.join(__dirname, 'uploads/');
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory:', err);
            return;
        }

        const now = Date.now();
        files.forEach(file => {
            const filePath = path.join(uploadsDir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                if (now - stats.mtime.getTime() > 60 * 60 * 1000) {
                    fs.unlink(filePath, err => {
                        if (err) console.error('Error deleting old file:', err);
                    });
                }
            });
        });
    });
}