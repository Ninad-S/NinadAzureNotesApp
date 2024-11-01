import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  const footerStyle = {
    backgroundColor: "#282c34",
    color: "white",
    textAlign: "center",
    padding: "1rem",
    fontSize: "0.9rem",
    position: "fixed",
    bottom: 0,
    width: "100%",
  };

  return (
    <footer style={footerStyle}>
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;

