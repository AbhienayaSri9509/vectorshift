export default async function submitPipeline(payload){
  try{
    const resp = await fetch('http://127.0.0.1:8000/pipelines/parse', {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    })
    const data = await resp.json()
    alert(`Pipeline: ${data.num_nodes} nodes, ${data.num_edges} edges. DAG: ${data.is_dag}`)
  }catch(err){
    alert('Failed to submit pipeline: '+err.message)
  }
}
