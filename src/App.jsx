import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Upload from './pages/Upload';
import Preview from './pages/Preview';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/preview/:sessionId" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}
