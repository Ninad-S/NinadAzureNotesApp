

import React, { useState } from "react";

function NoteSearchBar({ onSearch }) {
  const [searchTerms, setSearchTerms] = useState({
    title: "",
    content: "",
    author: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerms);
  };

  const inputStyle = {
    padding: "10px",
    margin: "5px",
    borderColor: "#4CAF50",
    borderRadius: "4px",
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        name="title"
        placeholder="Search by title"
        value={searchTerms.title}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="content"
        placeholder="Search by content"
        value={searchTerms.content}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="author"
        placeholder="Search by author"
        value={searchTerms.author}
        onChange={handleChange}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Search</button>
    </form>
  );
}

export default NoteSearchBar;