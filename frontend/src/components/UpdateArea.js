// UpdateArea.js

import React, { useState, useEffect } from "react";

function UpdateArea({ note, onEdit, onCancel }) {
  const [updatedNote, setUpdatedNote] = useState({
    id: "",
    title: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    if (note) {
      setUpdatedNote({
        id: note.id,
        title: note.title,
        content: note.content,
        author: note.author,
      });
    }
  }, [note]);

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    maxWidth: "400px",
    margin: "auto",
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const inputStyle = {
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  };

  const buttonStyle = {
    padding: "8px",
    backgroundColor: "#FFA500",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "8px",
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setUpdatedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function submitNote(event) {
    event.preventDefault();
    onEdit({ ...updatedNote, id: note.id });
  }

  return (
    <div>
      <form style={formStyle} onSubmit={submitNote}>
        <input
          name="title"
          onChange={handleChange}
          value={updatedNote.title}
          placeholder="Title"
          style={inputStyle}
          required
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={updatedNote.content}
          placeholder="Take a note..."
          rows="3"
          style={inputStyle}
          required
        />
        <input
          name="author"
          onChange={handleChange}
          value={updatedNote.author}
          placeholder="Author"
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>
          Update
        </button>
        <button type="button" style={buttonStyle} onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateArea;