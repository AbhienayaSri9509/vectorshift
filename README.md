VectorShift Frontend Technical Assessment

Minimal, Functional Implementation

This repository contains my solution to the VectorShift Frontend Technical Assessment, implemented with React (Vite) on the frontend and FastAPI on the backend.

The focus of this submission is clean node abstraction, dynamic text node behavior, unified styling, and full frontend–backend integration for validating pipelines.

🛠 Tech Stack
Frontend

React (JavaScript)

Vite

CSS (custom compact theme)

Backend

Python

FastAPI

Uvicorn

📂 Project Structure
/
├── frontend/
│   ├── src/
│   │   ├── nodes/
│   │   │   ├── NodeBase.jsx
│   │   │   ├── TextNode.jsx
│   │   │   ├── LLMNode.jsx
│   │   │   ├── InputNode.jsx
│   │   │   ├── OutputNode.jsx
│   │   │   └── TransformNode.jsx
│   │   ├── submit.js
│   │   ├── styles.css
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
└── README.md

🚀 Running the Project
Frontend (React + Vite)
cd frontend
npm install
npm start


Runs on Vite

Default URL:

http://localhost:5173


The frontend provides a simple node editor UI where users can:

Add nodes (Text, LLM, Input, Output, Transform)

Connect nodes with edges

Submit the pipeline to the backend

Backend (FastAPI)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload


Backend runs at:

http://127.0.0.1:8000


The frontend expects the backend at this address.

🧩 What Was Implemented
Part 1: Node Abstraction
Goal

Avoid duplicated code across node implementations and make it easy to add new node types.

Implementation

Created a reusable NodeBase.jsx abstraction that handles:

Node layout

Title rendering

Input/output handle structure

Shared styles

Specialized nodes extend this base:

TextNode.jsx

LLMNode.jsx

InputNode.jsx

OutputNode.jsx

TransformNode.jsx

This allows new nodes to be created with minimal boilerplate.

Part 2: Styling
Goal

Provide a clean, unified visual design.

Implementation

Added a compact, consistent theme via styles.css

Styled:

Node containers

Headers

Inputs and text areas

Connection handles

Focused on clarity and readability over heavy visual effects

Part 3: Text Node Logic
1️⃣ Auto-Resizing Text Area

The Text node dynamically adjusts width and height

Improves visibility as users type longer content

2️⃣ Variable Detection & Dynamic Handles

Detects variables written in the format:

{{ variableName }}


For each valid JavaScript identifier:

Automatically creates a corresponding input handle on the left side

Updates handles when variables are added or removed

This mirrors the behavior of VectorShift’s Text node.

Part 4: Backend Integration
Frontend

frontend/src/submit.js sends:

{ "nodes": [...], "edges": [...] }


to:

POST /pipelines/parse

Backend

/pipelines/parse:

Counts number of nodes

Counts number of edges

Checks whether the graph is a Directed Acyclic Graph (DAG)

DAG validation is implemented using Kahn’s Algorithm

Response Format
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}

UI Feedback

The frontend displays an alert showing:

Number of nodes

Number of edges

Whether the pipeline is a DAG

✅ Final User Flow

Create a pipeline using nodes and edges

Click Submit

Backend validates the pipeline

Frontend displays a summary alert
