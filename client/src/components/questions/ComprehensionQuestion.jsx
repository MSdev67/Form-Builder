import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';

const ComprehensionQuestion = ({ question }) => {
  const { updateQuestion } = useForm();
  const [passage, setPassage] = useState(question.comprehensionData?.passage || '');
  const [newQuestion, setNewQuestion] = useState({ text: '', options: [], correctAnswer: '' });
  const [newOption, setNewOption] = useState('');

  const handlePassageChange = (e) => {
    const newPassage = e.target.value;
    setPassage(newPassage);
    updateQuestion(question.id, {
      comprehensionData: {
        ...question.comprehensionData,
        passage: newPassage
      }
    });
  };

  const handleAddOption = () => {
    if (!newOption.trim()) return;
    const updatedOptions = [...newQuestion.options, newOption.trim()];
    setNewQuestion({ ...newQuestion, options: updatedOptions });
    setNewOption('');
  };

  const handleAddQuestion = () => {
    if (!newQuestion.text.trim() || !newQuestion.correctAnswer) return;
    const subQuestion = {
      id: Date.now().toString(),
      questionText: newQuestion.text,
      options: newQuestion.options,
      correctAnswer: newQuestion.correctAnswer
    };
    const updatedQuestions = [...(question.comprehensionData?.questions || []), subQuestion];
    updateQuestion(question.id, {
      comprehensionData: {
        ...question.comprehensionData,
        questions: updatedQuestions
      }
    });
    setNewQuestion({ text: '', options: [], correctAnswer: '' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-6">
      <div className="flex justify-between items-start mb-4">
        <input
          type="text"
          value={question.questionText}
          onChange={(e) => updateQuestion(question.id, { questionText: e.target.value })}
          placeholder="Question (e.g., Read the passage and answer)"
          className="text-xl font-semibold border-none focus:ring-0 px-0 py-1 w-full focus:border-b-2 focus:border-green-300"
        />
      </div>
      
      {/* Passage Section */}
      <div className="mb-6 bg-green-50 p-4 rounded-lg">
        <label className="block text-sm font-medium text-green-700 mb-2">PASSAGE</label>
        <textarea
          value={passage}
          onChange={handlePassageChange}
          placeholder="Enter the comprehension passage"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-300"
          rows="4"
        />
      </div>
      
      {/* Sub-Questions Section */}
      <div className="bg-green-50 p-4 rounded-lg">
        <label className="block text-sm font-medium text-green-700 mb-3">ADD SUB-QUESTION</label>
        
        {/* Question Text */}
        <input
          type="text"
          value={newQuestion.text}
          onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
          placeholder="Question text"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-green-200 focus:border-green-300"
        />
        
        {/* Options */}
        <div className="flex items-center mb-3">
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Option text"
            className="border border-gray-300 rounded-l px-3 py-2 text-sm w-48 focus:ring-2 focus:ring-green-200 focus:border-green-300"
          />
          <button
            onClick={handleAddOption}
            className="bg-green-600 text-white px-4 py-2 rounded-r text-sm hover:bg-green-700 transition-colors"
          >
            Add Option
          </button>
        </div>
        
        {/* Options List */}
        {newQuestion.options.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2 mb-2">
              {newQuestion.options.map((option, idx) => (
                <div 
                  key={idx} 
                  className={`px-3 py-1 rounded-full text-sm cursor-pointer ${newQuestion.correctAnswer === option ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setNewQuestion({ ...newQuestion, correctAnswer: option })}
                >
                  {option}
                </div>
              ))}
            </div>
            <p className="text-xs text-green-600">
              {newQuestion.correctAnswer 
                ? `Correct answer: ${newQuestion.correctAnswer}`
                : 'Click on an option to set as correct answer'}
            </p>
          </div>
        )}
        
        {/* Add Question Button */}
        <button
          onClick={handleAddQuestion}
          disabled={!newQuestion.text || !newQuestion.correctAnswer}
          className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Sub-Question
        </button>
      </div>
      
      {/* Existing Sub-Questions */}
      {question.comprehensionData?.questions?.length > 0 && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-green-700 mb-2">SUB-QUESTIONS</label>
          <div className="space-y-3">
            {question.comprehensionData.questions.map((q, idx) => (
              <div key={q.id} className="bg-white p-3 rounded border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-800">{idx + 1}. {q.questionText}</span>
                  <button
                    onClick={() => updateQuestion(question.id, {
                      comprehensionData: {
                        ...question.comprehensionData,
                        questions: question.comprehensionData.questions.filter(sq => sq.id !== q.id)
                      }
                    })}
                    className="text-red-400 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  <div className="flex flex-wrap gap-1">
                    {q.options.map((option, oIdx) => (
                      <span 
                        key={oIdx} 
                        className={`px-2 py-1 rounded text-xs ${q.correctAnswer === option ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComprehensionQuestion;