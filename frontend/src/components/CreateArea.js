// CreateArea.js

import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    author: "",
  });

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    maxWidth: "400px",
    margin: "auto",
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: "#f1f1f1",
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
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "8px",
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function submitNote(event) {
    event.preventDefault();
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
      author: "",
    });
  }

  return (
    <div>
      <form style={formStyle} onSubmit={submitNote}>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          style={inputStyle}
          required
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
          style={inputStyle}
          required
        />
        <input
          name="author"
          onChange={handleChange}
          value={note.author}
          placeholder="Author"
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>
          Add Note
        </button>
      </form>
    </div>
  );
}

export default CreateArea;