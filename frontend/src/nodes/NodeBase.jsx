import React from 'react'

export default function NodeBase({node, onChange}){
  function updateLabel(e){
    onChange({...node, data:{...node.data, label:e.target.value}})
  }
  return (
    <div>
      <div className="node-header">
        <div className="node-title">{node.data.label}</div>
        <div className="small">{node.id}</div>
      </div>
      <input className="input" value={node.data.label} onChange={updateLabel} />
      <div className="node-variables">
        {(node.handles||[]).map(h=> <div key={h} className="handle">{h}</div>)}
      </div>
    </div>
  )
}
