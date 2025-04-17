import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [context, setContext] = useState('');
  const [sessionId, setSessionId] = useState(null);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleContextChange = (event) => {
    setContext(event.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('videos', file);
    });
    formData.append('context', context);

    try {
      const response = await axios.post(
        'https://editx-backend.onrender.com/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const { sessionId } = response.data;
      setSessionId(sessionId);
      window.location.href = `/preview/${sessionId}`;
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please check your files and try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-4">
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">Upload your videos</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">Describe your video</label>
          <textarea
            value={context}
            onChange={handleContextChange}
            className="w-full p-2 border border-gray-700 rounded"
            placeholder="Enter context for AI editing..."
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default Upload;
