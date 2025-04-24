// src/App.jsx or main router file
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/Upload';      // or wherever Upload page is
import Preview from './pages/Preview';        // ← this is your existing file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/preview/:sessionId" element={<Preview />} /> {/* ← correct route */}
      </Routes>
    </Router>
  );
}

export default App;
