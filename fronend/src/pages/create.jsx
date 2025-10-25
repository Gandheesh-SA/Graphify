import React, { useContext, useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from "reactflow";
import "reactflow/dist/style.css";
import { GraphContext } from "../context/GraphContext";

const CreateGraph = () => {
  const { setGraphData } = useContext(GraphContext);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeCount, setNodeCount] = useState(0);


  const addNode = () => {
    const id = `node_${nodeCount + 1}`;
    const newNode = {
      id,
      data: { label: `Node ${nodeCount + 1}` },
      position: { x: 250 + nodeCount * 20, y: 100 + nodeCount * 20 },
      draggable: true,
    };
    setNodes((nds) => nds.concat(newNode));
    setNodeCount(nodeCount + 1);
  };


  const onConnect = useCallback((params) => {
    let weight = prompt("Enter weight for this edge:", "1");
    if (weight === null) return;

    const directed = window.confirm("Make this edge directed? OK = Yes, Cancel = No");

    setEdges((eds) =>
      addEdge(
        {
          ...params,
          animated: directed,
          markerEnd: directed ? { type: MarkerType.Arrow } : undefined,
          label: weight,
          style: { stroke: directed ? "#f87171" : "#60a5fa" },
        },
        eds
      )
    );
  }, [setEdges]);

  const saveGraph = () => {
    setGraphData({ nodes, edges });
    alert("Graph saved!");
  };

  return (
    <div style={{ height: "80vh", width: "100%", position: "relative" }}>
      <div style={{ marginBottom: 10 }}>
        <button
          onClick={addNode}
          style={{
            marginRight: 10,
            padding: "8px 16px",
            backgroundColor: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Node
        </button>

        <button
          onClick={saveGraph}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save Graph
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default CreateGraph;
