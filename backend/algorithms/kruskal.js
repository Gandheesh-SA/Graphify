function kruskal(graph) {
  if (!graph || !graph.edges) return [];

  const edges = [...graph.edges].sort((a, b) => a.weight - b.weight);
  const parent = {};
  const find = (n) => (parent[n] === n ? n : (parent[n] = find(parent[n])));
  const union = (a, b) => {
    const pa = find(a);
    const pb = find(b);
    if (pa !== pb) parent[pb] = pa;
  };

  const nodes = new Set(edges.flatMap(e => [e.source, e.target]));
  nodes.forEach((n) => (parent[n] = n));

  const mst = [];

  for (const edge of edges) {
    if (find(edge.source) !== find(edge.target)) {
      union(edge.source, edge.target);
      mst.push(edge);
    }
  }

  return mst;
}

module.exports = kruskal;
