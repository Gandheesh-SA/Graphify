import React, { useContext, useState } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import "../styles/result.css";
import { GraphContext } from "../context/GraphContext";


const DijkstraPage = () => {
  const { graphData } = useContext(GraphContext);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);


  const runAlgorithm = async () => {
    if (!graphData || !graphData.nodes || !graphData.edges) {
      setError("Graph is empty or malformed");
      return;
    }

    const graph = {};
    graphData.nodes.forEach((n) => (graph[n.id] = []));

    graphData.edges.forEach((e) => {
      const src = e.source;
      const tgt = e.target;

      const rawW =
        e.weight ??
        (e.data && e.data.weight) ??
        e.label ??
        1;

      const w = typeof rawW === "string" ? parseFloat(rawW) : rawW;
      const weight = Number.isFinite(w) ? w : Infinity;

      graph[src] = graph[src] || [];
      graph[src].push({ node: tgt, weight });

      const hasArrow = e.markerEnd || (e.data && e.data.markerEnd);
      const explicitlyDirected = e.directed || (e.data && e.data.directed);
      const explicitlyUndirected = e.undirected || (e.data && e.data.undirected);

      const isDirected = hasArrow || explicitlyDirected;
      const isUndirected = explicitlyUndirected || !isDirected;

      if (isUndirected) {
        graph[tgt] = graph[tgt] || [];
        graph[tgt].push({ node: src, weight });
      }
    });

    try {
      const startNode = graphData.nodes[0]?.id;
      const res = await axios.post("http://127.0.0.1:9000/run", {
        algorithm: "Dijkstra",
        graph,
        startNode,
      });

      setResult(res.data.result);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to contact backend. Check console for details.");
    }
  };

  return (
    <div>
      <div style={{ height: "50vh", borderBottom: "2px solid #ccc" }}>
        <ReactFlow nodes={graphData.nodes} edges={graphData.edges} fitView />
      </div>

      <div className="algo-panel" style={{ padding: 12 }}>
        <button className="run-btn" onClick={runAlgorithm}>
          Run Dijkstra
        </button>

        {error && <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>}

        {result && (
          <>
            <h3 className="traversal-heading" style={{ marginTop: 12 }}>
              Shortest Distances & Paths
            </h3>

            <div
              className="traversal-output"
              aria-live="polite"
              style={{ marginTop: 8 }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginBottom: 12,
                }}
              >
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: 6 }}>Node</th>
                    <th style={{ textAlign: "left", padding: 6 }}>Distance</th>
                    <th style={{ textAlign: "left", padding: 6 }}>
                      Path (start → node)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(result.distances).map(([node, dist]) => (
                    <tr key={node}>
                      <td style={{ padding: 6 }}>{node}</td>
                      <td style={{ padding: 6 }}>
                        {dist === Infinity ? "∞" : dist}
                      </td>
                      <td style={{ padding: 6 }}>
                        {result.paths && result.paths[node] && result.paths[node].length
                          ? result.paths[node].join(" → ")
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {result.order && result.order.length > 0 && (
                <>
                  <h4 style={{ marginTop: 12 }}>Visit Order</h4>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      marginTop: 8,
                    }}
                  >
                    {result.order.map((n, i) => (
                      <div
                        key={n}
                        className="traversal-pill"
                        style={{
                          background: "#e6f0ff",
                          padding: "6px 12px",
                          borderRadius: 20,
                        }}
                      >
                        {i + 1}. {n}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};


export default DijkstraPage;
