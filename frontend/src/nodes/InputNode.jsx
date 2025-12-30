import React from 'react'
import NodeBase from './NodeBase'

export default function InputNode({node,onChange}){
  return <NodeBase node={{...node, data:{...node.data, label: node.data.label || 'Input'}}} onChange={onChange} />
}
