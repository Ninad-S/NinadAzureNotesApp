

import React, { useState, useEffect } from "react";

function NoteForm({ onSubmit, noteToEdit, onCancel }) {
  const [note, setNote] = useState({
    id: "",
    title: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    if (noteToEdit) {
      setNote(noteToEdit);
    } else {
      setNote({
        id: "",
        title: "",
        content: "",
        author: "",
      });
    }
  }, [noteToEdit]);

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
    onSubmit(note);
    setNote({
      id: "",
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
          {noteToEdit ? "Update Note" : "Add Note"}
        </button>
        {noteToEdit && (
          <button 
            type="button" 
            style={{...buttonStyle, backgroundColor: "#f44336"}} 
            onClick={() => {
              onCancel();
              setNote({ id: "", title: "", content: "", author: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default NoteForm;