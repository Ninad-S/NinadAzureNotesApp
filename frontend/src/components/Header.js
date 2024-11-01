import React from "react";

function Header({username}) {
  const headerStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    textAlign: "center",
    padding: "1rem",
    fontSize: "1.5rem",
  };

  return (
    <header style={headerStyle}>
      <h1>{username ? `${username}'s Notes` : "User's Notes"}</h1>
    </header>
  );
}

export default Header;

