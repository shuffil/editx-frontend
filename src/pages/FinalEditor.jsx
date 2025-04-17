import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FinalEditor = () => {
  const [clips, setClips] = useState([]);
  const [selectedClip, setSelectedClip] = useState(null);
  const [fxSettings, setFxSettings] = useState({ contrast: 1, brightness: 1, saturation: 1 });
  const [context, setContext] = useState('');
  const [subtitles, setSubtitles] = useState(true);
  const [narration, setNarration] = useState(true);
  const navigate = useNavigate();
  const sessionId = 'test-session-001'; // Replace with actual session ID

  useEffect(() => {
    // Load processed clips from backend
    axios.get(`/temp/${sessionId}/clips`)
      .then(response => {
        setClips(response.data.clips);
        setSelectedClip(response.data.clips[0]);
      })
      .catch(error => console.error('Error loading clips:', error));
  }, [sessionId]);

  const handleFxChange = (e) => {
    setFxSettings({ ...fxSettings, [e.target.name]: e.target.value });
  };

  const handleClipSelect = (clip) => {
    setSelectedClip(clip);
  };

  const handleMuteToggle = (clipId) => {
    setClips(clips.map(clip => clip.id === clipId ? { ...clip, muted: !clip.muted } : clip));
  };

  const handleReorder = (clipId, direction) => {
    // Logic to reorder clips
  };

  const handleExport = () => {
    const exportData = {
      clips,
      context,
      fxSettings,
      subtitles,
      narration
    };
    axios.post(`/export/${sessionId}`, exportData)
      .then(response => {
        navigate(`/preview/${sessionId}`);
      })
      .catch(error => console.error('Error exporting video:', error));
  };

  const handleDownload = () => {
    // Logic to download the final video
    window.location.href = `/exports/${sessionId}.mp4`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-4xl p-4">
        <div className="mb-4">
          <video controls className="w-full h-64 bg-black">
            <source src="/path/to/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex overflow-x-auto mb-4">
          {clips.map(clip => (
            <div key={clip.id} className="flex-shrink-0 w-32 h-20 bg-gray-800 m-2 p-2">
              <p>{clip.name}</p>
              <button onClick={() => handleClipSelect(clip)}>Select</button>
              <button onClick={() => handleMuteToggle(clip.id)}>{clip.muted ? 'Unmute' : 'Mute'}</button>
              <button onClick={() => handleReorder(clip.id, 'up')}>Up</button>
              <button onClick={() => handleReorder(clip.id, 'down')}>Down</button>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label>Contrast</label>
          <input type="range" name="contrast" min="0" max="2" step="0.1" value={fxSettings.contrast} onChange={handleFxChange} className="w-full" />
          <label>Brightness</label>
          <input type="range" name="brightness" min="0" max="2" step="0.1" value={fxSettings.brightness} onChange={handleFxChange} className="w-full" />
          <label>Saturation</label>
          <input type="range" name="saturation" min="0" max="2" step="0.1" value={fxSettings.saturation} onChange={handleFxChange} className="w-full" />
        </div>
        <div className="mb-4">
          <textarea value={context} onChange={(e) => setContext(e.target.value)} className="w-full p-2 border border-gray-700 rounded" placeholder="Edit context for AI..." />
        </div>
        <div className="flex justify-between mb-4">
          <label>
            <input type="checkbox" checked={subtitles} onChange={() => setSubtitles(!subtitles)} /> Subtitles
          </label>
          <label>
            <input type="checkbox" checked={narration} onChange={() => setNarration(!narration)} /> Narration
          </label>
        </div>
        <button onClick={handleExport} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Export
        </button>
        <button onClick={handleDownload} className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
          Download Final Video
        </button>
      </div>
    </div>
  );
};

export default FinalEditor;
