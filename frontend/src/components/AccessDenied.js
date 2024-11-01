import React, { useState, useEffect } from "react";

import Login from "./Login";

function AccessDenied(props) {
  const [showLogin, setShowLogin] = useState(false);

  function goBack() {
    setShowLogin(true);
  }

  if (showLogin) {
    return <Login />;
  }
  return (
    <div>
      <h1>Access DENIED</h1>
      <button onClick={goBack}>Back</button>
    </div>
  );
}

export default AccessDenied;
