
class MinHeap {
  constructor() {
    this.heap = [];
  }
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  push(item) {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }
  bubbleUp(idx) {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent].dist <= this.heap[idx].dist) break;
      this.swap(parent, idx);
      idx = parent;
    }
  }
  pop() {
    if (!this.heap.length) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return top;
  }
  bubbleDown(idx) {
    const n = this.heap.length;
    while (true) {
      let left = 2 * idx + 1;
      let right = 2 * idx + 2;
      let smallest = idx;
      if (left < n && this.heap[left].dist < this.heap[smallest].dist) smallest = left;
      if (right < n && this.heap[right].dist < this.heap[smallest].dist) smallest = right;
      if (smallest === idx) break;
      this.swap(idx, smallest);
      idx = smallest;
    }
  }
  isEmpty() {
    return this.heap.length === 0;
  }
}

function isNumber(n) {
  return typeof n === "number" && !Number.isNaN(n) && Number.isFinite(n);
}


function dijkstra(graph, start) {
  if (!graph || typeof graph !== "object" || !start) {
    return { distances: {}, paths: {}, order: [] };
  }

  for (const u in graph) {
    (graph[u] = graph[u] || []);
    for (const e of graph[u]) {
      if (!(e.node in graph)) graph[e.node] = [];
    }
  }

  const distances = {};
  const prev = {};
  const pq = new MinHeap();
  const order = [];


  for (const node in graph) {
    distances[node] = Infinity;
    prev[node] = null;
  }
  if (!(start in distances)) {
   
    return { distances, paths: Object.fromEntries(Object.keys(distances).map(n => [n, []])), order };
  }

  distances[start] = 0;
  pq.push({ node: start, dist: 0 });

  while (!pq.isEmpty()) {
    const { node: u, dist: d } = pq.pop();

    if (d !== distances[u]) continue;

    order.push(u);

    const neighbors = graph[u] || [];
    for (const edge of neighbors) {
      const v = edge.node;
 
      let w = edge.weight;
      if (!isNumber(w)) {
        
        if (typeof w === "string") {
          const p = parseFloat(w);
          w = isNumber(p) ? p : Infinity;
        } else {
          w = Infinity;
        }
      }

      const alt = distances[u] + w;
      if (alt < distances[v]) {
        distances[v] = alt;
        prev[v] = u;
        pq.push({ node: v, dist: alt });
      }
    }
  }


  const paths = {};
  for (const node in graph) {
    if (distances[node] === Infinity) {
      paths[node] = [];
      continue;
    }
    const path = [];
    let cur = node;
    while (cur !== null) {
      path.push(cur);
      cur = prev[cur];
    }
    path.reverse();
    paths[node] = path;
  }

  return { distances, paths, order };
}

module.exports = dijkstra;
