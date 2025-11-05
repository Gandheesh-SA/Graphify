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
import "../styles/create_graph.css"; // 👈 we'll make this next

const CreateGraph = () => {
  const { setGraphData } = useContext(GraphContext);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeCount, setNodeCount] = useState(0);

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

  // On Connect → open modal
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
    <div className="graph-page">
      <div className="graph-toolbar">
        <button onClick={addNode} className="btn btn-blue">
          ➕ Add Node
        </button>
        <button onClick={saveGraph} className="btn btn-green">
          💾 Save Graph
        </button>
      </div>

      <div className="graph-container">
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add Edge Details</h3>

            <label>Weight:</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter edge weight"
            />

            <label className="checkbox">
              <input
                type="checkbox"
                checked={directed}
                onChange={() => setDirected(!directed)}
              />
              Directed Edge
            </label>

            <div className="modal-buttons">
              <button onClick={handleAddEdge} className="btn btn-green">
                Add
              </button>
              <button onClick={() => setShowModal(false)} className="btn btn-red">
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
