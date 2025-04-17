# Tech Stack – EditX

This document defines the **approved technology stack** for EditX. Cursor must always reference this file before selecting libraries, writing code, or scaffolding features. If a dependency or tool is not listed here, it must not be used unless explicitly added and approved.

---

## 🖥️ Frontend Stack

### Framework:
- **React** (preferred framework)
  - JSX component structure
  - Page-based layout (`Upload.jsx`, `Preview.jsx`, `FinalEditor.jsx`)

### Styling:
- **TailwindCSS** (required)
  - No raw CSS or SCSS unless wrapped within Tailwind utility classes
  - Follow mobile-first, utility-based styling pattern

### Animation:
- **Framer Motion**
  - Used for element transitions, hover effects, clip interactivity

### Build Tool:
- **Vite** (preferred)
  - For development server and fast module bundling
  - `vite.config.js` must be included in root when used

### Optional:
- **FFmpeg.wasm**
  - For frontend video manipulation or frame previews
  - Only if proven performant; use cautiously with large files

---

## ⚙️ Backend Stack

### Runtime + Server:
- **Node.js**
- **Express.js**

### File Upload:
- **Multer**
  - Used to handle multi-file video uploads
  - Saves files under `/uploads/:sessionId/`

### AI + API Integration:
- **OpenAI Whisper API** – For speech-to-text transcription
- **OpenAI GPT API** – For narration/story generation
- **TTS Provider** – ElevenLabs (preferred) or OpenAI TTS

### Video Editing:
- **FFmpeg (CLI)**
  - Used for all video trimming, merging, audio mixing, and rendering
  - Must be executed via child process (`fluent-ffmpeg` or raw `spawn`)

### HTTP Client:
- **Axios**
  - For making outbound API calls (e.g., OpenAI, ElevenLabs)

---

## 📦 Dependencies

Required `npm` packages:
"dependencies": { "axios": "^1.x", "cors": "^2.x", "dotenv": "^16.x", "express": "^4.x", "fluent-ffmpeg": "^2.x", "multer": "^1.x", "uuid": "^9.x" }

makefile
Copy
Edit

Development:
"devDependencies": { "vite": "^5.x" (if React is used) }

yaml
Copy
Edit

---

## 📁 Project Folder Expectations

- `/src/` → Frontend (React + Tailwind + component views)
- `/server/` → Backend logic (routes, orchestrator, agents)
- `/uploads/`, `/temp/`, `/exports/` → File processing pipeline

---

## 🧠 Cursor Protocol

Cursor must:
- Only use packages listed above
- Install dependencies in the correct context (frontend vs backend)
- Avoid UI libraries like Bootstrap, MUI, Chakra, unless explicitly listed
- Check this file before adding any external packages or scripts
- Reject any feature request that violates stack policy until updated here

---

## 🔧 Stack Maintenance

To add a new package:
- Update this file (`tech-stack.md`)
- Specify where it will be used and why
- Confirm usage does not overlap with an existing library