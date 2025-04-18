import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FinalEditor = () => {
  const { sessionId } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    if (sessionId) {
      // ✅ Use Render backend for deployed video streaming
      setVideoUrl(`https://editx-backend.onrender.com/preview/${sessionId}`);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">🎬 Final Preview</h1>

      {videoUrl ? (
        <video
          controls
          autoPlay
          className="max-w-full max-h-[80vh] rounded-md shadow-lg border border-gray-700"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p className="text-lg text-gray-400">Loading your rendered video...</p>
      )}

      <div className="mt-6 text-sm text-gray-500">
        Session ID: <span className="font-mono">{sessionId}</span>
      </div>
    </div>
  );
};

export default FinalEditor;
