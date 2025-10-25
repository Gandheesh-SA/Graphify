function dfs(graph, start) {
  if (!graph || typeof graph !== "object") return [];
  if (!start) {
    const keys = Object.keys(graph);
    if (keys.length === 0) return [];
    start = keys[0];
  }

  const visited = new Set();
  const result = [];

  function dfsVisit(node) {
    if (!graph[node] || visited.has(node)) return;
    visited.add(node);
    result.push(node);
    for (const neighbor of graph[node]) {
      dfsVisit(neighbor);
    }
  }

  dfsVisit(start);
  return result;
}

module.exports = dfs;
