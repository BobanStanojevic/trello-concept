import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function BoardCard({ name, shortid, color }) {
  return (
    <Link to={`/${shortid}`}>
      <div className="board-card" style={{ backgroundColor: color }}>
        <span className="title">{name}</span>
        <div className="hover-overlay"></div>
      </div>
    </Link>
  );
}
