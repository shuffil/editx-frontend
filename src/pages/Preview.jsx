import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Preview = () => {
  const { sessionId } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const url = `https://editx-backend.onrender.com/exports/${sessionId}.mp4`;
        setVideoUrl(url); // Direct video stream URL from backend
      } catch (error) {
        console.error('Failed to load preview:', error);
      }
    };

    fetchPreview();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-2xl mb-4">Preview for Session {sessionId}</h1>
      {videoUrl ? (
        <video controls className="max-w-full rounded shadow-lg">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video preview...</p>
      )}
    </div>
  );
};

export default Preview;
