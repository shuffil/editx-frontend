# Glossary – EditX System Terms

This glossary defines the core vocabulary of EditX. Cursor must refer to this list when interpreting user input, handling file generation, or routing logic between components.

Each term includes its definition, where it belongs in the codebase, and its significance in the system.

---

### 🧠 Orchestrator

**Definition:**  
The central controller responsible for managing the flow of editing tasks. It accepts a `sessionId` and `context`, and dispatches individual editing operations to agents.

**Location:**  
`server/orchestrator.js`

**Cursor Usage:**  
- Must call agents sequentially based on logic.
- Do not run agents independently from routes — use orchestrator only.
- Required for initiating render process.

---

### 🤖 Agent

**Definition:**  
A modular editing component responsible for performing one specific task (e.g. trimming, adding FX, generating narration).

**Location:**  
`server/agents/*.js`

**Cursor Usage:**  
- Each agent must live in `server/agents/` with a filename like `fxAgent.js`.
- Agents must never handle routing or UI.
- Cursor must never combine agent functionality.

---

### ✍️ Context

**Definition:**  
User-written description or prompt that guides the AI editing process. This can influence tone, narrative, visual style, and pacing.

**Example:**  
“Fun highlights from our ski trip in Switzerland — make it exciting and cinematic.”

**Cursor Usage:**  
- Must be passed into orchestrator and forwarded to all agents.
- Can be used to modify behavior of agents like `FXAgent`, `MusicAgent`, and `NarrationAgent`.

---

### 🖥 Final Editor

**Definition:**  
The third and final UI page of the app, where users view their AI-edited video and interact with individual clips on a timeline.

**File:**  
`src/pages/FinalEditor.jsx`

**Cursor Usage:**  
- This is where the user can trim, mute, reorder clips, or adjust FX via sliders.
- Cursor must ensure edits on this page trigger backend updates (if needed).

---

### 📜 Subtitles

**Definition:**  
Timed text overlays for accessibility or clarity. Generated from either original audio (via Whisper) or narration.

**Format:**  
`.ass` or `.srt`, stored in `/temp/:sessionId/subtitles/`

**Cursor Usage:**  
- Must use Whisper for generating subtitle content from user-uploaded video.
- For narration-based subtitles, use GPT transcript.
- Must be referenced in final FFmpeg render for overlay.

---

### 🎙 Narration

**Definition:**  
Spoken summary of the video, generated using GPT and converted to audio via TTS.

**File:**  
`narration.mp3` saved in `/temp/:sessionId/audio/`

**Cursor Usage:**  
- Must be toggled on/off based on user preference.
- Generated in `NarrationAgent`.
- Can influence subtitle overlay and audio balancing.

---

### 🎞 Tone

**Definition:**  
The cinematic style or atmosphere applied to the final video. Includes visual FX, music, narration voice, and transitions.

**Examples:**  
- “Cinematic” → Film grain, slow fades, orchestral music  
- “Energetic” → Punchy color, upbeat music, snappy cuts

**Cursor Usage:**  
- Tone is derived from user context and passed to FXAgent, MusicAgent, NarrationAgent.
- Cursor should infer tone from prompt if not explicitly labeled.
- Must never apply tone blindly — always match to context or toggle.

---

### 🔁 Session

**Definition:**  
A unique identifier assigned to each user upload session. All temporary files are stored under a folder named after the session ID.

**Example Path:**  
`uploads/abc123/`, `temp/abc123/`, `exports/abc123.mp4`

**Cursor Usage:**  
- Must always route data by `sessionId`.
- Never overwrite files across sessions.
- Return session ID to frontend after upload and preserve in state.

---

### 📤 Export

**Definition:**  
The final rendered video after all processing is complete. Available for preview and download.

**Location:**  
`exports/:sessionId.mp4`

**Cursor Usage:**  
- Only generated after successful orchestrator + render pipeline.
- Streamed to frontend via `GET /preview/:sessionId`

---

### 🧠 Cursor Glossary Instructions

- When any of these terms appear in prompts or system messages, Cursor should:
  - Check if the related file or module exists in the correct location
  - Use this glossary to infer expected behavior or dependencies
  - Never invent or alter glossary terms unless user explicitly approves

