# Frontend Guidelines – EditX

This document defines the visual philosophy, design structure, and UI logic for the EditX platform. Cursor must follow these rules when building or modifying frontend components, styles, and page layouts.

---

## 🎯 Philosophy

EditX should feel:
- Clean, cinematic, and modern
- Highly responsive across all screen sizes
- Minimalist with meaningful motion and contrast
- Focused on elevating user footage — never distracting from it

Do not add excessive visual clutter, icons, or UI noise. The goal is to guide the user through a professional AI editing experience that feels intelligent and elegant.

---

## ⚙️ Tech Stack & Libraries

Cursor must only use the following approved technologies:

### UI Framework:
- **React** (preferred)
- Plain HTML/JS accepted only if app remains minimal

### Styling:
- **TailwindCSS** (required)
- No inline styles or external CSS files unless wrapped in Tailwind classes

### Animation:
- **Framer Motion** (approved for clip transitions, hover animations, sliders)

### Optional:
- **FFmpeg.WASM** for local clip previews (only if performance allows)
- No additional UI libraries (e.g. Material UI, Bootstrap) unless approved

---

## 🧩 Core Page Layouts

### Page 1 – Upload Interface (`Upload.jsx`)
- Drag-and-drop file upload box (large, centered)
- Textarea below it: “Describe your video” → Context for AI
- “Generate” button below that (or floating to the right)

**Visual notes:**
- All elements should be center-aligned with soft motion transitions
- Support multi-upload and list uploaded file count/filenames

---

### Page 2 – Preview + Progress Page (`Preview.jsx`)
- Full-width progress bar with smooth animation
- Visual placeholder or loader animation
- Text above bar: “Creating your video… this may take a moment”

**Transition:**
- Auto-redirect to Page 3 when backend finishes processing

---

### Page 3 – Final Editor (`FinalEditor.jsx`)
- Left: Live video preview player
- Below: Horizontal scrollable timeline (thumbnails of clips)
- Each clip is interactive:
  - Click to select
  - Mute toggle
  - Reorder
  - Trim via slider

**Sidebar/Overlay UI:**
- FX sliders: contrast, saturation, brightness
- Textarea to edit AI prompt / context
- Toggle switches:
  - Narration (on/off)
  - Subtitles (on/off)
- Final “Export Video” button

---

## 🎨 Design System

### Colors
- Dark background (e.g. `#0e0e0e`)
- Neon-accented glow for active elements (e.g. blue, cyan, violet)
- White or soft-gray text
- Avoid harsh reds/yellows except for warning states

### Typography
- Headings: Large, wide-letter spacing
- Body: Clean sans-serif (e.g. Inter, Open Sans)
- Font sizes must be responsive (use `text-base`, `text-lg`, etc.)

---

## 📱 Responsiveness

Cursor must:
- Ensure all 3 pages work on mobile, tablet, and desktop
- Use Tailwind grid/flex utilities for layout
- Timeline should horizontally scroll on smaller devices
- All sliders, toggles, and buttons must remain touch-friendly

---

## 🎬 Component Guidelines

### Clip Component
- Thumbnail
- Label: filename or clip # (optional)
- Mute toggle (icon)
- Trim slider (visible when selected)
- Tooltip or hover effect on hover/select

### Slider Component
- Tailwind range input (`type=range`)
- Tooltip or label above to show value
- Connected to state (e.g., contrast = 0.8)

### Toggle Component
- Switches for narration / subtitles
- Label on left, toggle on right
- Framer Motion glow when toggled on

---

## 🔁 Cursor Protocol

When Cursor modifies or creates frontend files:
- Use only Tailwind for styles
- Reuse components inside `/src/components/` whenever possible
- Always group code by page (Upload, Preview, FinalEditor)
- Every new component must be documented via comment or added to this file if structural

