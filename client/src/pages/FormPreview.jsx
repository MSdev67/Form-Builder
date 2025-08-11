import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from '../context/FormContext';

const FormPreview = () => {
  const { id } = useParams();
  const { form, loadForm } = useForm();

  useEffect(() => {
    if (id) loadForm(id);
  }, [id, loadForm]);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="mb-8">
        {form.headerImage && (
          <img 
            src={`http://localhost:5000/uploads/${form.headerImage}`} 
            alt="Header" 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        <h1 className="text-3xl font-bold mb-2">{form.title || 'Untitled Form'}</h1>
        {form.description && <p className="text-gray-600 mb-4">{form.description}</p>}
      </div>
      
      {form.questions.map((question, index) => (
        <div key={question.id} className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">{index + 1}. {question.questionText}</h3>
          {question.questionImage && (
            <img 
              src={`http://localhost:5000/uploads/${question.questionImage}`} 
              alt="Question" 
              className="w-full max-h-64 object-contain mb-4"
            />
          )}
          
          {question.type === 'categorize' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {question.categories?.map(category => (
                  <div key={category.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {category.name}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {question.items?.map(item => (
                  <div key={item.id} className="flex items-center">
                    <span className="mr-2">{item.text}</span>
                    <span className="text-sm text-gray-500 mr-2">→</span>
                    <select className="border border-gray-300 rounded px-2 py-1 text-sm">
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
            <div className="space-y-4">
              <p className="whitespace-pre-line">
                {question.clozeData?.text?.split(' ').map((word, i) => (
                  question.clozeData?.blanks?.some(b => b.correctAnswer === word) ? (
                    <span key={i} className="inline-block mx-1">
                      <input 
                        type="text" 
                        className="border-b-2 border-gray-300 w-20 px-1 text-center" 
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
              <div className="bg-gray-50 p-4 rounded">
                <p className="whitespace-pre-line">{question.comprehensionData?.passage}</p>
              </div>
              {question.comprehensionData?.questions?.map((q, qIdx) => (
                <div key={q.id} className="mt-4">
                  <p className="font-medium mb-2">{qIdx + 1}. {q.questionText}</p>
                  <div className="space-y-2">
                    {q.options?.map((option, oIdx) => (
                      <div key={oIdx} className="flex items-center">
                        <input 
                          type="radio" 
                          id={`q${qIdx}-o${oIdx}`} 
                          name={`q${qIdx}`} 
                          value={option}
                          className="mr-2"
                        />
                        <label htmlFor={`q${qIdx}-o${oIdx}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      
      <div className="mt-6 text-center">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Submit Form
        </button>
      </div>
    </div>
  );
};

export default FormPreview;