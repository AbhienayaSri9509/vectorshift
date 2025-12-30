import React from 'react'
import NodeBase from './NodeBase'

export default function LLMNode({node,onChange}){
  return <NodeBase node={{...node, data:{...node.data, label: node.data.label || 'LLM'}}} onChange={onChange} />
}
