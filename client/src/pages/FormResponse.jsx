import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getResponses } from '../services/api';

const FormResponse = () => {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await getResponses(id);
        setResponses(response.data);
      } catch (err) {
        console.error('Error fetching responses:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchResponses();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading responses...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Form Responses</h1>
      
      {responses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No responses yet for this form
        </div>
      ) : (
        <div className="space-y-6">
          {responses.map((response, index) => (
            <div key={response._id} className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Response #{index + 1}</h3>
              <div className="space-y-4">
                {response.answers.map((answer, ansIdx) => (
                  <div key={ansIdx} className="border-b pb-4 last:border-b-0">
                    <p className="font-medium mb-1">Question {ansIdx + 1}:</p>
                    <pre className="bg-gray-50 p-2 rounded text-sm overflow-x-auto">
                      {JSON.stringify(answer.answer, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Submitted at: {new Date(response.submittedAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormResponse;