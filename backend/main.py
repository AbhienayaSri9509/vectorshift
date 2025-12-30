from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

class Node(BaseModel):
    id: str
    type: str | None = None
    data: Dict | None = None

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: Pipeline):
    # compute counts
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # build adjacency list
    adj = {n.id: [] for n in pipeline.nodes}
    indeg = {n.id: 0 for n in pipeline.nodes}
    for e in pipeline.edges:
        if e.source in adj and e.target in adj:
            adj[e.source].append(e.target)
            indeg[e.target] += 1

    # Kahn's algorithm to detect DAG
    from collections import deque
    q = deque([nid for nid,deg in indeg.items() if deg==0])
    visited = 0
    while q:
        u = q.popleft()
        visited += 1
        for v in adj.get(u,[]):
            indeg[v] -= 1
            if indeg[v]==0:
                q.append(v)
    is_dag = (visited == num_nodes)

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}
