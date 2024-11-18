const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;
const filePath = path.join(__dirname, "users.json");

app.use(cors());
app.use(express.json());

// Endpoint to store ID and password
app.post("/register", (req, res) => {
  console.log("Register endpoint hit"); // Debug log
  const { id, password } = req.body;

  if (!id || !password) {
    console.log("ID or password missing in the request body"); // Debug log
    return res.status(400).json({ error: "ID and Password are required." });
  }

  let users = [];

  // Load existing users data or create file if it doesn't exist
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      users = data ? JSON.parse(data) : []; // Handle empty file scenario
      console.log("Existing users loaded:", users); // Debug log
    } else {
      // Create the file with an empty array if it doesn't exist
      fs.writeFileSync(filePath, JSON.stringify([]), "utf8");
      console.log("users.json file created as it was missing."); // Debug log
    }
  } catch (error) {
    console.error("Error reading or initializing users file:", error);
    return res.status(500).json({ error: "Failed to read or initialize users data." });
  }

  // Add the new user data
  users.push({ id, password });
  console.log("User added:", { id, password }); // Debug log

  // Save updated users data to the JSON file
  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf8");
    console.log("User data saved to file"); // Debug log
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error writing to users file:", error);
    res.status(500).json({ error: "An error occurred while saving data." });
  }
});

// Endpoint to get JSON data
app.get("/data", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ message: "Error reading file", error: err });
    }

    try {
      // Send JSON response
      res.json(data ? JSON.parse(data) : []);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({ message: "Error parsing JSON data", data: [] });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
