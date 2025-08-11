import React, { createContext, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getForm, createForm, updateForm, uploadImage } from '../services/api';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    headerImage: '',
    questions: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) loadForm(id);
  }, [id]);

  const loadForm = async (formId) => {
    setIsLoading(true);
    try {
      const response = await getForm(formId);
      setForm(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const saveForm = async () => {
    setIsLoading(true);
    try {
      let response;
      if (form._id) {
        response = await updateForm(form._id, form);
      } else {
        response = await createForm(form);
      }
      setForm(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (updates) => {
    setForm(prev => ({ ...prev, ...updates }));
  };

  const addQuestion = (questionType) => {
    const newQuestion = createQuestion(questionType);
    setForm(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
    return newQuestion;
  };

  const updateQuestion = (questionId, updates) => {
    setForm(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, ...updates } : q
      )
    }));
  };

  const deleteQuestion = (questionId) => {
    setForm(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  const uploadImageFile = async (file) => {
    try {
      const response = await uploadImage(file);
      return response.data.filename;
    } catch (err) {
      throw err;
    }
  };

  const createQuestion = (type) => {
    const baseQuestion = {
      id: Date.now().toString(),
      type,
      questionText: '',
      questionImage: ''
    };

    switch (type) {
      case 'categorize':
        return {
          ...baseQuestion,
          categories: [
            { id: Date.now().toString() + 1, name: 'Category 1', options: [] },
            { id: Date.now().toString() + 2, name: 'Category 2', options: [] }
          ],
          items: []
        };
      case 'cloze':
        return {
          ...baseQuestion,
          clozeData: {
            text: '',
            blanks: []
          }
        };
      case 'comprehension':
        return {
          ...baseQuestion,
          comprehensionData: {
            passage: '',
            questions: []
          }
        };
      default:
        return baseQuestion;
    }
  };

  return (
    <FormContext.Provider
      value={{
        form,
        isLoading,
        error,
        updateForm: updateFormData,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        saveForm,
        uploadImage: uploadImageFile
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);