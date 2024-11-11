const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require('cors')

const app = express();
const PORT = 3000;
app.use(cors())
app.use(
  cors({
    origin: "*",
  })
)
// Middleware to parse JSON data
app.use(express.json());

// Endpoint to store ID and password
app.post("/register", (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ error: "ID and Password are required." });
  }

  // Load existing users data
  const filePath = path.join(__dirname, "users.json");
  let users = [];

  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      users = JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading users file:", error);
  }

  // Add the new user data
  users.push({ id, password });

  // Save updated users data to the JSON file
  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf8");
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error writing to users file:", error);
    res.status(500).json({ error: "An error occurred while saving data." });
  }
});

app.get('/data', (req, res) => {
  // Read JSON data from the file
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading file', error: err });
    }
    // Send JSON response
    res.json(JSON.parse(data));
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
