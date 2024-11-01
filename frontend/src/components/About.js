

import React from 'react';

function About() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Our Note-Taking App</h1>
      <p style={styles.paragraph}>
        Welcome to our Note-Taking App! This application allows users to create, edit, delete, and search for notes. 
        It's designed to help you organize your thoughts, ideas, and important information in a simple and efficient manner. 
        With features like user authentication and real-time updates, you can securely access your notes from anywhere. 
        Whether you're a student, professional, or just someone who likes to keep things organized, our app is here to help 
        you stay on top of your notes and boost your productivity.
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    color: '#4CAF50',
    marginBottom: '20px',
  },
  paragraph: {
    lineHeight: '1.6',
    fontSize: '16px',
  },
};

export default About;