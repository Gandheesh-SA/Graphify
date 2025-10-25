import React from "react";
import Navbar from "../components/Navbar";
import "../styles/landing.css";

const Home = () => {
  return (
    <>
     
      <div className="page-container">
        <h1>Welcome to Graphify</h1>
        <p>
          Explore and visualize Graph Algorithms like BFS, DFS, Kruskal and
          Dijkstra with elegant visualizations and smooth animations.
        </p>
       
      </div>
    </>
  );
};

export default Home;
