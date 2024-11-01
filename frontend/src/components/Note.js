// Note.js

import React from "react";

function Note({id, title, content, author, onDelete, onEdit }) {
  const noteStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "300px",
    flex: "1 0 30%",
  };

  const buttonStyle = {
    margin: "8px",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336",
    color: "white",
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#4CAF50",
    color: "white",
  };

  return (
    <div style={noteStyle}>
      <h1>{title}</h1>
      <p>{content}</p>
      <p>{author}</p>
      <button style={deleteButtonStyle} onClick={() => onDelete(id)}>
        DELETE
      </button>
      <button style={editButtonStyle} onClick={onEdit}>
        EDIT
      </button>
    </div>
  );
}

export default Note;