import React, { useState } from 'react';
import { FileText, Shield, Search, Upload } from 'lucide-react';

interface LandingPageProps {
  onLogin?: (name: string, email: string, password: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <FileText className="h-16 w-16 text-blue-600 mr-4" />
            <h1 className="text-5xl font-bold text-gray-900">BluDocs</h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Secure, organized, and accessible document management for modern teams. 
            Upload, search, and manage all your documents in one place.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Upload</h3>
              <p className="text-gray-600">Drag and drop files or click to upload documents instantly</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Search</h3>
              <p className="text-gray-600">Find any document quickly with our advanced search capabilities</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Storage</h3>
              <p className="text-gray-600">Your documents are protected with enterprise-grade security</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="max-w-md mx-auto text-center">
            <p className="text-lg text-gray-700 mb-6">
              Ready to organize your documents?
            </p>
            <p className="text-gray-600">
              Use the Sign In or Sign Up buttons in the navigation bar to get started with BluDocs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;