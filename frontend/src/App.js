import React from 'react';
import { FileText, Linkedin, Github, Tent } from 'lucide-react';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Made with love banner */}
      <div className="bg-blue-600 text-white text-center py-1 text-sm">
        Made with ❤️ by Parasmani
      </div>

      <header className="w-full py-4 px-4 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-800">DocuSwift</span>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com/parasmani1" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/parasmani-arora-0a2069222/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Flash bar for CampSearch */}
      <div className="bg-yellow-100 border-b border-yellow-200 text-yellow-800 text-center py-2">
        <a href="https://campfinder-25bi.onrender.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:underline">
          Also check out my other project:   CampSearch <Tent className="w-4 h-4 mr-2" /> 
        </a>
      </div>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              DOCX to PDF Converter
            </h1>
            <p className="text-xl text-gray-600">
              Transform your documents seamlessly
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <FileUpload />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="w-full py-6 px-4 bg-white bg-opacity-80">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} DocuSwift by Parasmani. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <FileText className="w-6 h-6 text-blue-600" />,
    title: "Easy Conversion",
    description: "Convert DOCX to PDF with just a few clicks. No sign-up required."
  },
  {
    icon: <FileText className="w-6 h-6 text-blue-600" />,
    title: "Secure Process",
    description: "Your files are processed securely and deleted immediately after conversion."
  },
  {
    icon: <FileText className="w-6 h-6 text-blue-600" />,
    title: "High Quality",
    description: "Maintain the original formatting and quality of your documents."
  }
];

export default App;