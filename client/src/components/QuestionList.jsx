import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import CategorizeQuestion from './questions/CategorizeQuestion';
import ClozeQuestion from './questions/ClozeQuestion';
import ComprehensionQuestion from './questions/ComprehensionQuestion';

const QuestionList = ({ questions }) => {
  const renderQuestion = (question) => {
    switch (question.type) {
      case 'categorize':
        return <CategorizeQuestion key={question.id} question={question} />;
      case 'cloze':
        return <ClozeQuestion key={question.id} question={question} />;
      case 'comprehension':
        return <ComprehensionQuestion key={question.id} question={question} />;
      default:
        return null;
    }
  };

  // This empty handler is needed for the DragDropContext
  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="max-w-3xl mx-auto space-y-6">
        {questions.map(renderQuestion)}
      </div>
    </DragDropContext>
  );
};

export default QuestionList;