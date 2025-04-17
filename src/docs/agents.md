# Agents Architecture – EditX

This document defines the **agent system** used by the EditX backend. Each agent is a modular, focused editing function triggered by the central `orchestrator.js`. Agents never overlap responsibilities and must remain single-purpose and easily testable.

---

## 🧠 Agent System Overview

- Each agent lives in `server/agents/` and is named with the format: `XAgent.js` (e.g. `fxAgent.js`)
- Agents accept structured input from the Orchestrator:
  - `sessionId`
  - `input file path(s)`
  - `user context`
- Each agent must:
  - Return a status: `"success"` or `"error"`
  - Output at least one file path (used in render step)
  - Be independently runnable and testable
- Agents should **not** write to final output folders (`/exports/`) — only to `/temp/`

---

## 🎨 FXAgent

### Purpose:
Apply visual tone, color grading, contrast/brightness tweaks to video clips.

### Input:
- Video files from `/uploads/:sessionId/`
- `tone` value (e.g. “cinematic”, “vibrant”, “dark”)

### Output:
- Edited clips with visual filters
- Stored in `/temp/:sessionId/fx/`

### Implementation Notes:
- Use FFmpeg filters for LUTs or brightness/contrast/saturation
- Must preserve original audio
- Naming: `fx_clip_01.mp4`, `fx_clip_02.mp4`, etc.

---

## ✂️ TrimAgent

### Purpose:
Trim unnecessary parts of each video (silence, low motion), shorten long scenes.

### Input:
- Raw or FX-processed clips
- Optional: heuristic or AI cue (e.g. “keep exciting moments”)

### Output:
- Cleanly trimmed, high-tempo clips
- Stored in `/temp/:sessionId/trim/`

### Implementation Notes:
- Can use FFmpeg silence detection, motion detection, or predefined timestamps
- Must preserve sync and transitions

---

## 🎵 MusicAgent

### Purpose:
Add background music to the final composition.

### Input:
- Context string to guide mood (e.g., “epic mountain adventure”)

### Output:
- `music.mp3` file, volume-adjusted
- Stored in `/temp/:sessionId/audio/music.mp3`

### Implementation Notes:
- Use GPT to choose genre/style
- Use royalty-free music libraries or audio generation tools
- Volume must mix cleanly beneath narration if present

---

## 🗣 NarrationAgent

### Purpose:
Generate a spoken story or commentary track for the final video.

### Input:
- User context
- Summarized clip description (optional)
- Tone (e.g. “inspirational”, “funny”, “relaxed”)

### Output:
- `narration.mp3` file
- Stored in `/temp/:sessionId/audio/narration.mp3`

### Implementation Notes:
- Use GPT to generate script (4–8 sentences max unless long video)
- Use OpenAI TTS or ElevenLabs to generate voice
- Voice style should match tone/context
- Ensure audio length ≈ video duration

---

## 💬 SubtitleAgent

### Purpose:
Transcribe speech from uploaded video clips.

### Input:
- Audio or video clips
- Subtitle preference: `narration` or `original audio`

### Output:
- `.srt` or `.ass` subtitle file
- Stored in `/temp/:sessionId/subtitles/`

### Implementation Notes:
- Use Whisper (OpenAI) to transcribe
- Align subtitle timing with narration or video audio
- Result must be in FFmpeg-compatible `.ass` format for overlay

---

## 🧪 Agent Testing Guidelines

Each agent must support:
- CLI test run: `node fxAgent.js sessionId=test1` (or similar)
- Logging of inputs and outputs
- Return format:
  ```js
  {
    status: "success",
    outputFiles: ["/temp/test1/fx/fx_clip_01.mp4", ...]
  }
