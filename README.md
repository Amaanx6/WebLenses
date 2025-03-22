# **WebLenses** 🚀

**Version-Controlled UI Testing Extension**


WebLenses is a **Chrome extension** that enables **UI testers** and **developers** to track, version-control, and analyze **DOM changes** effortlessly. With WebLenses, you can capture UI modifications as **commits**, visualize them, and even roll back to previous states.

---

## 🌟 **Key Features**

✅ **Automatic & Manual Commits** – Capture DOM snapshots, user actions, and metadata.
✅ **Commit Graph Visualization** – Interactive D3.js graph for tracking changes.
✅ **Diff Analysis** – Compare DOM states and highlight modifications.
✅ **Rollback & Restore** – Revert UI states partially or fully.
✅ **Collaboration Tools** – Export/import test histories, Firebase sync (optional).
✅ **AI Integration (Stretch Goal)** – GPT-generated commit messages, anomaly detection.

---


## 🛠️ **Tech Stack**

- **Frontend:** React.js + TypeScript
- **State Management:** Zustand + Immer
- **Storage:** IndexedDB
- **DOM Analysis:** MutationObserver + DiffDOM
- **Visualization:** D3.js
- **Bundling:** Webpack
---

## 🖥️ **Installation**


### **2️⃣ Manual Installation (Development Mode):**
```bash
git clone [https://github.com/your-repo/WebLenses.git](https://github.com/Mohfazam/WebLenses.git)
cd WebLenses
npm install
npm run build
```
Then, load the `dist` folder as an **unpacked extension** in Chrome.

---

## 🚀 **How It Works**

1. **Activate WebLenses** on any website.
2. **Interact with the page** (click buttons, modify text, etc.).
3. WebLenses will **log UI changes as commits** in real-time.
4. **View commit history** and analyze **DOM changes**.
5. **Restore previous UI states** when needed.

---


## 📜 **License**

This project is licensed under the [MIT License](LICENSE).

---

## 🌎 **Contribute & Support**

We welcome contributions! Feel free to fork this repo, submit issues, or make a PR. 

⭐ **Star this repo if you find WebLenses useful!** ⭐
