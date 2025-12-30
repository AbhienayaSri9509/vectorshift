import React from 'react'
import NodeBase from './NodeBase'

export default function TransformNode({node,onChange}){
  return <NodeBase node={{...node, data:{...node.data, label: node.data.label || 'Transform'}}} onChange={onChange} />
}
