import React, { createContext, useState } from "react";

export const GraphContext = createContext();

export const GraphProvider = ({ children }) => {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });

  return (
    <GraphContext.Provider value={{ graphData, setGraphData }}>
      {children}
    </GraphContext.Provider>
  );
};
