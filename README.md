# WEBLENSES🌐

**AI-Powered Testing Companion with Git-Like Version Control for Web Apps**


## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

---

## Overview

### Problem Statement 💡
Modern testers lack tools to:
- Track incremental changes during exploratory testing
- Visualize test histories like Git commit graphs
- Rollback to previous states without restarting tests

### Solution: WEBLENSES 🚀
A browser extension + web platform that brings Git-like version control to manual testing:
- **AI-Powered Snapshots**: Track DOM changes like code commits
- **Visual Regression Detection**: Compare UI states across versions
- **Collaboration Hub**: Share test histories with your team

---

## Features

### Core Capabilities 🔍

| Feature | Description |
|---------|-------------|
| **Git-Style Version Control** | Track testing workflows with commits/branches |
| **AI-Driven DOM Analysis** | Gemini-powered change detection & explanations |
| **Accessibility Auditor** | Real-time WCAG compliance checks |
| **Mind Map Visualization** | Auto-generated site structure maps |

### Browser Extension Features 🌐
- **Smart Snapshots**:
  - Automatic DOM capture every 30s (configurable)
  - Manual commits with messages (e.g., "Tested checkout flow")
- **AI Chat Assistant**:
  - Context-aware troubleshooting
  - Natural language test guidance
- **Visual Diff Tool**:
  - Side-by-side UI comparisons
  - Element-level change highlighting


### Web Platform Features 🖥

- **Commit Graph Explorer**:
  - Interactive D3.js visualization
  - Branch merging/compare functionality
- **Risk Heatmaps**:
  - Change frequency visualization
  - AI-predicted risk areas
- **Collaboration Tools**:
  - Team annotation system
  - JSON history export/import


---

## Tech Stack 🛠️

### Frontend

- **Extension**: React + TypeScript, Tailwind CSS
- **State Management**: Zustand + Immer
- **Visualization**: D3.js, Framer Motion


### Backend

- **Core**: Node.js, Express
- **Database**: MongoDB (Snapshot metadata)
- **AI Services**: Gemini API, Custom NLP Models


### Browser Layer
- **DOM Capture**: MutationObserver API
- **Storage**: IndexedDB (local), Firebase (sync)
- **Browser API**: Chrome Extensions API




## Installation 💻

**Browser Extension**:
1. Clone repo:
   ```bash
   git clone https://github.com/your-org/weblenses.git
   ```
2. Build extension:
   ```bash
   cd extension
   npm install && npm run build
   ```
3. Load unpacked extension in Chrome:
   - Navigate to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked" and select `/dist` folder

**Web Platform**:
```bash
cd web-platform
npm install && npm start
```

---

## Usage 🛠️

1. **Capture Snapshots**:
   - Click extension icon → "Start Recording"
   - Perform manual tests as normal

2. **Create Commit**:

3. **Analyze Changes**:

---


## Contributing 🤝

1. Fork the repository
2. Create feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit changes:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. Push to branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open Pull Request

---


