import React from 'react';

const PreviewModal = ({ form, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto shadow-xl">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800">Form Preview</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {/* Form Header */}
          <div className="mb-8 text-center">
            {form.headerImage && (
              <img 
                src={`http://localhost:5000/uploads/${form.headerImage}`} 
                alt="Header" 
                className="w-full h-48 object-cover rounded-lg mb-4 mx-auto"
              />
            )}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {form.title || 'Untitled Form'}
            </h1>
            {form.description && (
              <p className="text-gray-600 max-w-2xl mx-auto">
                {form.description}
              </p>
            )}
          </div>
          
          {/* Questions */}
          {form.questions.map((question, index) => (
            <div key={question.id} className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {index + 1}. {question.questionText}
              </h3>
              
              {question.questionImage && (
                <img 
                  src={`http://localhost:5000/uploads/${question.questionImage}`} 
                  alt="Question" 
                  className="w-full max-h-64 object-contain mb-4 mx-auto"
                />
              )}
              
              {/* Question Type Specific Preview */}
              {question.type === 'categorize' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {question.categories?.map(category => (
                      <div key={category.id} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                        {category.name}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {question.items?.map(item => (
                      <div key={item.id} className="flex items-center bg-white p-3 rounded border border-gray-200">
                        <span className="flex-1">{item.text}</span>
                        <select className="ml-4 border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300">
                          <option value="">Select category</option>
                          {question.categories?.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {question.type === 'cloze' && (
                <div className="bg-white p-4 rounded border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-line">
                    {question.clozeData?.text?.split(' ').map((word, i) => (
                      question.clozeData?.blanks?.some(b => b.correctAnswer === word) ? (
                        <span key={i} className="inline-block mx-1">
                          <input 
                            type="text" 
                            className="border-b-2 border-indigo-300 w-24 px-2 py-1 text-center focus:outline-none focus:border-indigo-500" 
                            placeholder="______"
                          />
                        </span>
                      ) : (
                        <span key={i} className="inline-block mx-1">{word}</span>
                      )
                    ))}
                  </p>
                </div>
              )}
              
              {question.type === 'comprehension' && (
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-line">
                      {question.comprehensionData?.passage}
                    </p>
                  </div>
                  {question.comprehensionData?.questions?.map((q, qIdx) => (
                    <div key={q.id} className="bg-white p-4 rounded border border-gray-200">
                      <p className="font-medium text-gray-800 mb-3">
                        {qIdx + 1}. {q.questionText}
                      </p>
                      <div className="space-y-2">
                        {q.options?.map((option, oIdx) => (
                          <div key={oIdx} className="flex items-center">
                            <input 
                              type="radio" 
                              id={`q${qIdx}-o${oIdx}`} 
                              name={`q${qIdx}`} 
                              value={option}
                              className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor={`q${qIdx}-o${oIdx}`} className="text-gray-700">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 text-right shadow-sm">
          <button 
            onClick={onClose}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;