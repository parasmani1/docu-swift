import React, { useState } from 'react';
import axios from 'axios';
import { Upload, AlertCircle, FileText, Check } from 'lucide-react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      if (!selectedFile.name.toLowerCase().endsWith('.docx')) {
        setError('Please select a valid DOCX file');
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/convert', formData, {
        responseType: 'blob',
      });

      const fileType = response.headers['content-type'];
      if (fileType === 'application/json') {
        const reader = new FileReader();
        reader.onload = () => {
          const error = JSON.parse(reader.result);
          setError(error.error || 'Conversion failed. Please try again.');
        };
        reader.readAsText(response.data);
        return;
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converted.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      setFile(null);
    } catch (err) {
      setError('Conversion failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div
          className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-300 ease-in-out
            ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${file ? 'bg-green-50 border-green-400' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            accept=".docx"
          />
          <div className="text-center">
            {file ? (
              <Check className="mx-auto h-12 w-12 text-green-500" />
            ) : (
              <Upload className="mx-auto h-12 w-12 text-blue-500" />
            )}
            <p className="mt-2 text-sm font-medium text-gray-900">
              {file ? file.name : 'Drop your DOCX file here, or click to select'}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Max file size: 10MB
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !file}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${loading || !file 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}
            transition-colors duration-300`}
        >
          {loading ? 'Converting...' : 'Convert to PDF'}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
        <FileText className="h-4 w-4" />
        <span>DOCX to PDF Converter</span>
      </div>
    </div>
  );
};

export default FileUpload;