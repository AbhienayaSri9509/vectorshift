import React from 'react'
import NodeBase from './NodeBase'

export default function OutputNode({node,onChange}){
  return <NodeBase node={{...node, data:{...node.data, label: node.data.label || 'Output'}}} onChange={onChange} />
}
