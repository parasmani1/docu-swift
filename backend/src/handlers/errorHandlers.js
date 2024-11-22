function multerErrorHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                error: 'File size limit exceeded. Maximum file size allowed is 10MB'
            });
        }
    }
    next(err);
}

function fileNotUploadedHandler(err, req, res, next) {
    if (err.message === 'No file uploaded') {
        return res.status(400).json({
            error: 'No file uploaded. Please upload a valid DOCX file.'
        });
    }
    next(err);
}

function unsupportedFileTypeHandler(err, req, res, next) {
    if (err.message === 'Uploaded file is not a DOCX file') {
        return res.status(400).json({
            error: 'Unsupported file type. Please upload a DOCX file.'
        });
    }
    next(err);
}

function generalErrorHandler(err, req, res, next) {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'An unexpected error occurred. Please try again later.'
    });
}

export {
    multerErrorHandler,
    fileNotUploadedHandler,
    unsupportedFileTypeHandler,
    generalErrorHandler
};
