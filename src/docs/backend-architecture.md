# Backend Architecture – EditX

This document defines the structure, responsibilities, and implementation details of the EditX backend system. Cursor must follow this document precisely when handling routing, agent orchestration, file management, and rendering.

---

## 🧱 Tech Stack

- **Platform**: Node.js
- **Framework**: Express.js
- **File Processing**: FFmpeg CLI
- **AI APIs**: OpenAI Whisper (transcription), OpenAI GPT (narration), TTS (e.g., ElevenLabs)
- **File Uploads**: `multer`
- **HTTP Requests**: `axios`
- **Env Management**: `dotenv`
- **Temporary Storage**: `uploads/`, `temp/`, `exports/`

---

## 🔁 Core API Routes

Each route performs a singular responsibility. Do not combine functionality across endpoints.

### `POST /upload`
- Accepts:
  - Multiple video files (`multipart/form-data`)
  - Text input (`context`)
- Stores:
  - Files into `/uploads/:sessionId/`
  - Returns unique `sessionId`
- Dependencies:
  - `multer`, `uuid`, filesystem

### `POST /process`
- Accepts:
  - `sessionId`, optional processing flags
- Actions:
  - Calls `orchestrator.js`
  - Begins full agent pipeline
- Returns:
  - Processing status: queued / running / completed / failed

### `GET /preview/:sessionId`
- Streams:
  - Final rendered `.mp4` file from `/exports/:sessionId.mp4`
- Headers:
  - Sets `Content-Type: video/mp4`
  - Supports seek/byte range

### `POST /narration`
- Accepts:
  - Text prompt and `sessionId`
- Generates:
  - Narration audio using GPT + TTS
  - Saved to `/temp/:sessionId/audio/narration.mp3`

### `POST /subtitles`
- Accepts:
  - `sessionId` and flag for `original` or `narration`
- Generates:
  - `.srt` or `.ass` subtitle file
  - Saved to `/temp/:sessionId/subtitles/`

---

## 🧠 Orchestrator System

The orchestrator coordinates backend workflows.

### File:
`/server/orchestrator.js`

### Role:
- Accepts session metadata
- Loads context and uploaded clip list
- Runs agents sequentially:
  - FX → Trim → Music → Narration → Subtitles
- Calls `render.js` after all agents succeed
- Returns final output path or error

### Cursor Notes:
- Always route through `orchestrator.js` — never call agents manually from routes.
- Do not run rendering until all agents are complete.
- Allow for agent opt-outs (e.g., narration disabled).

---

## 🤖 Agents Folder

Path: `server/agents/`

Each agent must:
- Accept `sessionId`, `context`, and agent-specific options
- Output files to `/temp/:sessionId/`
- Return:
  ```js
  {
    status: "success",
    outputFiles: ["/temp/..."]
  }
