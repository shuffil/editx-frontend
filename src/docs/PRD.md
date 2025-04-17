# Product Requirements Document (PRD) – EditX

This PRD defines the **core vision**, **target users**, **workflow**, and **MVP scope** of the EditX platform. Cursor must reference this when implementing features, building interfaces, or determining logic flow.

---

## 🧠 Overview

**EditX** is an intelligent video editing web app powered by AI agents. Users upload raw video content, provide a brief description of what they want, and receive a fully edited video generated through orchestration of specialized AI modules.

---

## 🎯 Audience

EditX is built for:
- **Content creators** who want fast, high-quality edits
- **Gamers** creating montages or highlight reels
- **Vloggers** and **travelers** summarizing experiences
- **Educators** or **course creators** simplifying lectures
- Anyone who wants **professional-quality edits without editing knowledge**

---

## ✨ Core Value Proposition

- Turns 5–50 clips into a cinematic, platform-ready video
- Edits are personalized using user-provided **context**
- All edits are done through AI **agents**, coordinated by an **orchestrator**
- User retains creative control in a minimal **timeline-based editing studio**

---

## 🔄 How It Works (System Flow)

### 1. **Upload Page**
- User uploads video clips (drag-and-drop)
- Provides editing context (e.g. “a heartwarming recap of our trip”)
- Clicks “Generate”

### 2. **Processing Phase**
- Backend receives files + context
- `orchestrator.js` activates appropriate agents:
  - FXAgent applies a tone
  - TrimAgent cuts boring moments
  - MusicAgent adds background
  - NarrationAgent adds story voiceover
  - SubtitleAgent adds accessibility
- Final video is rendered

### 3. **Final Editor Page**
- User previews the full AI-edited result
- Timeline shows individual clips
- User can trim, mute, reorder, and adjust FX with sliders
- Subtitles and narration toggles
- User can regenerate parts or export final video

---

## 🚀 MVP Features

### ✅ Page 1: Upload
- Drag-and-drop multi-file upload
- Textarea for context
- Generate button

### ✅ Page 2: Preview
- Animated progress/loading screen
- Transition to editor when render is done

### ✅ Page 3: Final Editor
- Video preview
- Scrollable timeline of clips
- Clip trim, mute, reorder
- FX sliders (contrast, saturation, brightness)
- Subtitles + Narration toggles
- Export/Download final video

### ✅ Backend
- File uploads via multer
- Orchestrator logic and agent coordination
- Whisper transcription
- GPT narration
- Final FFmpeg render

---

## 📐 MVP Scope

- Support up to 30 clips (with plans to scale to 100+)
- Target resolution: 720p for preview, 1080p export
- Support narration or original audio (not both)
- Deliver polished, cinematic output
- Focus on **edit automation**, not granular keyframe editing

---

## 🧩 Architecture Highlights

- Modular agent system — easy to plug in new agents
- Orchestrator-first backend structure
- Fully frontend/backend decoupled with REST API communication

---

## ✅ Goals for MVP Completion

- Full working system from upload → export
- Every major feature represented in UI
- AI-assisted edits match user intent from context
- Frontend feels cinematic and focused
- Timeline interactivity functions cleanly (trim, reorder, FX)

---

## 🧠 Cursor Protocol

Cursor must:
- Prioritize features from this doc before expanding scope
- Always ask for approval if deviating from MVP goals
- Match feature priority exactly as listed here
- Use this document as the foundation for `tasks.md`

