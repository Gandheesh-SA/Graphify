import React, { useContext, useState } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import "../styles/result.css"
import { GraphContext } from "../context/GraphContext";

const BASE_URL = "srv-d3uf320dl3ps73f3snkg"; 

fetch(`${BASE_URL}/api/data`);


const BFSPage = () => {
  const { graphData } = useContext(GraphContext);
  const [output, setOutput] = useState([]);

  const runAlgorithm = async () => {
    const graph = {};
graphData.nodes.forEach((n) => (graph[n.id] = []));


graphData.edges.forEach((e) => {
  graph[e.source].push(e.target);
  graph[e.target].push(e.source);
})

    const res = await axios.post(`${BASE_URL}/run`, {
  algorithm: "BFS",
  graph,
  startNode: graphData.nodes[0]?.id || "A"
});

setOutput(res.data.result);
  };

  return (
    <div>
      <div style={{ height: "50vh", borderBottom: "2px solid #ccc" }}>
        <ReactFlow nodes={graphData.nodes} edges={graphData.edges} fitView />
      </div>

    <div className="algo-panel">
  <button className="run-btn" onClick={runAlgorithm}>Run BFS</button>

  {output.length > 0 && (
    <>
      <h3 className="traversal-heading">Traversal Order</h3>
      <div className="traversal-output" aria-live="polite">
        {output.map((node, idx) => (
          <React.Fragment key={node}>
            <span className="traversal-pill">{node}</span>
            {idx !== output.length - 1 && <span className="traversal-sep">→</span>}
          </React.Fragment>
        ))}
      </div>
    </>
  )}
</div>
    </div>
  );
};

export default BFSPage;
