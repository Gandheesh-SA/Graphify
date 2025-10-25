import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Graphify</h1>
      <div>
        <Link to="/create">Create</Link>
        <Link to="/bfs">BFS</Link>
        <Link to="/dfs">DFS</Link>
        <Link to="/dijkstra">Dijkstra</Link>
        <Link to="/kruskal">Kruskal</Link>
      </div>
    </nav>
  );
};

export default Navbar;
