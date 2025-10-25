import React, { useContext, useState } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import "../styles/result.css";
import { GraphContext } from "../context/GraphContext";

const BASE_URL = "srv-d3uf320dl3ps73f3snkg"; 

const KruskalPage = () => {
  const { graphData } = useContext(GraphContext);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  const runAlgorithm = async () => {
    if (!graphData || !graphData.nodes || !graphData.edges) {
      setError("Graph is empty or malformed");
      return;
    }

    const edges = graphData.edges.map((e) => {
      const rawW = e.weight ?? (e.data && e.data.weight) ?? e.label ?? 1;
      const w = typeof rawW === "string" ? parseFloat(rawW) : rawW;
      const weight = Number.isFinite(w) ? w : 1;

      return {
        source: e.source,
        target: e.target,
        weight: weight
      };
    });

    try {
      const res = await axios.post(`${BASE_URL}/run`, {
        algorithm: "Kruskal",
        graph: { edges },
        startNode: graphData.nodes[0]?.id
      });

      setOutput(res.data.result);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to contact backend. Check console for details.");
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "0 0 50vh", borderBottom: "2px solid #ddd" }}>
        <ReactFlow nodes={graphData.nodes} edges={graphData.edges} fitView />
      </div>

      <div style={{ 
        flex: 1, 
        overflowY: "auto", 
        padding: "32px", 
        backgroundColor: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <button 
          onClick={runAlgorithm}
          style={{
            padding: "12px 32px",
            fontSize: "16px",
            fontWeight: "600",
            color: "#fff",
            backgroundColor: "#10b981",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(16, 185, 129, 0.2)",
            transition: "all 0.2s",
            marginBottom: "24px"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#059669";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 12px rgba(16, 185, 129, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#10b981";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 6px rgba(16, 185, 129, 0.2)";
          }}
        >
          Run Kruskal
        </button>

        {error && (
          <div style={{ 
            color: "#dc2626", 
            backgroundColor: "#fee2e2",
            padding: "12px 20px",
            borderRadius: "8px",
            marginBottom: "24px",
            border: "1px solid #fecaca"
          }}>
            {error}
          </div>
        )}

        {output && output.length > 0 && (
          <div style={{ width: "100%", maxWidth: "900px" }}>
            <h3 style={{ 
              fontSize: "24px", 
              fontWeight: "700", 
              color: "#111827",
              marginBottom: "24px",
              textAlign: "center"
            }}>
              Minimum Spanning Tree (MST)
            </h3>

            <div style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              marginBottom: "32px"
            }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse"
              }}>
                <thead>
                  <tr style={{ backgroundColor: "#f3f4f6" }}>
                    <th style={{ 
                      textAlign: "left", 
                      padding: "16px 24px",
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#374151",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}>
                      Edge
                    </th>
                    <th style={{ 
                      textAlign: "left", 
                      padding: "16px 24px",
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#374151",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}>
                      Weight
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {output.map((edge, index) => (
                    <tr 
                      key={index}
                      style={{
                        borderTop: "1px solid #e5e7eb",
                        transition: "background-color 0.15s"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
                    >
                      <td style={{ 
                        padding: "16px 24px",
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#1f2937",
                        fontFamily: "monospace"
                      }}>
                        {edge.source} → {edge.target}
                      </td>
                      <td style={{ 
                        padding: "16px 24px",
                        fontSize: "15px",
                        fontWeight: "500",
                        color: "#10b981"
                      }}>
                        {edge.weight}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center"
            }}>
              <p style={{ 
                fontSize: "16px", 
                fontWeight: "600", 
                color: "#374151",
                margin: 0
              }}>
                Total MST Weight:{" "}
                <span style={{ color: "#10b981", fontSize: "20px" }}>
                  {output.reduce((sum, edge) => sum + edge.weight, 0)}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KruskalPage;
