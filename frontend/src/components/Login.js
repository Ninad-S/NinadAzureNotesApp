import React, { useState } from "react";

function Login({ onLogin }) {
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f2f5",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#ffffff",
      width: "300px",
    },
    title: {
      color: "#4CAF50",
      marginBottom: "20px",
      textAlign: "center",
      fontSize: "24px",
    },
    input: {
      marginBottom: "15px",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "4px",
      border: "1px solid #4CAF50",
      outline: "none",
    },
    button: {
      padding: "12px",
      fontSize: "16px",
      color: "#ffffff",
      backgroundColor: "#4CAF50",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setCreds((prevCreds) => ({ ...prevCreds, [name]: value }));
  }

  function submitLogin(event) {
    event.preventDefault();
    onLogin(creds.username, creds.password);
    setCreds({ username: "", password: "" });
  }

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={submitLogin}>
        <h2 style={styles.title}>Login to Notes App</h2>
        <input
          style={styles.input}
          name="username"
          onChange={handleChange}
          value={creds.username}
          placeholder="Username"
        />
        <input
          style={styles.input}
          name="password"
          type="password"
          onChange={handleChange}
          value={creds.password}
          placeholder="Password"
        />
        <button 
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;