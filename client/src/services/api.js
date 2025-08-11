import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Forms API
export const getForm = (id) => api.get(`/forms/${id}`);
export const createForm = (formData) => api.post('/forms', formData);
export const updateForm = (id, formData) => api.put(`/forms/${id}`, formData);
export const uploadImage = (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  return api.post('/forms/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Responses API
export const submitResponse = (responseData) => api.post('/responses', responseData);
export const getResponses = (formId) => api.get(`/responses/form/${formId}`);

export default api;