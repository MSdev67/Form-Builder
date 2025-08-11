import React from 'react';
import { useForm } from '../context/FormContext';

const FormHeader = ({ title, description, headerImage }) => {
  const { updateForm, uploadImage } = useForm();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const filename = await uploadImage(file);
        updateForm({ headerImage: filename });
      } catch (err) {
        console.error('Image upload failed:', err);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-8">
      {/* Header Image Upload */}
      <div className="mb-6 rounded-lg overflow-hidden bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-dashed border-indigo-200 h-48 flex items-center justify-center cursor-pointer hover:border-indigo-300 transition-colors">
        {headerImage ? (
          <img 
            src={`http://localhost:5000/uploads/${headerImage}`} 
            alt="Header" 
            className="w-full h-full object-cover"
          />
        ) : (
          <label className="cursor-pointer text-center p-4">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="text-indigo-400">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-indigo-600 font-medium">Click to upload header image</p>
              <p className="text-xs text-indigo-400 mt-1">Recommended size: 1200x300px</p>
            </div>
          </label>
        )}
      </div>
      
      {/* Form Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => updateForm({ title: e.target.value })}
        placeholder="Form Title"
        className="w-full text-3xl font-bold border-none focus:ring-0 px-0 py-2 focus:border-b-2 focus:border-indigo-300"
      />
      
      {/* Form Description */}
      <textarea
        value={description}
        onChange={(e) => updateForm({ description: e.target.value })}
        placeholder="Form description (optional)"
        className="w-full text-gray-600 border-none focus:ring-0 px-0 py-2 resize-none focus:border-b-2 focus:border-indigo-300 mt-2"
        rows="2"
      />
    </div>
  );
};

export default FormHeader;