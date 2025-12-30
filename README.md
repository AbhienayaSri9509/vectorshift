# VectorShift Assessment - Minimal Implementation

Frontend (React, Vite):
- Folder: `frontend`
- Install and run:

```bash
cd frontend
npm install
npm start
```

The frontend runs on Vite (default port 5173). It provides a simple node editor UI where you can add nodes (Text, LLM, Input, Output, Transform), add edges, and submit the pipeline to the backend.

Backend (FastAPI):
- Folder: `backend`
- Install and run:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The frontend expects the backend at `http://127.0.0.1:8000`.

What was implemented:
- Node abstraction: `NodeBase.jsx` with specialized nodes `TextNode.jsx`, `LLMNode.jsx`, `InputNode.jsx`, `OutputNode.jsx`, `TransformNode.jsx`.
- Styling: `styles.css` with a compact theme.
- Text node logic: auto-resizing textarea and detection of `{{ varName }}` occurrences to create variable handles.
- Backend integration: `frontend/src/submit.js` posts `{nodes, edges}` to backend `/pipelines/parse`, backend counts nodes/edges and checks DAG using Kahn's algorithm, returns `{num_nodes, num_edges, is_dag}`. Frontend shows alert with response.

Next steps you might want:
- Replace mock node UI with a proper drag-and-drop graph editor (e.g., React Flow) if desired.
- Add persistence and validation in the frontend.

