
function bfs(graph, start) {
  if (!graph || typeof graph !== 'object') return [];
  if (!start) {
    const keys = Object.keys(graph);
    if (keys.length === 0) return [];
    start = keys[0];
  }
  if (!graph[start]) return [];

  const visited = [];
  const queue = [start];

  while (queue.length > 0) {
    const node = queue.shift();
    if (!visited.includes(node)) {
      visited.push(node);
      const neighbors = graph[node] || [];
      for (const nb of neighbors) {
        if (!visited.includes(nb) && !queue.includes(nb)) queue.push(nb);
      }
    }
  }
  return visited;
}

module.exports = bfs;
