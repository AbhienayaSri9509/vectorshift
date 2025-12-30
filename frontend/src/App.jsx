import React, {useState} from 'react'
import NodeBase from './nodes/NodeBase'
import TextNode from './nodes/TextNode'
import LLMNode from './nodes/LLMNode'
import InputNode from './nodes/InputNode'
import OutputNode from './nodes/OutputNode'
import TransformNode from './nodes/TransformNode'
import submitPipeline from './submit'

export default function App(){
  const [nodes,setNodes] = useState([])
  const [edges,setEdges] = useState([])
  const [nextId,setNextId] = useState(1)

  function addNode(type){
    const id = `n${nextId}`
    setNextId(nextId+1)
    const base = {id, type, data:{label: type + ' node'}, handles:[]}
    setNodes(ns=>[...ns, base])
  }

  function removeNode(id){
    setNodes(ns=>ns.filter(n=>n.id!==id))
    setEdges(es=>es.filter(e=>e.source!==id && e.target!==id))
  }

  function addEdge(source,target){
    setEdges(es=>[...es,{source,target}])
  }

  function updateNode(updated){
    setNodes(ns=>ns.map(n=>n.id===updated.id?updated:n))
  }

  return (
    <div className="app">
      <div className="header">
        <h2>VectorShift — Assessment Demo</h2>
        <div className="toolbar">
          <button className="btn" onClick={()=>addNode('Text')}>Add Text Node</button>
          <button className="btn" onClick={()=>addNode('LLM')}>Add LLM Node</button>
          <button className="btn" onClick={()=>addNode('Input')}>Add Input Node</button>
          <button className="btn" onClick={()=>addNode('Output')}>Add Output Node</button>
          <button className="btn" onClick={()=>addNode('Transform')}>Add Transform Node</button>
          <button className="btn" onClick={()=>submitPipeline({nodes,edges})}>Submit Pipeline</button>
        </div>
      </div>
      <div className="panel">
        <aside className="sidebar">
          <div className="card">
            <h3 className="small">Nodes</h3>
            <div className="list">
              {nodes.map(n=> (
                <div key={n.id} className="list-item">
                  <div>{n.type} <span className="small">{n.id}</span></div>
                  <div style={{display:'flex',gap:8}}>
                    <button className="btn" onClick={()=>removeNode(n.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="small">Edges</h3>
            <EdgeForm nodes={nodes} addEdge={addEdge} />
            <div style={{marginTop:8}}>
              <small className="small">Click Submit to send current nodes and edges to backend</small>
            </div>
          </div>
        </aside>
        <main className="canvas card">
          {nodes.map(n=> (
            <div key={n.id} className="node">
              {n.type==='Text' ? (
                <TextNode node={n} onChange={updateNode} />
              ) : n.type==='LLM' ? (
                <LLMNode node={n} onChange={updateNode} />
              ) : n.type==='Input' ? (
                <InputNode node={n} onChange={updateNode} />
              ) : n.type==='Output' ? (
                <OutputNode node={n} onChange={updateNode} />
              ) : n.type==='Transform' ? (
                <TransformNode node={n} onChange={updateNode} />
              ) : (
                <NodeBase node={n} onChange={updateNode} />
              )}
            </div>
          ))}
        </main>
      </div>
    </div>
  )
}

function EdgeForm({nodes, addEdge}){
  const [src,setSrc] = useState('')
  const [dst,setDst] = useState('')
  return (
    <div style={{display:'flex',gap:8,marginTop:8}}>
      <select className="input" value={src} onChange={e=>setSrc(e.target.value)}>
        <option value="">source</option>
        {nodes.map(n=> <option key={n.id} value={n.id}>{n.id} ({n.type})</option>)}
      </select>
      <select className="input" value={dst} onChange={e=>setDst(e.target.value)}>
        <option value="">target</option>
        {nodes.map(n=> <option key={n.id} value={n.id}>{n.id} ({n.type})</option>)}
      </select>
      <button className="btn" onClick={()=>{if(src&&dst){addEdge(src,dst); setSrc(''); setDst('')}}}>Add</button>
    </div>
  )
}
