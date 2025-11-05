import React, { useContext, useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { GraphContext } from "../context/GraphContext";

const CreateGraph = () => {
  const { setGraphData } = useContext(GraphContext);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeCount, setNodeCount] = useState(0);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [pendingConnection, setPendingConnection] = useState(null);
  const [weight, setWeight] = useState("");
  const [directed, setDirected] = useState(false);

  // Add Node
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

  // When user connects two nodes → open modal
  const onConnect = useCallback((params) => {
    setPendingConnection(params);
    setShowModal(true);
  }, []);

  // Handle modal submit
  const handleAddEdge = () => {
    if (!weight.trim()) return alert("Please enter a weight!");

    setEdges((eds) =>
      addEdge(
        {
          ...pendingConnection,
          animated: directed,
          markerEnd: directed ? { type: MarkerType.Arrow } : undefined,
          label: weight,
          style: { stroke: directed ? "#f87171" : "#60a5fa" },
        },
        eds
      )
    );

    // Reset modal state
    setShowModal(false);
    setPendingConnection(null);
    setWeight("");
    setDirected(false);
  };

  const saveGraph = () => {
    setGraphData({ nodes, edges });
    alert("✅ Graph saved successfully!");
  };

  return (
    <div style={{ height: "80vh", width: "100%", position: "relative" }}>
      {/* Buttons */}
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
          ➕ Add Node
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
          💾 Save Graph
        </button>
      </div>

      {/* ReactFlow Canvas */}
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

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "300px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
              Add Edge Details
            </h3>

            <label>Weight:</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter edge weight"
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />

            <label>
              <input
                type="checkbox"
                checked={directed}
                onChange={() => setDirected(!directed)}
                style={{ marginRight: "5px" }}
              />
              Directed Edge
            </label>

            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <button
                onClick={handleAddEdge}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Add
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGraph;
