/*
Completed Tasks:
- Set up the backend server structure with placeholder files for orchestrator.js and agent files (fxAgent.js, trimAgent.js, musicAgent.js, subtitleAgent.js, narrationAgent.js) as per the guidelines in file-structure.md and agents.md.
- Implemented fxAgent.js to apply visual effects using FFmpeg.
- Implemented trimAgent.js to trim video clips using FFmpeg.
- Implemented musicAgent.js to add background music.
- Implemented narrationAgent.js to generate narration using TTS.
- Implemented subtitleAgent.js to transcribe and generate subtitles using Whisper.
- Conducted mock test session to validate each agent and logged outputs in orchestrator.js.
- Implemented render.js to concatenate clips, mix audio, overlay subtitles, and export final video.
- Completed orchestrator system and all agent tasks.
- Completed all rendering tasks.
- Implemented Upload.jsx with drag-and-drop file upload, context textarea, and 'Generate' button.
- Implemented Preview.jsx with animated progress bar and backend polling.
- Implemented FinalEditor.jsx with video preview, timeline control, FX sliders, and export connection.
- Completed POST /upload session handling.
- Completed GET /preview/:sessionId and video playback.
*/

/*
- Unified environment variable usage to OPENAI_API_KEY
- Updated dotenv config in server.js
- Created or updated render.yaml with correct env var
- Confirmed all backend files are deployment-ready
- Added build/start scripts to package.json
*/

# Task Manager – EditX Build Plan

This task document defines every step required to build EditX. Each phase is divided into specific frontend, backend, and agent goals. Subtasks ensure Cursor completes work methodically and verifies file locations, naming conventions, and user intent.

---

## 🟦 Phase 1: Page 1 – Upload Page

### 🎯 Goal:
Allow user to upload multiple video files, write AI editing context, and start the editing process.

### 📁 Frontend (`Upload.jsx`)
- [x] Build layout with:
  - [x] Drag-and-drop box for video upload
  - [x] Textarea for AI editing context
  - [x] "Generate" button
- [x] Handle file selection and store in frontend state
- [x] Show file count or thumbnail preview
- [x] On "Generate" click:
  - [x] Send videos and context to backend (`POST /upload`)
  - [x] Save returned session ID
  - [x] Redirect to Preview page

### 🧠 Cursor Notes:
- Use FormData for multi-video uploads.
- Use Axios to `POST /upload`.
- All files go to `/uploads` folder on server.
- Store session ID in localStorage or state for continuity.

---

## 🟨 Phase 2: Page 2 – Preview/Progress Page

### 🎯 Goal:
Visually show progress bar while backend processes video edits using the Orchestrator system.

### 📁 Frontend (`Preview.jsx`)
- [x] Display full-width loading/progress animation
- [x] Begin polling `/progress/:sessionId` or simulate progress if async
- [x] When processing is done, auto-redirect to FinalEditor

### 🧠 Cursor Notes:
- Make this page clean and cinematic (neon loading bar).
- Do not fake progress without checking status unless defined.
- Expect 20s+ wait for longer edits. Use animation to retain attention.

---

## 🟥 Phase 3: Page 3 – Final Editor

### 🎯 Goal:
Let users preview AI-edited video, inspect individual clips, make manual tweaks.

### 📁 Frontend (`FinalEditor.jsx`)
- [x] Display full video preview player
- [x] Horizontal scrollable clip timeline
  - [x] Clip trim handles (range slider)
  - [x] Clip mute toggle
  - [x] Clip reorder drag handles
- [x] FX adjustment sliders (e.g., contrast, saturation)
- [x] Context box for edit instructions (AI-invokable)
- [x] Toggles:
  - [x] Narration: ON/OFF
  - [x] Subtitles: ON/OFF
- [x] Button to export or finalize video

---

## ⚙️ Backend Tasks (Node + Express)

### 🔄 Upload + Session Handling
- [x] Set up `POST /upload` to:
  - [x] Accept multiple video files via `multer`
  - [x] Store in `/uploads/sessionId/`
  - [x] Accept user context (e.g., "Exciting family trip to Switzerland")
  - [x] Return `sessionId` to frontend

### 🔁 Orchestrator System
- [x] `orchestrator.js` should:
  - [x] Load uploaded videos
  - [x] Parse user context
  - [x] Invoke agents:
    - [x] `FXAgent`
    - [x] `TrimAgent`
    - [x] `MusicAgent`
    - [x] `NarrationAgent`
    - [x] `SubtitleAgent`
  - [x] Wait for agents to complete
  - [x] Trigger `render.js` to generate full video

---

## 🤖 Agent Tasks (`/server/agents/`)

Each agent performs a distinct function. Must return a success response and output file path.

### 🎨 FXAgent
- [x] Apply cinematic color grading (based on "tone" if passed)
- [x] Adjust contrast/saturation/brightness

### ✂️ TrimAgent
- [x] Remove silent/boring segments
- [x] Create smooth clip-to-clip transitions

### 🎵 MusicAgent
- [x] Use GPT to determine appropriate genre/mood
- [x] Overlay background music, balance volume

### 🗣 NarrationAgent
- [x] Generate voiceover script using GPT
- [x] Convert to TTS (OpenAI or ElevenLabs)
- [x] Return audio path

### 💬 SubtitleAgent
- [x] Transcribe video using Whisper
- [x] Output `.srt` or `.ass` file for overlay

---

## 🧱 Rendering (`render.js`)

- [x] Merge processed clips using FFmpeg
- [x] Apply narration track if enabled
- [x] Overlay subtitles if enabled
- [x] Export final video to `/exports/:sessionId.mp4`
- [x] Return preview route to frontend

---

## 🧹 Post-processing + Cleanup

- [ ] Clean `/temp/` after job is done
- [ ] Optionally archive `/uploads/sessionId`
- [ ] Save metadata JSON for audit/debug

---

## 🔁 Final Export

### Preview & Download
- [x] Implement `GET /preview/:sessionId`
- [x] Render `<video>` player with returned URL
- [x] Add "Download Final Video" button

---

## ✅ Cursor Protocol

Cursor must:
- Follow this doc in order unless instructed otherwise
- Confirm file paths, folder names, and references
- Avoid changing core folder structure unless approved
- Log changes to `tasks.md` after each major step is complete
