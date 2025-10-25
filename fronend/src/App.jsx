import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import { GraphProvider } from "./context/GraphContext.jsx";
import CreateGraph from "./pages/create.jsx";
import BFSPage from "./pages/bfs.jsx";
import DFSPage from "./pages/dfs.jsx";
import DijkstraPage from "./pages/dijikstra.jsx";
import KruskalPage from "./pages/krushkal.jsx";
import Home from "./pages/landing.jsx";

function App() {
  return (

    <GraphProvider >
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateGraph />} />
        <Route path="/bfs" element={<BFSPage />} />
        <Route path="/dfs" element={<DFSPage />} />
        <Route path="/dijkstra" element={<DijkstraPage />} />
        <Route path="/kruskal" element={<KruskalPage />} />
      </Routes>
    </Router>
    </GraphProvider>
  );
}

export default App;
