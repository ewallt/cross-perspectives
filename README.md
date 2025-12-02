# Cross Perspectives: Study of the Cross

**Cross Perspectives** is a digital knowledge base designed to facilitate a comparative study of atonement theology. It functions as a curated library where distinct theological voices—from the Early Church Fathers to modern theologians—are brought into conversation with one another.

## 🏗 Architecture: Universal Snapshot (v2.3)

This application is built on the **Universal Snapshot v2.3** architecture. It is a **Local-First, Serverless Single Page Application (SPA)**.

* **Zero Build Step:** There is no `npm install`, no Webpack, and no compilation. The code you see is the code that runs.
* **Local-First Database:** Data is stored entirely in the user's browser using **IndexedDB** (via Dexie.js).
* **Separation of Concerns:** The Logic (Store), Configuration (Config), and Presentation (Renderers) are isolated in separate modules.

### The Tech Stack
* **Core:** Vanilla JavaScript (ES6 Modules)
* **Database:** [Dexie.js](https://dexie.org/) (Wrapper for IndexedDB)
* **Styling:** Tailwind CSS (via CDN)
* **Hosting:** GitHub Pages (Static Hosting)

## 📂 File Structure

The project uses a **Flat-File Paradigm** to ensure portability and ease of hosting.

| File | Type | Responsibility |
| :--- | :--- | :--- |
| `index.html` | **Routing** | The landing page. Directs traffic to the Reader or the Studio. |
| `cp-viewer.html` | **Reader** | The read-only interface for browsing and studying insights. |
| `cp-hub.html` | **Studio** | The "Editor-in-Chief" interface for curating and adding new content. |
| `cp-store.js` | **Logic** | Manages the Dexie.js database connection and CRUD operations. |
| `cp-config.js` | **Data** | Defines the list of Voices (Theologians) and Tags. |
| `cp-renderers.js` | **View** | Pure functions that generate HTML strings for the UI. |

## 🚀 How to Run

### Online (GitHub Pages)
Visit the live deployment at:
`https://[YOUR_USERNAME].github.io/cross-perspectives/`

### Local Development
1.  Clone this repository.
2.  Open the folder in VS Code.
3.  Use the **Live Server** extension to serve the files (right-click `index.html` -> "Open with Live Server").
    * *Note:* You cannot open these files directly via the file system (`file://`) because modern browser security blocks ES6 Module imports. You must use a local HTTP server.

## 🛡 License

MIT License.
