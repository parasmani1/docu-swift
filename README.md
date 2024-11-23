# Docu-Swift

**Developer**: Parasmani  
**Email**: [pparasmani_be21@thapar.edu](mailto:pparasmani_be21@thapar.edu)

Docu-Swift is a web-based application that allows users to upload and convert DOCX files into password-encrypted PDF files. The application features a robust backend built with Express.js and a modern frontend developed using React and Tailwind CSS. The app is containerized with Docker for seamless deployment and is hosted on Render.

Website: [Docu-Swift](https://docu-swift.onrender.com/)

---

## Features

- **File Upload**: Users can upload DOCX files for conversion.
- **DOCX to PDF Conversion**: The application utilizes headless LibreOffice for converting DOCX files into PDFs to ensure proper formatting.
- **Password Encryption**: Optional password protection for PDFs if the user provides a password.
- **Modern UI**: Built with React and styled using Tailwind CSS.
- **Backend API**: Developed with Express.js, handling file uploads and conversion logic.
- **Scalable Deployment**: Dockerized for containerized deployment and hosted on Render.

---

## Folder Structure

### Backend (`/backend`)

```
backend
|  node_modules
|  src
|  |  config
|  |  |  multerConfig.js   # Config for file uploads using Multer
|  |  |  rateLimiters.js   # Rate limiter configurations
|  |  handlers
|  |  |  errorHandlers.js  # Global error handlers
|  |  routes
|  |  |  conversion.js     # Routes for file conversion
|  |  utils
|  |  |  cleanup.js        # Utility for cleaning up temporary files
|  |  app.js               # Main server entry point
|  uploads
package.json
package-lock.json
```

### Frontend (`/frontend`)

```
frontend
|  node_modules
|  public
|  src
|  |  components
|  |  |  FileUpload.jsx  # Component for file upload UI
|  |  App.js             # Main React component
|  |  index.js           # React entry point
|  |  index.css          # Styling with Tailwind CSS
.gitignore
tailwind.config.js
package.json
package-lock.json
```

---

## Installation and Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or above)
- [Docker](https://www.docker.com/)
- [LibreOffice](https://www.libreoffice.org/) (headless mode for DOCX to PDF conversion)

### Clone the Repository
```bash
git clone https://github.com/parasmani1/docu-swift.git
cd docu-swift
```

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run start
   ```

### Docker Setup
1. Build the Docker image:
   ```bash
   docker build -t docu-swift .
   ```
2. Run the Docker container:
   ```bash
   docker run -p 5000:5000 docu-swift
   ```

---

## Usage

1. Visit the hosted website: [https://docu-swift.onrender.com/](https://docu-swift.onrender.com/).
2. Upload a DOCX file using the "Upload File" button.
3. Optionally, provide a password for PDF encryption.
4. Click "Convert" to generate the PDF.
5. Download the converted PDF file.

---

## Technology Stack

### Frontend
- **React**: For building the user interface.
- **Tailwind CSS**: For modern and responsive styling.

### Backend
- **Express.js**: Handles API requests and business logic.
- **LibreOffice**: Used for DOCX to PDF conversion to ensure formatting integrity.
- **node-qpdf2**: Used for PDF encryption.
- **Multer**: Middleware for file uploads.

### Deployment
- **Docker**: For containerized deployment.
- **Render**: For hosting the application.

---

## License

This project is licensed under the MIT License.

---

## About

**Developer**: Parasmani  
Feel free to reach out with questions or suggestions!

**Contact**: [pparasmani_be21@thapar.edu](mailto:pparasmani_be21@thapar.edu)

