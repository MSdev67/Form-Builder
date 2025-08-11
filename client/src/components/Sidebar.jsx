import React from 'react';
import { useForm } from '../context/FormContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { addQuestion } = useForm();

  const questionTypes = [
    { type: 'categorize', icon: '🗂', label: 'Categorize' },
    { type: 'cloze', icon: '✍️', label: 'Cloze' },
    { type: 'comprehension', icon: '📖', label: 'Comprehension' }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col h-full">
      <h1 className="text-xl font-bold mb-6 text-indigo-600">Form Builder</h1>
      
      {/* Navigation Tabs */}
      <div className="mb-6">
        <button
          onClick={() => setActiveTab('questions')}
          className={`w-full text-left px-3 py-2 rounded-md mb-1 flex items-center ${
            activeTab === 'questions' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="mr-2">📋</span> Questions
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
            activeTab === 'settings' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="mr-2">⚙️</span> Settings
        </button>
      </div>
      
      {/* Question Types */}
      <div className="flex-1">
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">ADD QUESTION</h2>
        <div className="space-y-2">
          {questionTypes.map((q) => (
            <button 
              key={q.type}
              onClick={() => addQuestion(q.type)}
              className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors flex items-center"
            >
              <span className="mr-2 text-lg">{q.icon}</span> {q.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;