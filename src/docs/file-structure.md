# File Structure – EditX Project

This document defines the official folder and file layout for the EditX app. Cursor must reference this before adding, removing, or reorganizing any files. If a file or folder is added that does not exist here, this document must be updated to match.

---

## 🧾 Root Directory
├── public/                     # Static assets (favicon, HTML, etc.)
├── src/                        # Frontend source (React + Tailwind)
│   ├── pages/                  # Page components (Upload, Preview, FinalEditor)
│   ├── components/             # Reusable UI elements (ClipItem, FXSlider, etc.)
│   ├── styles/                 # Tailwind or CSS modules (if used)
│   ├── App.jsx                 # Main app structure
│   └── main.jsx                # React entry file for Vite
│
├── server/                     # Backend Node + Express server
│   ├── agents/                 # AI editing agents
│   │   ├── fxAgent.js
│   │   ├── trimAgent.js
│   │   ├── musicAgent.js
│   │   ├── narrationAgent.js
│   │   └── subtitleAgent.js
│   ├── routes/                 # API endpoints (e.g., uploadRoutes.js)
│   ├── utils/                  # Shared helper functions (concat, compression, etc.)
│   ├── orchestrator.js         # Orchestration logic
│   └── server.js               # Main backend entry point
│
├── uploads/                    # Temporary raw user-uploaded files
├── temp/                       # Intermediate agent outputs (session-based)
├── exports/                    # Final video outputs ready for download or preview
│
├── src/docs/                  # Cursor-aware system rule documents
│   ├── PRD.md
│   ├── tasks.md
│   ├── agents.md
│   ├── backend-architecture.md
│   ├── file-structure.md       # (This file)
│   ├── frontend-guidelines.md
│   ├── glossary.md
│   └── tech-stack.md
│
├── .env                        # Environment variables (API keys, etc.)
├── .gitignore                  # Ignore node_modules, exports, etc.
├── package.json                # Dependencies and scripts for frontend/backend
├── vite.config.js              # Vite build configuration
└── README.md                   # Project summary and usage instructions


## 📁 /public

- `index.html` – Primary static entry point
- Add logos, favicons, fonts, and global assets here

## 📁 /src – Frontend App

## 📁 /src/docs – Cursor Reference Documents

Each of these `.md` files serves as a live ruleset and build guide for Cursor AI.

## 📁 /server – Backend System

## 📁 /uploads

- Raw uploaded video files from the user, stored by session
- Example: `/uploads/session123/clip01.mp4`

---

## 📁 /temp

- Temporary edited files from agents
- Organized by session
- Example: `/temp/session123/fx/fx_clip_01.mp4`

---

## 📁 /exports

- Final rendered video files
- Downloadable by the user
- Example: `/exports/session123.mp4`

---

## 📁 Development Rules for Cursor

- Always follow this structure when placing new files
- Never add files to root or unknown folders without approval
- When generating a new file:
  - Reference this doc to place it correctly
  - Update this doc if it introduces a new structure
- Agents must stay in `/server/agents/`
- Frontend views must stay in `/src/pages/`
- Final videos must only be written to `/exports/`

🧠 Cursor Protocol

Cursor must reference this file when:

Creating new components or pages

Organizing frontend/backend files

Adding new features

Generating or moving rule documentation

Any file added outside this structure must be reviewed and added here

/src/docs/ must always be preserved for context-based development

