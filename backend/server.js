// server.js

const express = require("express");
const sql = require("mssql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const config = {
  user: "NinadS",
  password: "Subaru!!2004",
  server: "keeper-app-server.database.windows.net",
  database: "keeper-app-sql",
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to Azure SQL Database");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed! Bad configuration:", err);
  });

/*app.get("/api/notes", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM notes");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).send("Failed to fetch notes.");
  }
});*/

app.post("/api/notes", async (req, res) => {
  const { id, title, content, author } = req.body;
  console.log("Received note data:", { id, title, content, author });

  if (!title || !content || !author) {
    return res.status(400).json({ error: "Title, content, and author are required" });
  }

  try {
    const pool = await poolPromise;
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("title", sql.NVarChar, title)
      .input("content", sql.NVarChar, content)
      .input("author", sql.NVarChar, author)
      .execute("AddOrUpdateNote");

    console.log("Stored procedure result:", result);

    if (result.recordset && result.recordset.length > 0) {
      const updatedNote = result.recordset[0];
      res.status(id ? 200 : 201).json({
        message: id ? "Note updated successfully" : "Note added successfully",
        note: updatedNote
      });
    } else {
      res.status(404).json({ error: "Note not found or not updated" });
    }
  } catch (err) {
    console.error("Error adding/updating note:", err);
    res.status(500).json({ error: "Failed to add/update note.", details: err.message });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool.request().input("id", sql.Int, id).query("DELETE FROM notes WHERE id = @id");
    res.status(200).send("Note deleted successfully");
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).send("Failed to delete note.");
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM users1");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.post("/api/users/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .input('password', sql.NVarChar, password)
      .execute("LoginUser");
    console.log(result.recordset[0]);
    if (result.recordset[0].username != null) {
      res.status(200).json({ 
        message: "Login successful", 
        user: {
          username: result.recordset[0].username,
          isAdmin: result.recordset[0].isAdmin 
        }
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
});
app.get("/api/notes", async (req, res) => {
  const { title, content, author } = req.query;
  
  try {
    const pool = await poolPromise;
    let query = "SELECT * FROM notes WHERE 1=1";
    const params = [];
    console.log(params);
    if (title) {
      query += " AND title LIKE @title";
      params.push({ name: 'title', value: `%${title}%` });
    }
    if (content) {
      query += " AND content LIKE @content";
      params.push({ name: 'content', value: `%${content}%` });
    }
    if (author) {
      query += " AND author LIKE @author";
      params.push({ name: 'author', value: `%${author}%` });
    }

    const request = pool.request();
    params.forEach(param => request.input(param.name, sql.NVarChar, param.value));

    const result = await request.query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error("Error searching notes:", err);
    res.status(500).send("Failed to search notes.");
  }
});
app.listen(8000, () => {
  console.log("Server running on port 8000");
});