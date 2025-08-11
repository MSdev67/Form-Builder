import React, { useState } from 'react';
import { useForm } from '../../context/FormContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaGripVertical, FaTimes } from 'react-icons/fa';

const CategorizeQuestion = ({ question }) => {
  const { updateQuestion } = useForm();
  const [newCategory, setNewCategory] = useState('');
  const [newItem, setNewItem] = useState({ text: '', category: '' });

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    const updatedCategories = [
      ...question.categories,
      {
        id: Date.now().toString(),
        name: newCategory.trim(),
        options: []
      }
    ];
    updateQuestion(question.id, { categories: updatedCategories });
    setNewCategory('');
  };

  const handleAddItem = () => {
    if (!newItem.text.trim() || !newItem.category) return;
    const updatedItems = [
      ...question.items,
      {
        id: Date.now().toString(),
        text: newItem.text.trim(),
        belongsTo: newItem.category
      }
    ];
    updateQuestion(question.id, { items: updatedItems });
    setNewItem({ text: '', category: '' });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(question.categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    updateQuestion(question.id, { categories: items });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
      <div className="flex justify-between items-start mb-4">
        <input
          type="text"
          value={question.questionText}
          onChange={(e) => updateQuestion(question.id, { questionText: e.target.value })}
          placeholder="Question (e.g., Categorize these items)"
          className="text-xl font-semibold border-none focus:ring-0 px-0 py-1 w-full focus:border-b-2 focus:border-indigo-300"
        />
      </div>
      
      {/* Categories Section */}
      <div className="mb-6 bg-indigo-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-indigo-700 mb-3 flex items-center">
          <span className="mr-2">🗂</span> CATEGORIES
        </h3>
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="border border-gray-300 rounded-l px-3 py-2 text-sm w-48 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
          <button
            onClick={handleAddCategory}
            className="bg-indigo-600 text-white px-4 py-2 rounded-r text-sm hover:bg-indigo-700 transition-colors"
          >
            Add
          </button>
        </div>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="categories">
            {(provided) => (
              <div 
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2 mt-2"
              >
                {question.categories.map((category, index) => (
                  <Draggable 
                    key={category.id} 
                    draggableId={category.id} 
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center p-2 rounded-md ${
                          snapshot.isDragging ? 'bg-indigo-200 shadow-lg' : 'bg-white'
                        } border border-indigo-100`}
                      >
                        <span 
                          {...provided.dragHandleProps}
                          className="text-gray-400 mr-2 hover:text-indigo-600"
                        >
                          <FaGripVertical />
                        </span>
                        <span className="flex-1 text-indigo-800 font-medium">{category.name}</span>
                        <button
                          onClick={() => updateQuestion(question.id, { 
                            categories: question.categories.filter(c => c.id !== category.id),
                            items: question.items.filter(i => i.belongsTo !== category.id)
                          })}
                          className="text-red-400 hover:text-red-600 ml-2"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      
      {/* Items Section */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-700 mb-3">ITEMS TO CATEGORIZE</h3>
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={newItem.text}
            onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
            placeholder="Item text"
            className="border border-gray-300 rounded-l px-3 py-2 text-sm w-48 focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
          />
          <select
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="border border-gray-300 px-2 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
          >
            <option value="">Select category</option>
            {question.categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <button
            onClick={handleAddItem}
            className="bg-blue-600 text-white px-4 py-2 rounded-r text-sm hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="space-y-2 mt-3">
          {question.items.map(item => (
            <div key={item.id} className="flex items-center bg-white p-2 rounded border border-gray-200">
              <span className="flex-1">{item.text}</span>
              <span className="mx-2 text-gray-400">→</span>
              <span className="text-sm text-blue-600 font-medium mr-3">
                {question.categories.find(c => c.id === item.belongsTo)?.name || 'Uncategorized'}
              </span>
              <button
                onClick={() => updateQuestion(question.id, { 
                  items: question.items.filter(i => i.id !== item.id)
                })}
                className="text-red-400 hover:text-red-600"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorizeQuestion;