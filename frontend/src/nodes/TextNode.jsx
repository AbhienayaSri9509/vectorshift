import React, {useRef, useEffect, useState} from 'react'

export default function TextNode({node, onChange}){
  const [text,setText] = useState(node.data.text||'')
  const [handles,setHandles] = useState(node.handles||[])
  const taRef = useRef(null)

  useEffect(()=>{
    // auto-resize textarea
    if(taRef.current){
      taRef.current.style.height = 'auto'
      taRef.current.style.height = taRef.current.scrollHeight + 'px'
    }
  },[text])

  useEffect(()=>{
    // detect variables like {{ varName }} and create handles
    const re = /{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g
    const vars = new Set()
    let m
    while((m=re.exec(text))!==null){
      vars.add(m[1])
    }
    const arr = Array.from(vars)
    setHandles(arr)
    if(onChange){
      onChange({...node, data:{...node.data, text}, handles:arr})
    }
  },[text])

  function onTextChange(e){
    setText(e.target.value)
  }

  return (
    <div>
      <div className="node-header">
        <div className="node-title">Text</div>
        <div className="small">{node.id}</div>
      </div>
      <textarea ref={taRef} className="input" value={text} onChange={onTextChange} rows={1} style={{overflow:'hidden',resize:'none'}} />
      <div className="node-variables">
        {handles.map(h=> <div key={h} className="handle">{h}</div>)}
        {handles.length===0 && <div className="small">No variables detected</div>}
      </div>
    </div>
  )
}
