import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import NoteForm from "./NoteForm";
import Login from "./Login";
import AccessDenied from "./AccessDenied";
import NoteSearchBar from "./NoteSearchBar";
import About from "./About";
import Users from "./Users";
import axios from "axios";

const API_URL = "http://localhost:8000";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wasValid, setWasValid] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  
  const fetchNotes = async (searchParams = {}) => {
    try {
      const response = await axios.get(`${API_URL}/api/notes`, { params: searchParams });
      setNotes(response.data);
      //console.log(searchParams);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotes();
    }
  }, [isLoggedIn]);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, { username, password });
      setCurrentUser(response.data.user);
      setIsLoggedIn(true);
      setWasValid(true);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setIsLoggedIn(false);
      setWasValid(false);
    }
  };

  const addOrUpdateNote = async (noteData) => {
    try {
      const response = await axios.post(`${API_URL}/api/notes`, noteData);
      console.log("Note added/updated:", response.data);
      fetchNotes();
      setSelectedNote(null);
    } catch (error) {
      console.error("Error adding/updating note:", error.response?.data || error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const editNote = (note) => {
    setSelectedNote(note);
  };

  const handleSearch = (searchTerms) => {
    fetchNotes(searchTerms);
  };

  return (
    <Router>
      <AppContent 
        notes={notes}
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        wasValid={wasValid}
        selectedNote={selectedNote}
        handleLogin={handleLogin}
        addOrUpdateNote={addOrUpdateNote}
        deleteNote={deleteNote}
        editNote={editNote}
        handleSearch={handleSearch}
        setIsLoggedIn={setIsLoggedIn}
      />
    </Router>
  );
}

function AppContent({
  notes,
  currentUser,
  isLoggedIn,
  wasValid,
  selectedNote,
  handleLogin,
  addOrUpdateNote,
  deleteNote,
  editNote,
  handleSearch,
  setIsLoggedIn
}) {
  const navigate = useNavigate();

  return (
    <div style={styles.appContainer}>
      {!wasValid ? (
        <AccessDenied />
      ) : !isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Header username={currentUser.username} />
          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>Notes</Link>
            <Link to="/about" style={styles.navLink}>About</Link>
            {currentUser.isAdmin && <Link to="/users" style={styles.navLink}>Users</Link>}
            <button onClick={() => {
              setIsLoggedIn(false);
              navigate('/');
            }} style={styles.logoutButton}>LOGOUT</button>
          </nav>
          <Routes>
            <Route path="/" element={
              <>
                <NoteSearchBar onSearch={handleSearch} />
                <NoteForm 
                  onSubmit={addOrUpdateNote} 
                  noteToEdit={selectedNote}
                  onCancel={() => editNote(null)}
                />
                <div style={styles.notesContainer}>
                  {notes.map((noteItem) => (
                    <Note
                      key={noteItem.id}
                      id={noteItem.id}
                      title={noteItem.title}
                      content={noteItem.content}
                      author={noteItem.author}
                      onDelete={deleteNote}
                      onEdit={() => editNote(noteItem)}
                    />
                  ))}
                </div>
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route 
              path="/users" 
              element={
                currentUser.isAdmin ? (
                  <Users />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: '10px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    marginRight: '20px',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  notesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px', 
  },
};

export default App;