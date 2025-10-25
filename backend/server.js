const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const bfs = require("./algorithms/bfs");
const dfs = require("./algorithms/dfs");
const dijkstra = require("./algorithms/dijkstra");
const kruskal = require("./algorithms/kruskal");

const app = express();


app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);


app.use(bodyParser.json());


app.post("/run", (req, res) => {
  const { algorithm, graph, startNode } = req.body;

  if (!algorithm || !graph) {
    return res.status(400).json({ error: "Missing algorithm or graph" });
  }

  let result;

  switch (algorithm.toLowerCase()) {
    case "bfs":
      result = bfs(graph, startNode);
      break;
    case "dfs":
      result = dfs(graph, startNode);
      break;
    case "dijkstra":
      result = dijkstra(graph, startNode);
      break;
    case "kruskal":
      result = kruskal(graph);
      break;
    default:
      return res.status(400).json({ error: "Unknown algorithm" });
  }

  res.json({ result });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log("Graphify backend running on http://127.0.0.1:${PORT}")
);
