import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';

const ClozeQuestion = ({ question }) => {
  const { updateQuestion } = useForm();
  const [text, setText] = useState(question.clozeData?.text || '');
  const [blankText, setBlankText] = useState('');

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    updateQuestion(question.id, { 
      clozeData: {
        ...question.clozeData,
        text: newText
      }
    });
  };

  const handleAddBlank = () => {
    if (!blankText.trim()) return;
    const newBlank = {
      id: Date.now().toString(),
      correctAnswer: blankText.trim()
    };
    const updatedBlanks = [...(question.clozeData?.blanks || []), newBlank];
    updateQuestion(question.id, {
      clozeData: {
        ...question.clozeData,
        blanks: updatedBlanks
      }
    });
    setBlankText('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-6">
      <div className="flex justify-between items-start mb-4">
        <input
          type="text"
          value={question.questionText}
          onChange={(e) => updateQuestion(question.id, { questionText: e.target.value })}
          placeholder="Question (e.g., Fill in the blanks)"
          className="text-xl font-semibold border-none focus:ring-0 px-0 py-1 w-full focus:border-b-2 focus:border-purple-300"
        />
      </div>
      
      {/* Passage Text */}
      <div className="mb-6 bg-purple-50 p-4 rounded-lg">
        <label className="block text-sm font-medium text-purple-700 mb-2">PASSAGE TEXT</label>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter the passage text with blanks (e.g., The ___ jumped over the fence)"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
          rows="3"
        />
        <p className="text-xs text-purple-500 mt-1">Use underscores ___ to indicate blanks in your text</p>
      </div>
      
      {/* Blanks Section */}
      <div className="bg-purple-50 p-4 rounded-lg">
        <label className="block text-sm font-medium text-purple-700 mb-2">BLANKS</label>
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={blankText}
            onChange={(e) => setBlankText(e.target.value)}
            placeholder="Correct answer for blank"
            className="border border-gray-300 rounded-l px-3 py-2 text-sm w-48 focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
          />
          <button
            onClick={handleAddBlank}
            className="bg-purple-600 text-white px-4 py-2 rounded-r text-sm hover:bg-purple-700 transition-colors"
          >
            Add Blank
          </button>
        </div>
        <div className="space-y-2 mt-3">
          {question.clozeData?.blanks?.map(blank => (
            <div key={blank.id} className="flex items-center bg-white p-2 rounded border border-gray-200">
              <span className="text-sm text-purple-600 font-medium">Blank Answer:</span>
              <span className="ml-2 flex-1 font-medium">{blank.correctAnswer}</span>
              <button
                onClick={() => updateQuestion(question.id, {
                  clozeData: {
                    ...question.clozeData,
                    blanks: question.clozeData.blanks.filter(b => b.id !== blank.id)
                  }
                })}
                className="text-red-400 hover:text-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClozeQuestion;