import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg text-center animate-fade-in">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">MERN Form Builder</h1>
        <p className="text-gray-600 mb-8">
          Create beautiful forms with categorize, cloze, and comprehension questions.
          Customize and share with ease.
        </p>
        <div className="space-y-4">
          <Link
            to="/builder"
            className="btn-primary inline-block w-full max-w-xs"
          >
            <i className="fas fa-plus mr-2"></i> Create New Form
          </Link>
          <Link
            to="/builder/sample"
            className="btn-secondary inline-block w-full max-w-xs"
          >
            <i className="fas fa-eye mr-2"></i> Try Sample Form
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;