import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <h1>Graphify</h1>

      {/* Nav links container with correct class */}
      <div className={`nav-links ${isOpen ? "active" : ""}`}>
        <Link to="/create" onClick={() => setIsOpen(false)}>Create</Link>
        <Link to="/bfs" onClick={() => setIsOpen(false)}>BFS</Link>
        <Link to="/dfs" onClick={() => setIsOpen(false)}>DFS</Link>
        <Link to="/dijkstra" onClick={() => setIsOpen(false)}>Dijkstra</Link>
        <Link to="/kruskal" onClick={() => setIsOpen(false)}>Kruskal</Link>
      </div>

      {/* Hamburger Icon */}
      <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
