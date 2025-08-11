import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../context/FormContext';
import FormHeader from '../components/FormHeader';
import QuestionList from '../components/QuestionList';
import Sidebar from '../components/Sidebar';
import PreviewModal from '../components/PreviewModal';

const FormBuilder = () => {
  const { form, saveForm } = useForm();
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('questions');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSave = async () => {
    try {
      const savedForm = await saveForm();
      if (!id) {
        navigate(`/builder/${savedForm._id}`);
      }
    } catch (err) {
      console.error('Error saving form:', err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-indigo-600 text-white p-4 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Form Builder</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowPreview(true)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-1 rounded text-sm transition-colors"
              >
                <i className="fas fa-eye mr-1"></i> Preview
              </button>
              <button
                onClick={handleSave}
                className="bg-white text-indigo-600 px-4 py-1 rounded text-sm font-medium hover:bg-indigo-50 transition-colors"
              >
                <i className="fas fa-save mr-1"></i> Save
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 max-w-4xl mx-auto">
          {activeTab === 'questions' && (
            <>
              <FormHeader 
                title={form.title}
                description={form.description}
                headerImage={form.headerImage}
              />
              
              <QuestionList questions={form.questions} />
            </>
          )}

          {activeTab === 'settings' && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Form Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Form Theme Color</label>
                  <div className="flex space-x-3">
                    {[
                      {name: 'Indigo', bg: 'bg-indigo-500', text: 'text-indigo-500'},
                      {name: 'Blue', bg: 'bg-blue-500', text: 'text-blue-500'},
                      {name: 'Emerald', bg: 'bg-emerald-500', text: 'text-emerald-500'},
                      {name: 'Purple', bg: 'bg-purple-500', text: 'text-purple-500'},
                      {name: 'Pink', bg: 'bg-pink-500', text: 'text-pink-500'}
                    ].map(color => (
                      <div key={color.name} className="flex flex-col items-center">
                        <button
                          className={`w-10 h-10 rounded-full ${color.bg} border-2 border-white shadow-md hover:scale-110 transition-transform`}
                        ></button>
                        <span className="text-xs mt-1 text-gray-600">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Form Access</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="radio" id="access-public" name="access" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                      <label htmlFor="access-public" className="ml-2 block text-sm text-gray-700">Public (Anyone with the link)</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="access-private" name="access" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                      <label htmlFor="access-private" className="ml-2 block text-sm text-gray-700">Private (Requires login)</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {showPreview && (
        <PreviewModal 
          form={form}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default FormBuilder;